#!/usr/bin/env bash
# Run on an isolated Ubuntu CI runner with apache2 and openssl installed.
set -euo pipefail
task_root="$(pwd)"
mkdir -p tmp/apache
openssl req -x509 -newkey rsa:2048 -nodes -keyout tmp/apache/key.pem -out tmp/apache/cert.pem -days 1 -subj /CN=www.ritetutor.com >/dev/null 2>&1
cat > tmp/apache/httpd.conf <<EOF
ServerRoot /etc/apache2
PidFile "$task_root/tmp/apache/httpd.pid"
Listen 127.0.0.1:8443
ServerName www.ritetutor.com
TypesConfig /etc/mime.types
Include /etc/apache2/mods-enabled/*.load
User www-data
Group www-data
ErrorLog "$task_root/tmp/apache/error.log"
DocumentRoot "$task_root/dist"
SSLEngine on
SSLCertificateFile "$task_root/tmp/apache/cert.pem"
SSLCertificateKeyFile "$task_root/tmp/apache/key.pem"
<Directory "$task_root/dist">
  Require all granted
  AllowOverride FileInfo Options Indexes
</Directory>
EOF
sudo a2enmod rewrite headers ssl mime dir authz_core >/dev/null
sudo apache2 -t -f "$task_root/tmp/apache/httpd.conf"
sudo apache2 -f "$task_root/tmp/apache/httpd.conf" -k start
trap 'sudo apache2 -f "$task_root/tmp/apache/httpd.conf" -k stop' EXIT
node scripts/check-apache-local.mjs
