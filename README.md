# Antifraude SDK 2.0

SDK de análise de risco para transações em e-commerce, desenvolvido como parte do **Challenge HAKAI da FIAP**.  
O projeto consiste em um motor de regras modular no backend, construído com **Node.js** e **Express**, que expõe uma **API RESTful** para avaliar o risco de fraude em tempo real.

---

## ➤ Features Atuais (Módulo Backend)

O estado atual do projeto corresponde a um **MVP (Mínimo Produto Viável)** do backend, com as seguintes funcionalidades implementadas:

- **Arquitetura Baseada em Middleware**: Lógica de análise desacoplada e facilmente integrável a qualquer aplicação Express (`app.use(sdk.middleware())`).
- **Motor de Regras Modular**: O sistema possui **11 regras de verificação independentes**, facilitando a manutenção e a adição de novas lógicas.
- **Execução Concorrente e Assíncrona**: Utiliza `Promise.all` para executar todas as regras de forma paralela, otimizando o tempo de resposta.
- **Sistema de Scoring**: Atribui um score de risco (**0-100**) a cada transação com base nos fatores de risco encontrados.
- **API RESTful**: Expõe um único endpoint (`POST /identity/verify`) para análise de transações.
- **Análise com Estado**: Inclui regras que persistem dados, como um histórico de transações para detectar atividades suspeitas em curtos períodos de tempo.

---

## ➤ Arquitetura Técnica

O backend foi construído sobre três pilares principais:

- **index.js (Servidor/API)**: O ponto de entrada que utiliza Express.js para criar o servidor web e definir a rota da API. Ele delega toda a lógica de negócio para o middleware.
- **sdk-middleware.js (Orquestrador)**: O cérebro do sistema. Ele recebe a requisição, orquestra a execução concorrente de todas as regras, consolida os resultados, calcula o score e define o status final.
- **/regras (Motor de Regras)**: Uma coleção de módulos especialistas. Cada arquivo implementa uma única verificação, seguindo um contrato de interface unificado (recebe dados e retorna um array de suspeitas).

---

## ➤ Começando (Getting Started)

Siga os passos abaixo para executar o projeto localmente.

### Pré-requisitos
- **Node.js** (versão 18 ou superior)  
- **npm** (geralmente instalado com o Node.js)

### Instalação e Execução

Clone o repositório:
```bash
git clone https://github.com/DRAFESS/Antifraude-sdk-2.0.git
```

Acesse o diretório do projeto:
```bash
cd Antifraude-sdk-2.0-main
```

Instale as dependências:
```bash
npm install
```

Inicie o servidor:
```bash
node backend/index.js
```

O terminal deverá exibir a mensagem:
```
Servidor rodando na porta 3000.
```

### Testes de Integração

Abra um novo terminal (mantendo o servidor rodando) e execute:
```bash
node backend/testarSDK.js
```

Este script enviará **10 transações de teste** para a API e exibirá os resultados no console.

---

## ➤ Documentação da API

A API possui um único endpoint para análise de risco.

### Verificar Transação
- **Endpoint**: `POST /identity/verify`  
- **Descrição**: Recebe os dados de uma transação e retorna uma análise de risco completa.

#### Exemplo de Requisição (Request Body)
```json
{
  "nome": "Maria Oliveira",
  "cpf": "32191720457",
  "email": "user@example.com",
  "cartao": "4371921301465666",
  "valor": 17777,
  "pais": "CN",
  "tempoTransacaoSegundos": 35,
  "ip": "8.8.8.8"
}
```

#### Exemplo de Resposta (Response Body)
A resposta contém o status da análise, o score de confiança e a lista de suspeitas encontradas.

```json
{
  "status": "deny",
  "score": 0,
  "suspeitas": [
    "Transação com valor muito alto (R$ 17.777,00)",
    "Número de cartão inválido (verificação Luhn falhou)",
    "Transação originada de um país inesperado: CN"
  ]
}
```

---

## ➤ Próximos Passos (Roadmap)

- [ ] Desenvolvimento do **Módulo Front-end**: Criar o script `sdk-cliente.js` para coletar o device fingerprint e dados de comportamento do usuário no navegador.
- [ ] **Refinamento das Regras**: Ajustar os pesos e a lógica das regras com base em novos vetores de dados.
- [ ] **Publicação como Pacote NPM**: Empacotar o SDK para que possa ser facilmente instalado em outros projetos.

---

## ➤ Licença

Este projeto está licenciado sob a **Licença MIT**.
