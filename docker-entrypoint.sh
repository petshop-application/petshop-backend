#!/bin/sh

set -e

echo "⏳ Aguardando banco de dados em $DB_HOST:$DB_PORT..."

until nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 1
done

echo "✅ Banco de dados disponível!"

echo "🚀 Executando migrations..."
MIGRATE_OUTPUT=$(npx sequelize-cli db:migrate)

echo "$MIGRATE_OUTPUT"

if echo "$MIGRATE_OUTPUT" | grep -q "No migrations were executed"; then
  echo "⚙️ Nenhuma migration nova — pulando seeds."
else
  echo "🌱 Executando seeds..."
  npx sequelize-cli db:seed:all
fi

echo "✅ Inicialização concluída. Iniciando servidor..."
exec node server.js
