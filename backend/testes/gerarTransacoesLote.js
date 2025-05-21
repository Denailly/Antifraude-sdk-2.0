const { gerarTransacaoFake } = require('../utils/gerarTransacaoFake');
const { verificarTransacao } = require('../regras/regrasAntifraude');

for (let i = 0; i < 10; i++) {
  const transacao = gerarTransacaoFake();
  const resultado = verificarTransacao(transacao);

  console.log('Transação:', transacao);
  console.log('Resultado:', resultado);
  console.log('---------------------------');
}
