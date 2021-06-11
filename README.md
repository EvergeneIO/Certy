![GitHub](https://img.shields.io/github/license/EvergeneIO/Certy?style=plastic)
![Docker Build](https://github.com/EvergeneIO/Certy/actions/workflows/build.yml/badge.svg)
![Docker Image Size (latest by date)](https://img.shields.io/docker/image-size/evergene/certy?style=plastic)

# Certy a certbumper for Nginx Proxy Manager

Wie verwendest du Certy?

Wir empfehlen Certy direkt mit Nginx Proxy Manager zu installieren oder im nachhinein Certy in die Compose hinzuzufügen

# Docker Compose

```yml
version: "3.7"
services:
  proxy:
    image: "jc21/nginx-proxy-manager:latest"
    hostname: "proxy"
    restart: always
    ports:
      # Public HTTP Port:
      - "80:80"
      # Public HTTPS Port:
      - "443:443"
      # Admin Web Port:
      - "81:81"
    environment:
      # If you would rather use Sqlite uncomment this
      # DB_SQLITE_FILE: ${DB_SQLITE_FILE}
      # and remove all DB_MYSQL_* lines below
      DB_MYSQL_HOST: ${DB_MYSQL_HOST}
      DB_MYSQL_PORT: ${DB_MYSQL_PORT}
      DB_MYSQL_USER: ${DB_MYSQL_USER}
      DB_MYSQL_PASSWORD: ${DB_MYSQL_PASSWORD}
      DB_MYSQL_NAME: ${DB_MYSQL_NAME}
      # Uncomment this if IPv6 is not enabled on your host
      # DISABLE_IPV6: ${DISABLE_IPV6}
    volumes:
      - ./data/proxy:/data
      - ./letsencrypt:/etc/letsencrypt
    depends_on:
      - db
    networks:
      - proxy_default
  certy:
    hostname: "certy"
    restart: always
    image: "evergene/certy:latest"
    environment:
      # If you would rather use Sqlite uncomment this
      # DB_SQLITE_FILE: ${DB_SQLITE_FILE}
      # and remove all DB_MYSQL_* lines below
      DB_MYSQL_HOST: ${DB_MYSQL_HOST}
      DB_MYSQL_PORT: ${DB_MYSQL_PORT}
      DB_MYSQL_USER: ${DB_MYSQL_USER}
      DB_MYSQL_PASSWORD: ${DB_MYSQL_PASSWORD}
      DB_MYSQL_NAME: ${DB_MYSQL_NAME}
      DOMAINS: ${DOMAINS}
      # Uncomment this if IPv6 is not enabled on your host
      # DISABLE_IPV6: ${DISABLE_IPV6}
    volumes:
      - ./data/certy/config:/app/config
      - ./letsencrypt:/app/certs
      - Certy:/app/data
    depends_on:
      - db
    networks:
      - proxy_default
  db:
    image: jc21/mariadb-aria:latest
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
    volumes:
      - ./data/mariadb:/config
networks:
  proxy_default:
    driver: bridge
volumes:
  Certy:
```

# ENV

Das du weniger Daten selber eingeben musst empfehlen wir die verwendung einer `.env` die erstellst du am besten im selben verzeichniss wo du die `docker-compose.yml` erstellt hast und fügst das unte genannte ein oder benutzt unsere [Example ENV](https://github.com/EvergeneIO/Certy/blob/main/.env.example)

```env
# If you would rather use Sqlite uncomment this

#DB_SQLITE_FILE="./data/database.sqlite"

# and remove all DB_MYSQL_* lines below
DB_MYSQL_HOST="db"
DB_MYSQL_PORT=3306
DB_MYSQL_USER="npm"
DB_MYSQL_PASSWORD="npm"
DB_MYSQL_NAME="npm"
# Uncomment this if IPv6 is not enabled on your host
#DISABLE_IPV6: "true"

# DB Settings
MYSQL_ROOT_PASSWORD="npm"
MYSQL_DATABASE="npm"
MYSQL_USER="npm"
MYSQL_PASSWORD="npm"
```

Du kannst die daten aber auch manuell in die `docker-compose.yml` einfügen

Nach dem setup der compose findest du nun einen `data` ordner, dort musst du zu `./data/certy/config` navigieren und eine config file namens `certy.yml` erstellen, dies ist die allgemein config datei, hier ein kleines beispiel:

# Config

```yml
services:
  #Der Name von deiner App/deinem Service
  your-service:
    #Die Domain die für denn Service und im Proxy Manager hinterlegt ist
    domain.com:
      # Optioniale Parameter
      # Der SSl ordner wird so benannt wie der Path ansonsten wie die Domain
      path: some-path
      # Die Certificate werden so benannt wie der Wert denn du hinschreibst
      cert: some-cert
      chain: some-chain
      privkey: some-privkey
      fullchain: some-fullchain
```

Jedes Mal nach dem Speichern oder hinzufügen einer Domain im Proxy aktualisiert es alles, also musst du nicht neustarten, wenn du sachen aus der Config entfernst werden die Certificate bei Certy gelöscht (auch wenn sie noch im Proxy Manager sind)

# Volume

Certy erstellt ein Volume namens `Certy` in dem finden sich alle Certifikate von denn domains in der Config file, falls du eine Anwendung hast bindest du einfach das Volume an denn container mit dem pfad wo deine App braucht.

```yml
volumes:
  - Certy:/app/letsencrypt
```

Und wenn du denn Path richtig benannt hast holt sich die App selber denn richtigen Ordner!
