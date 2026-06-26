#!/bin/bash
###############################################################################
#  SCEP + FreeRADIUS + 802.1X Automated Setup Script
#  Für Yealink Telefone mit step-ca und MD5-Patch
#
#  Voraussetzungen:
#    - Ubuntu 24.04/26.04 LTS (ARM64 oder AMD64)
#    - User: scep (mit sudo-Rechten)
#    - SSH-Zugang funktioniert
#    - Internet-Zugang vorhanden
#
#  Verwendung:
#    scp setup-scep.sh scep@<IP>:~/
#    ssh scep@<IP>
#    chmod +x setup-scep.sh
#    sudo ./setup-scep.sh
#
###############################################################################

set -e

# Farben für Output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging
log_info()  { echo -e "${BLUE}[INFO]${NC} $1"; }
log_ok()    { echo -e "${GREEN}[OK]${NC} $1"; }
log_warn()  { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Root-Check
if [ "$EUID" -ne 0 ]; then
    log_error "Dieses Script muss als root ausgeführt werden: sudo ./setup-scep.sh"
    exit 1
fi

###############################################################################
# INTERAKTIVE KONFIGURATION
###############################################################################

echo ""
echo "============================================"
echo "  SCEP + FreeRADIUS + 802.1X Setup"
echo "  Für Yealink Telefone"
echo "============================================"
echo ""

# Architektur erkennen
ARCH=$(dpkg --print-architecture)
log_info "Erkannte Architektur: $ARCH"
echo ""

# Server-IP
CURRENT_IP=$(hostname -I | awk '{print $1}')
read -p "Server-IP-Adresse [$CURRENT_IP]: " SERVER_IP
SERVER_IP=${SERVER_IP:-$CURRENT_IP}

# Subnetz
read -p "Subnetzmaske in CIDR (z.B. 23 oder 24) [23]: " SUBNET_INPUT
SUBNET_INPUT=${SUBNET_INPUT:-23}
# Sicherstellen dass / vorangestellt ist
SUBNET="/${SUBNET_INPUT#/}"

# Gateway
DEFAULT_GW=$(ip route | grep default | awk '{print $3}' | head -1)
read -p "Default-Gateway [$DEFAULT_GW]: " GATEWAY
GATEWAY=${GATEWAY:-$DEFAULT_GW}

# SCEP Challenge Password
read -p "SCEP Challenge-Password [yealink]: " SCEP_CHALLENGE
SCEP_CHALLENGE=${SCEP_CHALLENGE:-yealink}

# RADIUS Shared Secret
read -p "RADIUS Shared Secret [testing123]: " RADIUS_SECRET
RADIUS_SECRET=${RADIUS_SECRET:-testing123}

# Switch-IP (RADIUS-Client)
read -p "Switch-IP (RADIUS-Client) [leer = später konfigurieren]: " SWITCH_IP

# CA-Informationen
read -p "CA Organisation [Mixvoip]: " CA_ORG
CA_ORG=${CA_ORG:-Mixvoip}

read -p "Root-CA Name [${CA_ORG} Root CA]: " ROOT_CA_NAME
ROOT_CA_NAME=${ROOT_CA_NAME:-${CA_ORG} Root CA}

read -p "Intermediate-CA Name [${CA_ORG} Intermediate CA]: " INT_CA_NAME
INT_CA_NAME=${INT_CA_NAME:-${CA_ORG} Intermediate CA}

# Netplan konfigurieren?
echo ""
read -p "Netplan auf statische IP konfigurieren? (j/n) [n]: " CONFIGURE_NETPLAN
CONFIGURE_NETPLAN=${CONFIGURE_NETPLAN:-n}

echo ""
echo "============================================"
echo "  Zusammenfassung"
echo "============================================"
echo ""
echo "  Server-IP:        ${SERVER_IP}${SUBNET}"
echo "  Gateway:          $GATEWAY"
echo "  Architektur:      $ARCH"
echo "  SCEP Challenge:   $SCEP_CHALLENGE"
echo "  RADIUS Secret:    $RADIUS_SECRET"
echo "  Switch-IP:        ${SWITCH_IP:-nicht konfiguriert}"
echo "  Root-CA:          $ROOT_CA_NAME"
echo "  Intermediate-CA:  $INT_CA_NAME"
echo "  Netplan ändern:   $CONFIGURE_NETPLAN"
echo ""
read -p "Fortfahren? (j/n): " CONFIRM
[ "$CONFIRM" != "j" ] && { echo "Abgebrochen."; exit 0; }

echo ""
log_info "Installation startet..."
echo ""

###############################################################################
# SCHRITT 1: NETPLAN (optional)
###############################################################################

if [ "$CONFIGURE_NETPLAN" = "j" ]; then
    log_info "[1/12] Netplan konfigurieren..."
    
    # Backup
    cp /etc/netplan/*.yaml /etc/netplan/backup_$(date +%Y%m%d).yaml 2>/dev/null || true
    
    # Interface-Name ermitteln
    IFACE=$(ip -o link show | grep -v lo | head -1 | awk -F': ' '{print $2}')
    
    cat > /etc/netplan/00-installer-config.yaml << EOF
network:
  version: 2
  ethernets:
    ${IFACE}:
      dhcp4: no
      addresses:
        - ${SERVER_IP}${SUBNET}
      routes:
        - to: default
          via: ${GATEWAY}
      nameservers:
        addresses:
          - ${GATEWAY}
EOF
    
    netplan apply
    log_ok "Netplan konfiguriert (Interface: $IFACE)"
else
    log_info "[1/12] Netplan-Konfiguration übersprungen"
fi

###############################################################################
# SCHRITT 2: PAKETE INSTALLIEREN
###############################################################################

log_info "[2/12] Pakete installieren..."

apt update -qq
apt install -y -qq \
    build-essential \
    git \
    curl \
    wget \
    nginx \
    freeradius \
    freeradius-utils \
    jq \
    python3 \
    tcpdump > /dev/null 2>&1

log_ok "Pakete installiert"

###############################################################################
# SCHRITT 3: GO INSTALLIEREN
###############################################################################

log_info "[3/12] Go installieren..."

GO_VERSION="1.26.0"

if [ "$ARCH" = "arm64" ]; then
    GO_ARCHIVE="go${GO_VERSION}.linux-arm64.tar.gz"
elif [ "$ARCH" = "amd64" ]; then
    GO_ARCHIVE="go${GO_VERSION}.linux-amd64.tar.gz"
else
    log_error "Nicht unterstützte Architektur: $ARCH"
    exit 1
fi

if [ ! -d "/usr/local/go" ]; then
    wget -q "https://go.dev/dl/${GO_ARCHIVE}" -O /tmp/${GO_ARCHIVE}
    tar -C /usr/local -xzf /tmp/${GO_ARCHIVE}
    rm -f /tmp/${GO_ARCHIVE}
fi

export PATH=$PATH:/usr/local/go/bin:/home/scep/go/bin
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' > /etc/profile.d/go.sh

log_ok "Go $(go version | awk '{print $3}') installiert"

###############################################################################
# SCHRITT 4: STEP-CLI INSTALLIEREN
###############################################################################

log_info "[4/12] step-cli installieren..."

STEP_CLI_VERSION="0.27.5"

if ! command -v step &> /dev/null; then
    rm -f /tmp/step-cli.deb
    if [ "$ARCH" = "arm64" ]; then
        wget -q "https://dl.smallstep.com/gh-release/cli/gh-release-header/v${STEP_CLI_VERSION}/step-cli_${STEP_CLI_VERSION}-1_arm64.deb" -O /tmp/step-cli.deb
    else
        wget -q "https://dl.smallstep.com/gh-release/cli/gh-release-header/v${STEP_CLI_VERSION}/step-cli_${STEP_CLI_VERSION}-1_amd64.deb" -O /tmp/step-cli.deb
    fi
    dpkg -i /tmp/step-cli.deb > /dev/null 2>&1
    rm -f /tmp/step-cli.deb
fi

log_ok "step-cli $(step version 2>&1 | head -1 | awk '{print $2}') installiert"

###############################################################################
# SCHRITT 5: STEP-CA MIT MD5-PATCH KOMPILIEREN
###############################################################################

log_info "[5/12] step-ca mit MD5-Patch kompilieren (dauert einige Minuten)..."

SCEP_USER_HOME="/home/scep"
CERT_DIR="${SCEP_USER_HOME}/certificates"

# Source klonen falls nicht vorhanden
if [ ! -d "$CERT_DIR" ]; then
    sudo -u scep git clone https://github.com/smallstep/certificates.git "$CERT_DIR"
fi

# pkcs7-patched Verzeichnis erstellen
PATCH_DIR="${CERT_DIR}/pkcs7-patched"
if [ ! -d "$PATCH_DIR" ]; then
    mkdir -p "$PATCH_DIR/internal"
    
    # Original pkcs7 herunterladen
    cd "$CERT_DIR"
    sudo -u scep bash -c "export PATH=$PATH:/usr/local/go/bin && cd $CERT_DIR && go mod download github.com/smallstep/pkcs7@v0.2.1"
    
    # Kopiere Original-Dateien
    PKCS7_CACHE=$(find /home/scep/go/pkg/mod/github.com/smallstep/pkcs7@v0.2.1 -maxdepth 0 2>/dev/null || echo "")
    if [ -n "$PKCS7_CACHE" ] && [ -d "$PKCS7_CACHE" ]; then
        cp -r ${PKCS7_CACHE}/* "$PATCH_DIR/"
        chmod -R u+w "$PATCH_DIR"
    fi
fi

# go.mod für pkcs7-patched
cat > "${PATCH_DIR}/go.mod" << 'EOF'
module github.com/smallstep/pkcs7

go 1.14

require golang.org/x/crypto v0.33.0
EOF

# PATCH: pkcs7.go - MD5 OID und getHashForOID
# Verwende Python für zuverlässiges Patching statt sed
python3 -c "
import sys

filepath = '${PATCH_DIR}/pkcs7.go'
with open(filepath, 'r') as f:
    content = f.read()

# 1. MD5 OID hinzufuegen falls nicht vorhanden
if 'OIDDigestAlgorithmMD5' not in content:
    lines = content.split(chr(10))
    new_lines = []
    for line in lines:
        new_lines.append(line)
        if 'OIDDigestAlgorithmSHA224' in line and 'asn1.ObjectIdentifier' in line:
            new_lines.append(chr(9) + 'OIDDigestAlgorithmMD5    = asn1.ObjectIdentifier{1, 2, 840, 113549, 2, 5}')
    content = chr(10).join(new_lines)

# 2. MD5 case in getHashForOID hinzufuegen falls nicht vorhanden
if 'crypto.MD5' not in content:
    old = chr(9) + '}' + chr(10) + chr(9) + 'return crypto.Hash(0), ErrUnsupportedAlgorithm'
    new = chr(9) + 'case oid.Equal(OIDDigestAlgorithmMD5):' + chr(10) + chr(9) + chr(9) + 'return crypto.MD5, nil' + chr(10) + chr(9) + '}' + chr(10) + chr(9) + 'return crypto.Hash(0), ErrUnsupportedAlgorithm'
    if old in content:
        content = content.replace(old, new, 1)
    else:
        print('WARNING: Could not find insertion point for MD5 case')
        sys.exit(1)

with open(filepath, 'w') as f:
    f.write(content)

print('pkcs7.go patched successfully')
"

# PATCH: verify.go - MD5 Signatur-Support
cat > "${PATCH_DIR}/verify.go" << 'GOFILE'
package pkcs7

import (
	"bytes"
	"crypto"
	"crypto/md5"
	"crypto/rsa"
	"crypto/subtle"
	"crypto/x509"
	"crypto/x509/pkix"
	"encoding/asn1"
	"errors"
	"fmt"
	"time"
)

// Verify is a wrapper around VerifyWithChain() that initializes an empty
// trust store, effectively disabling certificate verification when validating
// a signature.
func (p7 *PKCS7) Verify() (err error) {
	return p7.VerifyWithChain(nil)
}

// VerifyWithChain checks the signatures of a PKCS7 object.
func (p7 *PKCS7) VerifyWithChain(truststore *x509.CertPool) (err error) {
	if len(p7.Signers) == 0 {
		return errors.New("pkcs7: Message has no signers")
	}
	for _, signer := range p7.Signers {
		if err := verifySignature(p7, signer, truststore); err != nil {
			return err
		}
	}
	return nil
}

// VerifyWithChainAtTime checks the signatures of a PKCS7 object.
func (p7 *PKCS7) VerifyWithChainAtTime(truststore *x509.CertPool, currentTime time.Time) (err error) {
	if len(p7.Signers) == 0 {
		return errors.New("pkcs7: Message has no signers")
	}
	for _, signer := range p7.Signers {
		if err := verifySignatureAtTime(p7, signer, truststore, currentTime); err != nil {
			return err
		}
	}
	return nil
}

// SigningTimeNotValidError is returned when the signing time attribute
// falls outside of the signer certificate validity.
type SigningTimeNotValidError struct {
	SigningTime time.Time
	NotBefore  time.Time
	NotAfter   time.Time
}

func (e *SigningTimeNotValidError) Error() string {
	return fmt.Sprintf("pkcs7: signing time %q is outside of certificate validity %q to %q",
		e.SigningTime.Format(time.RFC3339),
		e.NotBefore.Format(time.RFC3339),
		e.NotAfter.Format(time.RFC3339))
}

func verifySignatureAtTime(p7 *PKCS7, signer signerInfo, truststore *x509.CertPool, currentTime time.Time) (err error) {
	signedData := p7.Content
	ee := getCertFromCertsByIssuerAndSerial(p7.Certificates, signer.IssuerAndSerialNumber)
	if ee == nil {
		return errors.New("pkcs7: No certificate for signer")
	}
	if len(signer.AuthenticatedAttributes) > 0 {
		var (
			digest      []byte
			signingTime time.Time
		)
		err := unmarshalAttribute(signer.AuthenticatedAttributes, OIDAttributeMessageDigest, &digest)
		if err != nil {
			return err
		}
		hash, err := getHashForOID(signer.DigestAlgorithm.Algorithm)
		if err != nil {
			return err
		}
		computed, err := calculateHash(p7.Hasher, hash, p7.Content)
		if err != nil {
			return err
		}
		if subtle.ConstantTimeCompare(digest, computed) != 1 {
			return &MessageDigestMismatchError{
				ExpectedDigest: digest,
				ActualDigest:   computed,
			}
		}
		signedData, err = marshalAttributes(signer.AuthenticatedAttributes)
		if err != nil {
			return err
		}
		err = unmarshalAttribute(signer.AuthenticatedAttributes, OIDAttributeSigningTime, &signingTime)
		if err == nil {
			if signingTime.After(ee.NotAfter) || signingTime.Before(ee.NotBefore) {
				return &SigningTimeNotValidError{
					SigningTime: signingTime,
					NotBefore:  ee.NotBefore,
					NotAfter:   ee.NotAfter,
				}
			}
		}
	}
	if truststore != nil {
		_, err = verifyCertChain(ee, p7.Certificates, truststore, currentTime)
		if err != nil {
			return err
		}
	}
	sigalg, err := getSignatureAlgorithm(signer.DigestEncryptionAlgorithm, signer.DigestAlgorithm)
	if err != nil {
		return err
	}
	return checkSignatureWithMD5Support(ee, sigalg, signedData, signer.EncryptedDigest)
}

func verifySignature(p7 *PKCS7, signer signerInfo, truststore *x509.CertPool) (err error) {
	signedData := p7.Content
	ee := getCertFromCertsByIssuerAndSerial(p7.Certificates, signer.IssuerAndSerialNumber)
	if ee == nil {
		return errors.New("pkcs7: No certificate for signer")
	}
	signingTime := time.Now().UTC()
	if len(signer.AuthenticatedAttributes) > 0 {
		var digest []byte
		err := unmarshalAttribute(signer.AuthenticatedAttributes, OIDAttributeMessageDigest, &digest)
		if err != nil {
			return err
		}
		hash, err := getHashForOID(signer.DigestAlgorithm.Algorithm)
		if err != nil {
			return err
		}
		computed, err := calculateHash(p7.Hasher, hash, p7.Content)
		if err != nil {
			return err
		}
		if subtle.ConstantTimeCompare(digest, computed) != 1 {
			return &MessageDigestMismatchError{
				ExpectedDigest: digest,
				ActualDigest:   computed,
			}
		}
		signedData, err = marshalAttributes(signer.AuthenticatedAttributes)
		if err != nil {
			return err
		}
		err = unmarshalAttribute(signer.AuthenticatedAttributes, OIDAttributeSigningTime, &signingTime)
		if err == nil {
			if signingTime.After(ee.NotAfter) || signingTime.Before(ee.NotBefore) {
				return &SigningTimeNotValidError{
					SigningTime: signingTime,
					NotBefore:  ee.NotBefore,
					NotAfter:   ee.NotAfter,
				}
			}
		}
	}
	if truststore != nil {
		_, err = verifyCertChain(ee, p7.Certificates, truststore, signingTime)
		if err != nil {
			return err
		}
	}
	sigalg, err := getSignatureAlgorithm(signer.DigestEncryptionAlgorithm, signer.DigestAlgorithm)
	if err != nil {
		return err
	}
	return checkSignatureWithMD5Support(ee, sigalg, signedData, signer.EncryptedDigest)
}

// GetOnlySigner returns an x509.Certificate for the first signer of the signed
// data payload. If there are more or less than one signer, nil is returned
func (p7 *PKCS7) GetOnlySigner() *x509.Certificate {
	if len(p7.Signers) != 1 {
		return nil
	}
	signer := p7.Signers[0]
	return getCertFromCertsByIssuerAndSerial(p7.Certificates, signer.IssuerAndSerialNumber)
}

// UnmarshalSignedAttribute decodes a single attribute from the signer info
func (p7 *PKCS7) UnmarshalSignedAttribute(attributeType asn1.ObjectIdentifier, out interface{}) error {
	sd, ok := p7.raw.(signedData)
	if !ok {
		return errors.New("pkcs7: payload is not signedData content")
	}
	if len(sd.SignerInfos) < 1 {
		return errors.New("pkcs7: payload has no signers")
	}
	attributes := sd.SignerInfos[0].AuthenticatedAttributes
	return unmarshalAttribute(attributes, attributeType, out)
}

func parseSignedData(data []byte) (*PKCS7, error) {
	var sd signedData
	asn1.Unmarshal(data, &sd)
	certs, err := sd.Certificates.Parse()
	if err != nil {
		return nil, err
	}

	var compound asn1.RawValue
	var content unsignedData

	if len(sd.ContentInfo.Content.Bytes) > 0 {
		if _, err := asn1.Unmarshal(sd.ContentInfo.Content.Bytes, &compound); err != nil {
			return nil, err
		}
	}
	if compound.IsCompound {
		if compound.Tag == 4 {
			for len(compound.Bytes) > 0 {
				var cdata asn1.RawValue
				if _, err = asn1.Unmarshal(compound.Bytes, &cdata); err != nil {
					return nil, err
				}
				content = append(content, cdata.Bytes...)
				compound.Bytes = compound.Bytes[len(cdata.FullBytes):]
			}
		} else {
			content = compound.Bytes
		}
	} else {
		content = compound.Bytes
	}
	return &PKCS7{
		Content:      content,
		Certificates: certs,
		CRLs:         sd.CRLs,
		Signers:      sd.SignerInfos,
		raw:          sd}, nil
}

func verifyCertChain(ee *x509.Certificate, certs []*x509.Certificate, truststore *x509.CertPool, currentTime time.Time) (chains [][]*x509.Certificate, err error) {
	intermediates := x509.NewCertPool()
	for _, intermediate := range certs {
		intermediates.AddCert(intermediate)
	}
	verifyOptions := x509.VerifyOptions{
		Roots:         truststore,
		Intermediates: intermediates,
		KeyUsages:     []x509.ExtKeyUsage{x509.ExtKeyUsageAny},
		CurrentTime:   currentTime,
	}
	chains, err = ee.Verify(verifyOptions)
	if err != nil {
		return chains, fmt.Errorf("pkcs7: failed to verify certificate chain: %v", err)
	}
	return
}

// MessageDigestMismatchError is returned when the signer data digest does not
// match the computed digest for the contained content
type MessageDigestMismatchError struct {
	ExpectedDigest []byte
	ActualDigest   []byte
}

func (err *MessageDigestMismatchError) Error() string {
	return fmt.Sprintf("pkcs7: Message digest mismatch\n\tExpected: %X\n\tActual  : %X", err.ExpectedDigest, err.ActualDigest)
}

func getSignatureAlgorithm(digestEncryption, digest pkix.AlgorithmIdentifier) (x509.SignatureAlgorithm, error) {
	switch {
	case digestEncryption.Algorithm.Equal(OIDDigestAlgorithmECDSASHA1):
		return x509.ECDSAWithSHA1, nil
	case digestEncryption.Algorithm.Equal(OIDDigestAlgorithmECDSASHA256):
		return x509.ECDSAWithSHA256, nil
	case digestEncryption.Algorithm.Equal(OIDDigestAlgorithmECDSASHA384):
		return x509.ECDSAWithSHA384, nil
	case digestEncryption.Algorithm.Equal(OIDDigestAlgorithmECDSASHA512):
		return x509.ECDSAWithSHA512, nil
	case digestEncryption.Algorithm.Equal(OIDEncryptionAlgorithmRSA),
		digestEncryption.Algorithm.Equal(OIDEncryptionAlgorithmRSASHA1),
		digestEncryption.Algorithm.Equal(OIDEncryptionAlgorithmRSASHA256),
		digestEncryption.Algorithm.Equal(OIDEncryptionAlgorithmRSASHA384),
		digestEncryption.Algorithm.Equal(OIDEncryptionAlgorithmRSASHA512):
		switch {
		case digest.Algorithm.Equal(OIDDigestAlgorithmSHA1), digest.Algorithm.Equal(OIDEncryptionAlgorithmRSASHA1):
			return x509.SHA1WithRSA, nil
		case digest.Algorithm.Equal(OIDDigestAlgorithmSHA256), digest.Algorithm.Equal(OIDEncryptionAlgorithmRSASHA256):
			return x509.SHA256WithRSA, nil
		case digest.Algorithm.Equal(OIDDigestAlgorithmSHA384), digest.Algorithm.Equal(OIDEncryptionAlgorithmRSASHA384):
			return x509.SHA384WithRSA, nil
		case digest.Algorithm.Equal(OIDDigestAlgorithmSHA512), digest.Algorithm.Equal(OIDEncryptionAlgorithmRSASHA512):
			return x509.SHA512WithRSA, nil
		case digest.Algorithm.Equal(OIDDigestAlgorithmMD5):
			return x509.MD5WithRSA, nil
		default:
			return -1, fmt.Errorf("pkcs7: unsupported digest %q for encryption algorithm %q",
				digest.Algorithm.String(), digestEncryption.Algorithm.String())
		}
	case digestEncryption.Algorithm.Equal(OIDDigestAlgorithmDSA),
		digestEncryption.Algorithm.Equal(OIDDigestAlgorithmDSASHA1):
		switch {
		case digest.Algorithm.Equal(OIDDigestAlgorithmSHA1):
			return x509.DSAWithSHA1, nil
		case digest.Algorithm.Equal(OIDDigestAlgorithmSHA256):
			return x509.DSAWithSHA256, nil
		default:
			return -1, fmt.Errorf("pkcs7: unsupported digest %q for encryption algorithm %q",
				digest.Algorithm.String(), digestEncryption.Algorithm.String())
		}
	case digestEncryption.Algorithm.Equal(OIDEncryptionAlgorithmECDSAP256),
		digestEncryption.Algorithm.Equal(OIDEncryptionAlgorithmECDSAP384),
		digestEncryption.Algorithm.Equal(OIDEncryptionAlgorithmECDSAP521):
		switch {
		case digest.Algorithm.Equal(OIDDigestAlgorithmSHA1):
			return x509.ECDSAWithSHA1, nil
		case digest.Algorithm.Equal(OIDDigestAlgorithmSHA256):
			return x509.ECDSAWithSHA256, nil
		case digest.Algorithm.Equal(OIDDigestAlgorithmSHA384):
			return x509.ECDSAWithSHA384, nil
		case digest.Algorithm.Equal(OIDDigestAlgorithmSHA512):
			return x509.ECDSAWithSHA512, nil
		default:
			return -1, fmt.Errorf("pkcs7: unsupported digest %q for encryption algorithm %q",
				digest.Algorithm.String(), digestEncryption.Algorithm.String())
		}
	default:
		return -1, fmt.Errorf("pkcs7: unsupported algorithm %q",
			digestEncryption.Algorithm.String())
	}
}

func getCertFromCertsByIssuerAndSerial(certs []*x509.Certificate, ias issuerAndSerial) *x509.Certificate {
	for _, cert := range certs {
		if isCertMatchForIssuerAndSerial(cert, ias) {
			return cert
		}
	}
	return nil
}

func unmarshalAttribute(attrs []attribute, attributeType asn1.ObjectIdentifier, out interface{}) error {
	for _, attr := range attrs {
		if attr.Type.Equal(attributeType) {
			_, err := asn1.Unmarshal(attr.Value.Bytes, out)
			return err
		}
	}
	return errors.New("pkcs7: attribute type not in attributes")
}

func calculateHash(hasher Hasher, hashFunc crypto.Hash, content []byte) (computed []byte, err error) {
	if hasher != nil {
		computed, err = hasher.Hash(hashFunc, bytes.NewReader(content))
	} else {
		if !hashFunc.Available() {
			return nil, fmt.Errorf("hash function %v not available", hashFunc)
		}

		h := hashFunc.New()
		_, _ = h.Write(content)
		computed = h.Sum(nil)
	}

	return
}

// checkSignatureWithMD5Support performs signature verification including MD5-RSA
// which is rejected by Go's x509.CheckSignature since Go 1.18
func checkSignatureWithMD5Support(cert *x509.Certificate, algo x509.SignatureAlgorithm, signed, signature []byte) error {
	if algo == x509.MD5WithRSA {
		// Manual MD5-RSA verification
		pub, ok := cert.PublicKey.(*rsa.PublicKey)
		if !ok {
			return errors.New("pkcs7: certificate public key is not RSA")
		}
		h := md5.New()
		h.Write(signed)
		digest := h.Sum(nil)
		return rsa.VerifyPKCS1v15(pub, crypto.MD5, digest, signature)
	}
	return cert.CheckSignature(algo, signed, signature)
}
GOFILE

# Replace-Directive in go.mod
cd "$CERT_DIR"
if ! grep -q "replace github.com/smallstep/pkcs7" go.mod; then
    echo 'replace github.com/smallstep/pkcs7 v0.2.1 => ./pkcs7-patched' >> go.mod
fi

# Kompilieren
log_info "    Kompiliere step-ca (kann 2-5 Minuten dauern)..."
cd "$CERT_DIR"
sudo -u scep bash -c "export PATH=$PATH:/usr/local/go/bin && export GOPATH=/home/scep/go && cd $CERT_DIR && go mod tidy 2>/dev/null && CGO_ENABLED=0 go build -o step-ca-patched ./cmd/step-ca"

# Installieren
cp "${CERT_DIR}/step-ca-patched" /usr/bin/step-ca
chmod +x /usr/bin/step-ca

log_ok "step-ca kompiliert und installiert"

###############################################################################
# SCHRITT 6: ZERTIFIKATE ERSTELLEN
###############################################################################

log_info "[6/12] PKI-Zertifikate erstellen..."

mkdir -p /etc/step-ca/{certs,templates}

# Root CA (RSA 2048, 10 Jahre)
if [ ! -f /etc/step-ca/root_ca.crt ]; then
    step certificate create "$ROOT_CA_NAME" \
        /etc/step-ca/root_ca.crt \
        /etc/step-ca/root_ca.key \
        --profile root-ca \
        --kty RSA \
        --size 2048 \
        --not-after 87600h \
        --no-password --insecure
    log_ok "    Root CA erstellt: $ROOT_CA_NAME"
else
    log_warn "    Root CA existiert bereits, übersprungen"
fi

# Intermediate CA (RSA 2048, 10 Jahre)
if [ ! -f /etc/step-ca/intermediate_ca.crt ]; then
    step certificate create "$INT_CA_NAME" \
        /etc/step-ca/intermediate_ca.crt \
        /etc/step-ca/intermediate_ca.key \
        --profile intermediate-ca \
        --ca /etc/step-ca/root_ca.crt \
        --ca-key /etc/step-ca/root_ca.key \
        --kty RSA \
        --size 2048 \
        --not-after 87600h \
        --no-password --insecure
    log_ok "    Intermediate CA erstellt: $INT_CA_NAME"
else
    log_warn "    Intermediate CA existiert bereits, übersprungen"
fi

# SCEP RA Zertifikat (RSA 2048, 2 Jahre)
step certificate create "SCEP RA" \
    /etc/step-ca/scep_ra.crt \
    /etc/step-ca/scep_ra.key \
    --ca /etc/step-ca/intermediate_ca.crt \
    --ca-key /etc/step-ca/intermediate_ca.key \
    --kty RSA \
    --size 2048 \
    --not-after 17520h \
    --san "$SERVER_IP" \
    --no-password --insecure --force
log_ok "    SCEP RA Zertifikat erstellt (SAN: $SERVER_IP)"

# Berechtigungen
chmod 600 /etc/step-ca/*.key
chmod 644 /etc/step-ca/*.crt

log_ok "PKI-Zertifikate erstellt"

###############################################################################
# SCHRITT 7: CA.JSON KONFIGURATION
###############################################################################

log_info "[7/12] step-ca Konfiguration erstellen..."

# ca.json wird direkt per Python geschrieben (step ca provisioner add braucht
# eine laufende CA-Instanz, die zu diesem Zeitpunkt noch nicht existiert)
python3 << PYEOF
import json, base64, sys

server_ip = "${SERVER_IP}"
scep_challenge = "${SCEP_CHALLENGE}"

# Intermediate CA Cert und Key base64-kodieren (für SCEP Decrypter)
with open("/etc/step-ca/intermediate_ca.crt") as f:
    decrypter_cert = base64.b64encode(f.read().encode()).decode()
with open("/etc/step-ca/intermediate_ca.key") as f:
    decrypter_key = base64.b64encode(f.read().encode()).decode()

config = {
    "root": "/etc/step-ca/root_ca.crt",
    "federatedRoots": None,
    "crt": "/etc/step-ca/intermediate_ca.crt",
    "key": "/etc/step-ca/intermediate_ca.key",
    "address": ":8443",
    "insecureAddress": ":8080",
    "dnsNames": [server_ip],
    "logger": {"format": "text"},
    "db": {
        "type": "badgerv2",
        "dataSource": "/etc/step-ca/db"
    },
    "authority": {
        "provisioners": [
            {
                "type": "SCEP",
                "name": "scep",
                "forceCN": True,
                "challenge": scep_challenge,
                "minimumPublicKeyLength": 2048,
                "includeRoot": True,
                "decrypterCertificate": decrypter_cert,
                "decrypterKeyPEM": decrypter_key,
                "decrypterKeyPasswordFile": "",
                "options": {
                    "x509": {
                        "templateFile": "/etc/step-ca/templates/scep.tpl"
                    }
                },
                "claims": {
                    "defaultTLSCertDuration": "8760h",
                    "maxTLSCertDuration": "17520h",
                    "enableSSHCA": False,
                    "disableRenewal": False,
                    "disableSmallstepExtensions": True
                }
            }
        ],
        "template": {},
        "backdate": "1m0s"
    },
    "tls": {
        "cipherSuites": [
            "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256",
            "TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256"
        ],
        "minVersion": 1.2,
        "maxVersion": 1.3,
        "renegotiation": False
    }
}

with open("/etc/step-ca/ca.json", "w") as f:
    json.dump(config, f, indent=2)

print("ca.json geschrieben")
PYEOF

# DB-Verzeichnis erstellen
mkdir -p /etc/step-ca/db

log_ok "ca.json konfiguriert (Decrypter: Intermediate CA)"

###############################################################################
# SCHRITT 8: SCEP TEMPLATE
###############################################################################

log_info "[8/12] SCEP-Template erstellen..."

cat > /etc/step-ca/templates/scep.tpl << 'EOF'
{
    "subject": {{ toJson .Insecure.CR.Subject }},
    "sans": [{"type":"dns","value":"{{ .Insecure.CR.Subject.CommonName }}"}],
    "keyUsage": ["digitalSignature", "keyEncipherment"],
    "extKeyUsage": ["clientAuth"]
}
EOF

log_ok "SCEP-Template erstellt"

###############################################################################
# SCHRITT 9: SYSTEMD SERVICE
###############################################################################

log_info "[9/12] systemd Service einrichten..."

cat > /etc/systemd/system/step-ca.service << 'EOF'
[Unit]
Description=step-ca SCEP Server
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
ExecStart=/usr/bin/step-ca /etc/step-ca/ca.json
Restart=on-failure
RestartSec=5
User=root

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable step-ca > /dev/null 2>&1
systemctl start step-ca

sleep 2
if systemctl is-active step-ca > /dev/null 2>&1; then
    log_ok "step-ca Service läuft"
else
    log_error "step-ca Service konnte nicht gestartet werden!"
    journalctl -u step-ca --since "30s ago" --no-pager
    exit 1
fi

###############################################################################
# SCHRITT 10: NGINX REVERSE PROXY
###############################################################################

log_info "[10/12] Nginx konfigurieren..."

# Default-Site deaktivieren
rm -f /etc/nginx/sites-enabled/default

cat > /etc/nginx/sites-available/scep << 'EOF'
server {
    listen 80;
    server_name _;

    location /scep {
        proxy_pass http://127.0.0.1:8080/scep/scep;
        proxy_hide_header Content-Type;
        
        set $scep_ct "application/x-pki-message";
        if ($arg_operation = "GetCACert" ) {
            set $scep_ct "application/x-x509-ca-ra-cert";
        }
        if ($arg_operation = "GetCACaps") {
            set $scep_ct "text/plain";
        }
        
        add_header Content-Type $scep_ct always;
    }

    location /roots.pem {
        alias /etc/step-ca/root_ca.crt;
        add_header Content-Type application/x-x509-ca-cert;
    }
}
EOF

ln -sf /etc/nginx/sites-available/scep /etc/nginx/sites-enabled/scep
nginx -t > /dev/null 2>&1
systemctl restart nginx

log_ok "Nginx konfiguriert (SCEP Reverse Proxy + Root-CA Download)"

###############################################################################
# SCHRITT 11: FREERADIUS
###############################################################################

log_info "[11/12] FreeRADIUS konfigurieren..."

# CA-Chain erstellen
cat /etc/step-ca/root_ca.crt /etc/step-ca/intermediate_ca.crt > /etc/freeradius/3.0/certs/ca-chain.pem
chown freerad:freerad /etc/freeradius/3.0/certs/ca-chain.pem

# RADIUS-Server-Zertifikat erstellen
step certificate create "radius" \
    /etc/freeradius/3.0/certs/radius.crt \
    /etc/freeradius/3.0/certs/radius.key \
    --ca /etc/step-ca/intermediate_ca.crt \
    --ca-key /etc/step-ca/intermediate_ca.key \
    --not-after 8760h \
    --san "$SERVER_IP" \
    --san radius \
    --no-password --insecure --force
chown freerad:freerad /etc/freeradius/3.0/certs/radius.crt
chown freerad:freerad /etc/freeradius/3.0/certs/radius.key

# EAP-Modul konfigurieren
EAP_FILE="/etc/freeradius/3.0/mods-enabled/eap"
if [ -f "$EAP_FILE" ]; then
    # private_key_password leeren
    sed -i 's|private_key_password = .*|private_key_password =|' "$EAP_FILE"
    # Zertifikat-Pfade setzen
    sed -i 's|private_key_file = .*|private_key_file = /etc/freeradius/3.0/certs/radius.key|' "$EAP_FILE"
    sed -i 's|certificate_file = .*|certificate_file = /etc/freeradius/3.0/certs/radius.crt|' "$EAP_FILE"
    sed -i 's|ca_file = .*|ca_file = /etc/freeradius/3.0/certs/ca-chain.pem|' "$EAP_FILE"
fi

# RADIUS-Client (Switch) konfigurieren
if [ -n "$SWITCH_IP" ]; then
    cat >> /etc/freeradius/3.0/clients.conf << EOF

client switch {
    ipaddr = ${SWITCH_IP}
    secret = ${RADIUS_SECRET}
    shortname = switch
}
EOF
    log_ok "    RADIUS-Client konfiguriert: $SWITCH_IP"
else
    cat >> /etc/freeradius/3.0/clients.conf << EOF

# Gesamtes lokales Subnetz als Client erlauben
client local-network {
    ipaddr = 0.0.0.0/0
    secret = ${RADIUS_SECRET}
    shortname = local
}
EOF
    log_warn "    Kein Switch konfiguriert — alle IPs erlaubt (später einschränken!)"
fi

# FreeRADIUS starten
systemctl enable freeradius > /dev/null 2>&1
systemctl restart freeradius

if systemctl is-active freeradius > /dev/null 2>&1; then
    log_ok "FreeRADIUS läuft"
else
    log_error "FreeRADIUS konnte nicht gestartet werden!"
    journalctl -u freeradius --since "30s ago" --no-pager
fi

###############################################################################
# SCHRITT 12: RECONFIG-SCRIPT INSTALLIEREN
###############################################################################

log_info "[12/12] Reconfig-Script installieren..."

cat > /home/scep/scep-reconfig.sh << 'RECONFIG'
#!/bin/bash
set -e
echo "============================================"
echo "  SCEP Server - IP Reconfiguration"
echo "============================================"
echo ""
CURRENT_IP=$(hostname -I | awk '{print $1}')
echo "Aktuelle Server-IP: $CURRENT_IP"
echo ""
read -p "Neue Server-IP eingeben: " NEW_IP
echo ""
echo "Neue IP: $NEW_IP"
read -p "Fortfahren? (j/n): " CONFIRM
[ "$CONFIRM" != "j" ] && exit 1
echo ""
echo "[1/6] step-ca stoppen..."
systemctl stop step-ca
echo "[2/6] SCEP RA Zertifikat neu erstellen..."
rm -f /etc/step-ca/scep_ra.crt /etc/step-ca/scep_ra.key
step certificate create "SCEP RA" \
  /etc/step-ca/scep_ra.crt /etc/step-ca/scep_ra.key \
  --ca /etc/step-ca/intermediate_ca.crt \
  --ca-key /etc/step-ca/intermediate_ca.key \
  --kty RSA --size 2048 --not-after 17520h \
  --san "$NEW_IP" --no-password --insecure
echo "    RA Zertifikat erstellt mit SAN: $NEW_IP"
echo "[3/6] ca.json aktualisieren..."
python3 -c "
import json, base64
with open('/etc/step-ca/ca.json') as f:
    config = json.load(f)
config['dnsNames'] = ['localhost', '$NEW_IP']
with open('/etc/step-ca/intermediate_ca.crt') as f:
    cert = base64.b64encode(f.read().encode()).decode()
with open('/etc/step-ca/intermediate_ca.key') as f:
    key = base64.b64encode(f.read().encode()).decode()
config['authority']['provisioners'][0]['decrypterCertificate'] = cert
config['authority']['provisioners'][0]['decrypterKeyPEM'] = key
with open('/etc/step-ca/ca.json', 'w') as f:
    json.dump(config, f, indent=2)
"
echo "[4/6] RADIUS-Zertifikat neu erstellen..."
step certificate create "radius" \
  /etc/freeradius/3.0/certs/radius.crt /etc/freeradius/3.0/certs/radius.key \
  --ca /etc/step-ca/intermediate_ca.crt \
  --ca-key /etc/step-ca/intermediate_ca.key \
  --not-after 8760h --san "$NEW_IP" --san radius \
  --no-password --insecure --force
chown freerad:freerad /etc/freeradius/3.0/certs/radius.crt
chown freerad:freerad /etc/freeradius/3.0/certs/radius.key
echo "[5/6] Services starten..."
systemctl start step-ca
systemctl restart freeradius
echo "[6/6] Verifizierung..."
sleep 2
systemctl is-active step-ca > /dev/null && echo "✓ step-ca läuft" || echo "✗ step-ca FEHLER"
curl -s "http://127.0.0.1/scep?operation=GetCACaps" > /dev/null && echo "✓ SCEP Endpunkt OK" || echo "✗ SCEP FEHLER"
systemctl is-active freeradius > /dev/null && echo "✓ FreeRADIUS läuft" || echo "✗ FreeRADIUS FEHLER"
echo ""
echo "============================================"
echo "  Fertig!"
echo "============================================"
echo "Server-IP:      $NEW_IP"
echo "SCEP URL:       http://$NEW_IP/scep"
echo "Root-CA URL:    http://$NEW_IP/roots.pem"
echo ""
echo "Auf den Telefonen muss nur static.scep.url angepasst werden."
echo "Root CA muss NICHT neu hochgeladen werden."
RECONFIG

chmod +x /home/scep/scep-reconfig.sh
chown scep:scep /home/scep/scep-reconfig.sh

log_ok "Reconfig-Script installiert: /home/scep/scep-reconfig.sh"

###############################################################################
# VERIFIZIERUNG
###############################################################################

echo ""
echo "============================================"
echo "  VERIFIZIERUNG"
echo "============================================"
echo ""

# step-ca
if systemctl is-active step-ca > /dev/null 2>&1; then
    echo -e "  ${GREEN}✓${NC} step-ca läuft"
else
    echo -e "  ${RED}✗${NC} step-ca FEHLER"
fi

# SCEP Endpoint
if curl -s "http://127.0.0.1/scep?operation=GetCACaps" | grep -q "POSTPKIOperation"; then
    echo -e "  ${GREEN}✓${NC} SCEP Endpoint antwortet"
else
    echo -e "  ${RED}✗${NC} SCEP Endpoint FEHLER"
fi

# Root-CA Download
if curl -s "http://127.0.0.1/roots.pem" | grep -q "BEGIN CERTIFICATE"; then
    echo -e "  ${GREEN}✓${NC} Root-CA Download funktioniert"
else
    echo -e "  ${RED}✗${NC} Root-CA Download FEHLER"
fi

# FreeRADIUS
if systemctl is-active freeradius > /dev/null 2>&1; then
    echo -e "  ${GREEN}✓${NC} FreeRADIUS läuft"
else
    echo -e "  ${RED}✗${NC} FreeRADIUS FEHLER"
fi

# Nginx
if systemctl is-active nginx > /dev/null 2>&1; then
    echo -e "  ${GREEN}✓${NC} Nginx läuft"
else
    echo -e "  ${RED}✗${NC} Nginx FEHLER"
fi

echo ""
echo "============================================"
echo "  INSTALLATION ABGESCHLOSSEN"
echo "============================================"
echo ""
echo "  Server-IP:       $SERVER_IP"
echo "  SCEP URL:        http://$SERVER_IP/scep"
echo "  Root-CA URL:     http://$SERVER_IP/roots.pem"
echo "  SCEP Challenge:  $SCEP_CHALLENGE"
echo "  RADIUS Secret:   $RADIUS_SECRET"
echo "  RADIUS Port:     1812"
echo ""
echo "  Yealink cfg-Parameter:"
echo "    static.scep.enable = 1"
echo "    static.scep.url = http://$SERVER_IP/scep"
echo "    static.scep.challenge_password = $SCEP_CHALLENGE"
echo "    static.trusted_certificates.url = http://$SERVER_IP/roots.pem"
echo ""
echo "  Für IP-Änderung: sudo /home/scep/scep-reconfig.sh"
echo "  FreeRADIUS Debug: sudo freeradius -X"
echo "  step-ca Logs:    sudo journalctl -u step-ca -f"
echo ""
echo "============================================"
