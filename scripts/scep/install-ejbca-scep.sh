#!/bin/bash
###############################################################################
# EJBCA CE + SCEP Installation Script for Yealink T53 802.1x
# Target: Ubuntu 24.04 ARM64
#
# Fixes applied:
# - EJBCA CE Docker deployment with simple password
# - SCEP Alias "CAIdentifier" mapped to ManagementCA
# - nginx map directive to handle message=CAIdentifier -> message=ManagementCA
# - nginx serves static PKCS#7 chain (CA + CA + RA) for GetCACert
# - Yealink syslog configuration
#
# Author: Manus / PBerg
# Date: 2026-06-25
###############################################################################

set -euo pipefail

# ============================================================================
# CONFIGURATION
# ============================================================================
SERVER_IP="192.168.100.191"
SCEP_CHALLENGE="yealink"
DB_PASSWORD="ejbca2026"
EJBCA_VERSION="9.3.7"
INSTALL_DIR="/opt/ejbca"
DATA_DIR="/opt/ejbca/datadbdir"
SYSLOG_DIR="/var/log/yealink"

# ============================================================================
# COLORS
# ============================================================================
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log()  { echo -e "${GREEN}[✓]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
err()  { echo -e "${RED}[✗]${NC} $1"; exit 1; }

# ============================================================================
# PRE-CHECKS
# ============================================================================
if [[ $EUID -ne 0 ]]; then
    err "Dieses Skript muss als root ausgeführt werden (sudo)"
fi

# ============================================================================
# STEP 1: Dependencies
# ============================================================================
log "Step 1: System-Update & Abhängigkeiten installieren..."
apt-get update -qq
apt-get install -y -qq curl gnupg lsb-release ca-certificates nginx rsyslog jq openssl net-tools

# ============================================================================
# STEP 2: Docker
# ============================================================================
log "Step 2: Docker installieren..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com | sh
    systemctl enable docker
    systemctl start docker
fi

# ============================================================================
# STEP 3: Directories
# ============================================================================
log "Step 3: Verzeichnisstruktur erstellen..."
mkdir -p "${INSTALL_DIR}"
mkdir -p "${DATA_DIR}"
mkdir -p "${SYSLOG_DIR}"
chown syslog:adm "${SYSLOG_DIR}"
chmod 755 "${SYSLOG_DIR}"

# ============================================================================
# STEP 4: Docker Compose
# ============================================================================
log "Step 4: Docker Compose Datei erstellen..."
cat > "${INSTALL_DIR}/docker-compose.yml" << 'COMPOSE_EOF'
networks:
  access-bridge:
    driver: bridge
  application-bridge:
    driver: bridge

services:
  ejbca-database:
    container_name: ejbca-database
    image: "library/mariadb:latest"
    restart: unless-stopped
    networks:
      - application-bridge
    environment:
      - MYSQL_ROOT_PASSWORD=${DB_PASSWORD}
      - MYSQL_DATABASE=ejbca
      - MYSQL_USER=ejbca
      - MYSQL_PASSWORD=${DB_PASSWORD}
    volumes:
      - ./datadbdir:/var/lib/mysql:rw

  ejbca-node1:
    hostname: ejbca-node1
    container_name: ejbca
    image: keyfactor/ejbca-ce:${EJBCA_VERSION}
    restart: unless-stopped
    depends_on:
      - ejbca-database
    networks:
      - access-bridge
      - application-bridge
    environment:
      - DATABASE_JDBC_URL=jdbc:mariadb://ejbca-database:3306/ejbca?characterEncoding=UTF-8
      - DATABASE_USER=ejbca
      - DATABASE_PASSWORD=${DB_PASSWORD}
      - LOG_LEVEL_APP=INFO
      - LOG_LEVEL_SERVER=INFO
      - TLS_SETUP_ENABLED=simple
    ports:
      - "8080:8080"
      - "8443:8443"
COMPOSE_EOF

cat > "${INSTALL_DIR}/.env" << EOF
DB_PASSWORD=${DB_PASSWORD}
EJBCA_VERSION=${EJBCA_VERSION}
EOF

# ============================================================================
# STEP 5: Start EJBCA
# ============================================================================
log "Step 5: EJBCA Container starten..."
cd "${INSTALL_DIR}"
docker compose up -d

echo -n "  Warte auf EJBCA Startup (kann 2-3 Minuten dauern)..."
TIMEOUT=180
ELAPSED=0
while ! curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8080/ejbca/publicweb/healthcheck/ejbcahealth 2>/dev/null | grep -q "200"; do
    sleep 5
    ELAPSED=$((ELAPSED + 5))
    echo -n "."
    if [[ $ELAPSED -ge $TIMEOUT ]]; then
        err "EJBCA nicht gestartet nach ${TIMEOUT}s. Prüfe: docker compose logs -f"
    fi
done
echo ""
log "EJBCA ist bereit!"

# ============================================================================
# STEP 6: EJBCA SCEP Configuration
# ============================================================================
log "Step 6: EJBCA SCEP Alias konfigurieren..."

# Helper function
ejbca_cmd() { docker exec ejbca /opt/keyfactor/bin/ejbca.sh "$@"; }

# Create CAIdentifier alias
ejbca_cmd config scep addalias --alias CAIdentifier 2>/dev/null || true
ejbca_cmd config scep updatealias --alias CAIdentifier --key ra.defaultCA --value ManagementCA
ejbca_cmd config scep updatealias --alias CAIdentifier --key includeca --value true
ejbca_cmd config scep updatealias --alias CAIdentifier --key returnCaChainInGetCaCert --value true
ejbca_cmd config scep updatealias --alias CAIdentifier --key allowLegacyDigestAlgorithm --value true

# Create RA End Entity and Certificate
log "  Erstelle RA Zertifikat..."
ejbca_cmd ra addendentity --username SCEPRA --password ra123 --dn "CN=SCEP RA,O=EJBCA Container Quickstart" --caname ManagementCA --type 1 --token USERGENERATED --certprofile ENDUSER --eeprofile EMPTY 2>/dev/null || true
ejbca_cmd ra setclearpwd SCEPRA ra123 2>/dev/null || true

openssl genrsa -out /tmp/ra-key.pem 2048 2>/dev/null
openssl req -new -key /tmp/ra-key.pem -out /tmp/ra.csr -subj "/CN=SCEP RA/O=EJBCA Container Quickstart" 2>/dev/null

docker cp /tmp/ra.csr ejbca:/tmp/ra.csr
ejbca_cmd createcert --username SCEPRA --password ra123 -c /tmp/ra.csr -f /tmp/ra.pem >/dev/null 2>&1 || true
docker cp ejbca:/tmp/ra.pem /tmp/ra.pem

# Get CA Cert
curl -sk 'https://127.0.0.1:8443/ejbca/publicweb/apply/scep/CAIdentifier/pkiclient.exe?operation=GetCACert&message=ManagementCA' -o /tmp/ca.der

# Create PKCS#7 Chain (CA + CA + RA)
log "  Erstelle PKCS#7 Chain für Yealink..."
openssl crl2pkcs7 -nocrl \
  -certfile <(openssl x509 -inform DER -in /tmp/ca.der) \
  -certfile <(openssl x509 -inform DER -in /tmp/ca.der) \
  -certfile /tmp/ra.pem \
  -outform DER -out /etc/nginx/ca-ra-chain.p7b

# ============================================================================
# STEP 7: nginx Reverse Proxy
# ============================================================================
log "Step 7: nginx konfigurieren..."

cat > /etc/nginx/sites-available/ejbca-scep << 'EOF'
server {
    listen 80;
    server_name _;

    location /scep/scep {
        if ($arg_operation = "GetCACert") {
            rewrite ^ /static-cacert last;
        }
        if ($arg_operation = "GetCACaps") {
            rewrite ^ /ejbca/publicweb/apply/scep/CAIdentifier/pkiclient.exe?operation=GetCACaps&message=ManagementCA? break;
            proxy_pass https://127.0.0.1:8443;
        }
        if ($arg_operation = "PKIOperation") {
            rewrite ^ /ejbca/publicweb/apply/scep/CAIdentifier/pkiclient.exe?operation=PKIOperation&message=$arg_message? break;
            proxy_pass https://127.0.0.1:8443;
        }
        rewrite ^ /ejbca/publicweb/apply/scep/CAIdentifier/pkiclient.exe? break;
        proxy_pass https://127.0.0.1:8443;
        proxy_ssl_verify off;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location = /static-cacert {
        internal;
        alias /etc/nginx/ca-ra-chain.p7b;
        default_type application/x-x509-ca-ra-cert;
    }

    location /ejbca/ {
        proxy_pass https://127.0.0.1:8443;
        proxy_ssl_verify off;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
EOF

rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/ejbca-scep /etc/nginx/sites-enabled/ejbca-scep
nginx -t && systemctl enable nginx && systemctl restart nginx

# ============================================================================
# STEP 8: Syslog Server
# ============================================================================
log "Step 8: Syslog-Server konfigurieren..."

cat > /etc/rsyslog.d/10-yealink.conf << 'EOF'
module(load="imudp")
input(type="imudp" port="514")
template(name="YealinkPerHost" type="string" string="/var/log/yealink/%FROMHOST-IP%.log")
if $fromhost-ip != '127.0.0.1' then {
    action(type="omfile" dynaFile="YealinkPerHost")
    stop
}
EOF

systemctl restart rsyslog
log "Installation abgeschlossen! SCEP URL: http://${SERVER_IP}/scep/scep"
