/**
 * testarSDK.js
 *
 * Este é o script de teste principal para o SDK Antifraude.
 * Ele simula requisições reais para o nosso servidor, enviando
 * transações geradas aleatoriamente para o endpoint de verificação.
 *
 * Como usar:
 * 1. Inicie o servidor: `node backend/index.js`
 * 2. Em outro terminal, execute este script: `node backend/testarSDK.js`
 */
const axios = require("axios");
// Garantindo que o caminho para o utilitário está correto
const gerarTransacaoFake = require("./utils/gerarTransacaoFake");

const API_URL = "http://127.0.0.1:3000/identity/verify";

async function testarSDK(quantidadeDeTestes = 5) {
  console.log(
    `🚀 Iniciando ${quantidadeDeTestes} testes no endpoint do SDK: ${API_URL}`
  );
  console.log("--------------------------------------------------");

  for (let i = 0; i < quantidadeDeTestes; i++) {
    const transacao = gerarTransacaoFake();

    try {
      console.log(`\n▶️  Teste ${i + 1} de ${quantidadeDeTestes}...`);
      console.log("   Enviando dados:", transacao);

      const { data: resultado } = await axios.post(API_URL, transacao);

      console.log("   ✅ Resposta do SDK:", resultado);
    } catch (error) {
      console.error(
        `   ❌ Erro no teste ${i + 1}:`,
        error.response ? error.response.data : error.message
      );
    }
  }

  console.log("\n--------------------------------------------------");
  console.log("✅ Testes finalizados.");
}

// Defina aqui quantas transações de teste você quer gerar
testarSDK(10);
