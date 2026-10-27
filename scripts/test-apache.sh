#!/usr/bin/env bash
# Run on an isolated Ubuntu CI runner with apache2 and openssl installed.
set -euo pipefail
task_root="$(pwd)"
# www-data cannot necessarily traverse the runner's private checkout parents.
# Stage only the public build in a readable directory; keep checkout permissions intact.
apache_root="$(mktemp -d /tmp/rite-apache-test.XXXXXX)"
cleanup() {
  local status=$?
  if (( status != 0 )) && [[ -f "$apache_root/error.log" ]]; then
    sudo tail -n 100 "$apache_root/error.log" || true
  fi
  sudo apache2 -f "$apache_root/httpd.conf" -k stop >/dev/null 2>&1 || true
  sudo rm -rf -- "$apache_root"
  exit "$status"
}
trap cleanup EXIT
chmod 755 "$apache_root"
mkdir "$apache_root/dist"
cp -R "$task_root/dist/." "$apache_root/dist/"
find "$apache_root/dist" -type d -exec chmod 755 {} +
find "$apache_root/dist" -type f -exec chmod 644 {} +
openssl req -x509 -newkey rsa:2048 -nodes -keyout "$apache_root/key.pem" -out "$apache_root/cert.pem" -days 1 -subj /CN=www.ritetutor.com >/dev/null 2>&1
cat > "$apache_root/httpd.conf" <<EOF
ServerRoot /etc/apache2
PidFile "$apache_root/httpd.pid"
Listen 127.0.0.1:8443
ServerName www.ritetutor.com
TypesConfig /etc/mime.types
Include /etc/apache2/mods-enabled/*.load
User www-data
Group www-data
ErrorLog "$apache_root/error.log"
DocumentRoot "$apache_root/dist"
SSLEngine on
SSLCertificateFile "$apache_root/cert.pem"
SSLCertificateKeyFile "$apache_root/key.pem"
<Directory "$apache_root/dist">
  Require all granted
  AllowOverride FileInfo Indexes Options=Indexes,MultiViews
</Directory>
EOF
sudo a2enmod rewrite headers ssl mime dir authz_core >/dev/null
sudo apache2 -t -f "$apache_root/httpd.conf"
sudo apache2 -f "$apache_root/httpd.conf" -k start
node scripts/check-apache-local.mjs
