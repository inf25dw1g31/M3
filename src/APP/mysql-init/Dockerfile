FROM mysql:8.0

# Corre no 1º arranque (quando /var/lib/mysql está vazio)
COPY 01-schema.sql /docker-entrypoint-initdb.d/01-schema.sql
COPY 02-data.sql /docker-entrypoint-initdb.d/02-data.sql
