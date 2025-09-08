/**
 * Verifica o formato do cartão de crédito e a validade do algoritmo de Luhn.
 */
function verificarCartao(dados) {
  // Pega a informação do objeto padronizado 'dados'
  const cartao = String(dados.cartao || "");
  const suspeitas = [];

  if (!/^\d{16}$/.test(cartao)) {
    suspeitas.push("Cartão com formato inválido (não possui 16 dígitos).");
  }

  // Exemplo de prefixos suspeitos (fictícios)
  if (cartao.startsWith("1234") || cartao.startsWith("0000")) {
    suspeitas.push("Cartão com prefixo suspeito.");
  }

  // --- Algoritmo de Luhn para validar número de cartão ---
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
  // --- Fim do Algoritmo de Luhn ---

  if (cartao.length === 16 && !validarLuhn(cartao)) {
    suspeitas.push("Número de cartão inválido (verificação Luhn falhou).");
  }

  return suspeitas;
}

module.exports = verificarCartao;
