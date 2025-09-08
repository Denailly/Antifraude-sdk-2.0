const fs = require("fs");
const path = require("path");

// Ajustado para usar uma pasta 'data' na raiz do backend
const arquivoTransacoes = path.join(
  __dirname,
  "..",
  "data",
  "historicoTransacoes.json"
);

// Garante que o diretório e o arquivo existam
function inicializarHistorico() {
  const dir = path.dirname(arquivoTransacoes);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(arquivoTransacoes)) {
    // Cria o arquivo com um array vazio se ele não existir
    fs.writeFileSync(arquivoTransacoes, JSON.stringify([]));
  }
}

function lerTransacoes() {
  inicializarHistorico();
  const dados = fs.readFileSync(arquivoTransacoes, "utf8");

  // *** INÍCIO DA CORREÇÃO ***
  // Se o arquivo estiver vazio, retorna um array vazio diretamente para evitar o erro de JSON.parse
  if (dados.trim() === "") {
    return [];
  }
  // *** FIM DA CORREÇÃO ***

  return JSON.parse(dados);
}

function salvarTransacoes(transacoes) {
  fs.writeFileSync(arquivoTransacoes, JSON.stringify(transacoes, null, 2));
}

function verificarHistorico(dados) {
  const suspeitas = [];
  const { cpf, cartao } = dados;
  const transacoes = lerTransacoes();
  const agora = Date.now();

  // Filtra transações do mesmo CPF ou cartão nos últimos 60 segundos
  const recentes = transacoes.filter(
    (t) => (t.cpf === cpf || t.cartao === cartao) && agora - t.timestamp < 60000
  );

  if (recentes.length >= 3) {
    suspeitas.push(
      `Múltiplas transações (${recentes.length}) detectadas nos últimos 60 segundos para o mesmo CPF ou cartão.`
    );
  }

  return suspeitas;
}

// Esta função deve ser chamada pelo middleware *após* a verificação
function registrarTransacao(transacao) {
  const transacoes = lerTransacoes();
  transacao.timestamp = Date.now();
  transacoes.push(transacao);
  salvarTransacoes(transacoes);
}

module.exports = { verificarHistorico, registrarTransacao };
