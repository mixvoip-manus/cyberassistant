#!/bin/bash
###############################################################################
#  SCEP + FreeRADIUS + 802.1X - Testskript
#  Prüft alle Komponenten der Installation
#
#  Verwendung:
#    sudo ./test-scep.sh
#
###############################################################################

# Farben
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PASS=0
FAIL=0
WARN=0

pass() { echo -e "  ${GREEN}✓${NC} $1"; ((PASS++)); }
fail() { echo -e "  ${RED}✗${NC} $1"; ((FAIL++)); }
warn() { echo -e "  ${YELLOW}!${NC} $1"; ((WARN++)); }

# Root-Check
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}Dieses Script muss als root ausgeführt werden: sudo ./test-scep.sh${NC}"
    exit 1
fi

SERVER_IP=$(hostname -I | awk '{print $1}')

echo ""
echo "============================================"
echo "  SCEP Server - Systemtest"
echo "  Server: $SERVER_IP"
echo "  Datum:  $(date '+%Y-%m-%d %H:%M:%S')"
echo "============================================"
echo ""

###############################################################################
echo -e "${BLUE}[Services]${NC}"
###############################################################################

# 1. step-ca
if systemctl is-active step-ca > /dev/null 2>&1; then
    pass "step-ca Service läuft"
else
    fail "step-ca Service läuft NICHT"
    echo "       → sudo systemctl start step-ca"
    echo "       → sudo journalctl -u step-ca --since '1min ago'"
fi

# 2. Nginx
if systemctl is-active nginx > /dev/null 2>&1; then
    pass "Nginx Service läuft"
else
    fail "Nginx Service läuft NICHT"
    echo "       → sudo systemctl start nginx"
fi

# 3. FreeRADIUS
if systemctl is-active freeradius > /dev/null 2>&1; then
    pass "FreeRADIUS Service läuft"
else
    fail "FreeRADIUS Service läuft NICHT"
    echo "       → sudo systemctl start freeradius"
fi

echo ""

###############################################################################
echo -e "${BLUE}[SCEP Endpoint]${NC}"
###############################################################################

# 4. GetCACaps
CAPS=$(curl -s --connect-timeout 3 "http://127.0.0.1/scep?operation=GetCACaps")
if echo "$CAPS" | grep -q "POSTPKIOperation"; then
    pass "GetCACaps antwortet korrekt"
else
    fail "GetCACaps antwortet NICHT"
    echo "       → curl -v 'http://127.0.0.1/scep?operation=GetCACaps'"
fi

# 5. GetCACert
CACERT_SIZE=$(curl -s --connect-timeout 3 "http://127.0.0.1/scep?operation=GetCACert" | wc -c)
if [ "$CACERT_SIZE" -gt 1000 ]; then
    pass "GetCACert liefert Zertifikate ($CACERT_SIZE bytes)"
else
    fail "GetCACert Response zu klein ($CACERT_SIZE bytes)"
    echo "       → Erwartet: >1000 bytes (Root + Intermediate)"
fi

# 6. Root-CA Download
if curl -s --connect-timeout 3 "http://127.0.0.1/roots.pem" | grep -q "BEGIN CERTIFICATE"; then
    pass "Root-CA Download (/roots.pem) funktioniert"
else
    fail "Root-CA Download funktioniert NICHT"
fi

# 7. Externer Zugriff
if curl -s --connect-timeout 3 "http://${SERVER_IP}/scep?operation=GetCACaps" | grep -q "POSTPKIOperation"; then
    pass "SCEP extern erreichbar (http://${SERVER_IP}/scep)"
else
    warn "SCEP extern NICHT erreichbar (Firewall?)"
fi

echo ""

###############################################################################
echo -e "${BLUE}[Zertifikate]${NC}"
###############################################################################

# 8. Root CA vorhanden
if [ -f /etc/step-ca/root_ca.crt ]; then
    ROOT_CN=$(openssl x509 -in /etc/step-ca/root_ca.crt -noout -subject 2>/dev/null | sed 's/.*CN = //')
    ROOT_EXPIRY=$(openssl x509 -in /etc/step-ca/root_ca.crt -noout -enddate 2>/dev/null | sed 's/notAfter=//')
    pass "Root CA: $ROOT_CN (bis $ROOT_EXPIRY)"
else
    fail "Root CA nicht gefunden: /etc/step-ca/root_ca.crt"
fi

# 9. Intermediate CA vorhanden + von Root signiert
if [ -f /etc/step-ca/intermediate_ca.crt ]; then
    INT_CN=$(openssl x509 -in /etc/step-ca/intermediate_ca.crt -noout -subject 2>/dev/null | sed 's/.*CN = //')
    if openssl verify -CAfile /etc/step-ca/root_ca.crt /etc/step-ca/intermediate_ca.crt 2>&1 | grep -q "OK"; then
        pass "Intermediate CA: $INT_CN (von Root signiert ✓)"
    else
        fail "Intermediate CA: Signatur-Prüfung fehlgeschlagen!"
    fi
else
    fail "Intermediate CA nicht gefunden: /etc/step-ca/intermediate_ca.crt"
fi

# 10. RADIUS-Cert gültig
if [ -f /etc/freeradius/3.0/certs/radius.crt ]; then
    cat /etc/step-ca/root_ca.crt /etc/step-ca/intermediate_ca.crt > /tmp/_test_chain.pem
    if openssl verify -CAfile /tmp/_test_chain.pem /etc/freeradius/3.0/certs/radius.crt 2>&1 | grep -q "OK"; then
        RADIUS_EXPIRY=$(openssl x509 -in /etc/freeradius/3.0/certs/radius.crt -noout -enddate 2>/dev/null | sed 's/notAfter=//')
        pass "RADIUS-Cert gültig (bis $RADIUS_EXPIRY)"
    else
        fail "RADIUS-Cert: Signatur-Prüfung fehlgeschlagen!"
    fi
    rm -f /tmp/_test_chain.pem
else
    fail "RADIUS-Cert nicht gefunden: /etc/freeradius/3.0/certs/radius.crt"
fi

# 11. SCEP RA Cert
if [ -f /etc/step-ca/scep_ra.crt ]; then
    RA_SAN=$(openssl x509 -in /etc/step-ca/scep_ra.crt -noout -ext subjectAltName 2>/dev/null | grep -oP 'IP Address:\K[^,]+')
    pass "SCEP RA Cert vorhanden (SAN: ${RA_SAN:-unbekannt})"
else
    fail "SCEP RA Cert nicht gefunden: /etc/step-ca/scep_ra.crt"
fi

echo ""

###############################################################################
echo -e "${BLUE}[Konfiguration]${NC}"
###############################################################################

# 12. ca.json vorhanden und gültig
if [ -f /etc/step-ca/ca.json ]; then
    if python3 -c "import json; json.load(open('/etc/step-ca/ca.json'))" 2>/dev/null; then
        pass "ca.json vorhanden und valides JSON"
    else
        fail "ca.json ist kein gültiges JSON!"
    fi
else
    fail "ca.json nicht gefunden: /etc/step-ca/ca.json"
fi

# 13. Decrypter = Intermediate CA
if [ -f /etc/step-ca/ca.json ]; then
    DECRYPTER_OK=$(python3 -c "
import json, base64
with open('/etc/step-ca/ca.json') as f:
    c = json.load(f)
dec = base64.b64decode(c['authority']['provisioners'][0]['decrypterCertificate']).decode()
with open('/etc/step-ca/intermediate_ca.crt') as f:
    inter = f.read()
print('OK' if dec == inter else 'FAIL')
" 2>/dev/null)
    if [ "$DECRYPTER_OK" = "OK" ]; then
        pass "Decrypter = Intermediate CA (korrekt für Yealink)"
    else
        fail "Decrypter stimmt NICHT mit Intermediate CA überein!"
        echo "       → KRITISCH: Yealink-Enrollment wird fehlschlagen"
    fi
fi

# 14. includeRoot = true
if [ -f /etc/step-ca/ca.json ]; then
    INCLUDE_ROOT=$(python3 -c "
import json
with open('/etc/step-ca/ca.json') as f:
    c = json.load(f)
print(c['authority']['provisioners'][0].get('includeRoot', False))
" 2>/dev/null)
    if [ "$INCLUDE_ROOT" = "True" ]; then
        pass "includeRoot = true (GetCACert liefert Root + Intermediate)"
    else
        fail "includeRoot ist NICHT true!"
        echo "       → Yealink braucht Root + Intermediate in GetCACert"
    fi
fi

# 15. SCEP Template
if [ -f /etc/step-ca/templates/scep.tpl ]; then
    if grep -q "clientAuth" /etc/step-ca/templates/scep.tpl; then
        pass "SCEP Template vorhanden (clientAuth ✓)"
    else
        warn "SCEP Template vorhanden, aber ohne clientAuth"
    fi
else
    fail "SCEP Template nicht gefunden: /etc/step-ca/templates/scep.tpl"
fi

# 16. Nginx SCEP-Proxy konfiguriert
if [ -f /etc/nginx/sites-enabled/scep ]; then
    if grep -q "proxy_pass" /etc/nginx/sites-enabled/scep; then
        pass "Nginx SCEP-Proxy konfiguriert"
    else
        fail "Nginx SCEP-Config ohne proxy_pass!"
    fi
else
    fail "Nginx SCEP-Site nicht aktiviert"
fi

# 17. FreeRADIUS EAP-TLS
EAP_FILE="/etc/freeradius/3.0/mods-enabled/eap"
if [ -f "$EAP_FILE" ]; then
    if grep -q "ca-chain.pem" "$EAP_FILE"; then
        pass "FreeRADIUS EAP: ca-chain.pem konfiguriert"
    else
        warn "FreeRADIUS EAP: ca-chain.pem NICHT in eap-Modul"
    fi
else
    fail "FreeRADIUS EAP-Modul nicht gefunden"
fi

echo ""

###############################################################################
echo -e "${BLUE}[Ports]${NC}"
###############################################################################

# 18. Port 80 (Nginx)
if ss -tlnp | grep -q ":80 "; then
    pass "Port 80 offen (Nginx/HTTP)"
else
    fail "Port 80 NICHT offen"
fi

# 19. Port 8080 (step-ca insecure)
if ss -tlnp | grep -q ":8080 "; then
    pass "Port 8080 offen (step-ca HTTP/insecure)"
else
    fail "Port 8080 NICHT offen"
fi

# 20. Port 1812 (RADIUS)
if ss -ulnp | grep -q ":1812 "; then
    pass "Port 1812 offen (RADIUS/UDP)"
else
    fail "Port 1812 NICHT offen"
fi

echo ""

###############################################################################
# ZUSAMMENFASSUNG
###############################################################################

TOTAL=$((PASS + FAIL + WARN))
echo "============================================"
echo -e "  Ergebnis: ${GREEN}${PASS} bestanden${NC} / ${RED}${FAIL} fehlgeschlagen${NC} / ${YELLOW}${WARN} Warnungen${NC}"
echo "============================================"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "  ${GREEN}Server ist bereit für Yealink SCEP-Enrollment!${NC}"
    echo ""
    echo "  Yealink cfg-Parameter:"
    echo "    static.scep.enable = 1"
    echo "    static.scep.url = http://${SERVER_IP}/scep"
    echo "    static.scep.challenge_password = yealink"
    echo "    static.trusted_certificates.url = http://${SERVER_IP}/roots.pem"
else
    echo -e "  ${RED}Es gibt $FAIL Fehler — bitte beheben vor dem Phone-Test!${NC}"
fi

echo ""
exit $FAIL
