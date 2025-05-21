function verificarLuhn(numeroCartao) {
  const valor = numeroCartao.replace(/\D/g, '');
  let soma = 0;
  let deveDobrar = false;

  for (let i = valor.length - 1; i >= 0; i--) {
    let digito = parseInt(valor.charAt(i));

    if (deveDobrar) {
      digito *= 2;
      if (digito > 9) digito -= 9;
    }

    soma += digito;
    deveDobrar = !deveDobrar;
  }

  return soma % 10 === 0;
}

function validarCartao(cartao) {
  const valido = verificarLuhn(cartao);
  if (!valido) {
    return { aprovado: false, motivo: 'Número de cartão inválido (Luhn)' };
  }
  return { aprovado: true };
}

module.exports = validarCartao;
