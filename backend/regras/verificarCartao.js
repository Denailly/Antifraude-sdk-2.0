// backend/regras/verificarCartao.js
module.exports = function verificarCartao(transacao) {
  const cartao = String(transacao.cartao); // <- força para string
  const suspeitas = [];

  if (!/^\d{16}$/.test(cartao)) {
    suspeitas.push('Cartão com formato inválido');
  }

  // Exemplo de prefixos suspeitos (fictícios)
  if (cartao.startsWith('1234') || cartao.startsWith('0000')) {
    suspeitas.push('Cartão suspeito');
  }

  // Algoritmo de Luhn para validar número de cartão
  function validarLuhn(numero) {
    let soma = 0;
    let deveMultiplicar = false;
    for (let i = numero.length - 1; i >= 0; i--) {
      let digito = parseInt(numero[i]);
      if (deveMultiplicar) {
        digito *= 2;
        if (digito > 9) digito -= 9;
      }
      soma += digito;
      deveMultiplicar = !deveMultiplicar;
    }
    return soma % 10 === 0;
  }

  if (!validarLuhn(cartao)) {
    suspeitas.push('Cartão inválido (Luhn)');
  }

  return suspeitas;
};
