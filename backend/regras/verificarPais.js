/**
 * Verifica se o país da transação é o esperado (Brasil).
 */
function verificarPais(dados) {
  const suspeitas = [];
  const pais = dados.pais;

  if (!pais) {
    suspeitas.push("O país da transação não foi fornecido.");
    return suspeitas;
  }

  // A regra espera que a transação venha do Brasil (BR)
  if (pais.toUpperCase() !== "BR") {
    suspeitas.push(`Transação originada de um país inesperado: ${pais}.`);
  }

  return suspeitas;
}

module.exports = verificarPais;
