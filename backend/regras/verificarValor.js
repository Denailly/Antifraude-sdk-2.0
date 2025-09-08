/**
 * Verifica o valor da transação.
 * Regras:
 * - Valores muito altos são suspeitos.
 * - Valores zerados ou negativos são inválidos.
 */
function verificarValor(dados) {
  const suspeitas = [];
  const valor = dados.valor;

  if (valor === undefined || valor === null) {
    suspeitas.push("O valor da transação não foi fornecido.");
    return suspeitas;
  }

  if (valor > 10000) {
    // Formata o valor para a moeda local (Real) para melhor leitura
    const valorFormatado = valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    suspeitas.push(`Transação com valor muito alto (${valorFormatado}).`);
  }

  if (valor <= 0) {
    suspeitas.push("Transação com valor zerado ou negativo.");
  }

  return suspeitas;
}

module.exports = verificarValor;
