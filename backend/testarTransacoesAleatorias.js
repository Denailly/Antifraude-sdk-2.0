// backend/testarTransacoesAleatorias.js
const axios = require('axios');
const gerarTransacaoFake = require('./utils/gerarTransacaoFake');

async function testarVariasTransacoes(qtd = 10) {
  for(let i = 0; i < qtd; i++) {
    const transacao = gerarTransacaoFake();
    try {
      const res = await axios.post('http://127.0.0.1:3000/api/verificar', transacao);
      console.log(`Teste ${i+1} - Transação:`, transacao);
      console.log('Resposta:', res.data);
      console.log('-----------------------------------------');
    } catch (error) {
      console.error(`Erro no teste ${i+1}:`, error.message);
    }
  }
}

testarVariasTransacoes(20);
