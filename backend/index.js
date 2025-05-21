const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

const verificarValor = require('./regras/verificarValor');
const verificarEmail = require('./regras/verificarEmail');
const verificarCPF = require('./regras/verificarCPF');
const verificarCartao = require('./regras/verificarCartao');
const verificarPais = require('./regras/verificarPais');
const verificarTempo = require('./regras/verificarTempo');

app.use(bodyParser.json());

app.post('/api/verificar', (req, res) => {
  const transacao = req.body;

  // Aplica todas as regras de verificação
  const suspeitas = [
    ...verificarValor(transacao),
    ...verificarEmail(transacao),
    ...verificarCPF(transacao),
    ...verificarCartao(transacao),
    ...verificarPais(transacao),
    ...verificarTempo(transacao),
  ];

  // Retorna a resposta com os dados da transação
  res.json({
    transacao,
    suspeitas,
    aprovado: suspeitas.length === 0
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
