import { pipeline } from "stream"

name: CI/CD 


//Quando o pipeline será executado

on:
    push:
        branches:
            - main // Roda o pipeline apenas em commits para a branch "main"

//Definição dos jobs

jobs:

// Job de Build e Testes

build-and-test:
    runs-on: ubuntu-latest //Define o sistema operacional da máquina virtual

steps:

//Passo 1: Fazer checkout do código

- name: Checkout code
uses: actions/checkout@v3


//Passo 2: Configurar Node.js

- name: Set up Node.js
uses: actions/setup-node@v3
with:
node-version: '16'

// Passo 3: Instalar dependências

- name: Install dependencies
run: npm install

//# Passo 4: Executar testes
- name: Run tests
run: npm test


//Job de Deploy

deploy:
needs: build-and-test //Só será executado se o job anterior for bem-sucedido
runs-on: ubuntu-latest


steps:

//Passo 1: Fazer checkout do código
- name: Checkout code
uses: actions/checkout@v3


//Passo 2: Configurar SSH para deploy
- name: Set up SSH
run: |
    echo "${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/id_rsa
    chmod 600 ~/.ssh/id_rsa
    ssh-keyscan -H your-server-ip >> ~/.ssh/known_hosts


//Passo 3: Deploy no servidor
- name: Deploy to server
run: ssh user@your-server-ip "bash deploy_script.sh"