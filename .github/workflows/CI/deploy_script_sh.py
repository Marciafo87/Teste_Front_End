#!/bin/bash


echo "Iniciando o deploy..."

cd /var/www/my-app

git pull origin main

npm install --production

pm2 restart all # Reinicia a aplicação usando PM2 (ou substitua pelo gerenciador usado)

echo "Deploy finalizado!"


Certifique-se de que o script tem permissões de execução:

chmod +x deploy_script.sh