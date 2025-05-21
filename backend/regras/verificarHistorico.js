const fs = require('fs');
const path = require('path');

const arquivoTransacoes = path.join(__dirname, '..', 'dados', 'transacoes.json');

function lerTransacoes() {
  if (!fs.existsSync(arquivoTransacoes)) {
    fs.writeFileSync(arquivoTransacoes, JSON.stringify([]));
  }
  const dados = fs.readFileSync(arquivoTransacoes);
  return JSON.parse(dados);
}

function salvarTransacoes(transacoes) {
  fs.writeFileSync(arquivoTransacoes, JSON.stringify(transacoes, null, 2));
}

function verificarHistorico(cpf, cartao) {
  const transacoes = lerTransacoes();
  const agora = Date.now();

  // Filtra transações do mesmo CPF ou cartão nos últimos 60 segundos
  const recentes = transacoes.filter(t => 
    (t.cpf === cpf || t.cartao === cartao) && (agora - t.timestamp < 60000)
  );

  if (recentes.length >= 3) {
    return { aprovado: false, motivo: 'Múltiplas transações recentes suspeitas' };
  }

  return { aprovado: true };
}

function registrarTransacao(transacao) {
  const transacoes = lerTransacoes();
  transacao.timestamp = Date.now();
  transacoes.push(transacao);
  salvarTransacoes(transacoes);
}

module.exports = { verificarHistorico, registrarTransacao };
