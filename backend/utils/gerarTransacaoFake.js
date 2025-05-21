// backend/utils/gerarTransacaoFake.js

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gerarTransacaoFake() {
  const nomes = ['Diogo Ramos', 'Ana Silva', 'Carlos Souza', 'Maria Oliveira', 'Lucas Pereira'];
  const emails = ['teste@teste.com', 'user@example.com', 'fraude@suspeito.com', 'cliente@empresa.com', 'contato@mail.com'];
  const paises = ['BR', 'US', 'CN', 'RU', 'IN'];
  
  return {
    nome: nomes[randomInt(0, nomes.length -1)],
    cpf: String(randomInt(10000000000, 99999999999)),
    email: emails[randomInt(0, emails.length -1)],
    cartao: String(randomInt(4000000000000000, 4999999999999999)), // faixa Visa
    valor: randomInt(10, 20000),
    pais: paises[randomInt(0, paises.length -1)],
    tempoTransacaoSegundos: randomInt(1, 120)
  };
}

module.exports = gerarTransacaoFake;
