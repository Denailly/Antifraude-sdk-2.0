/**
 * Realiza uma verificação básica no CPF fornecido.
 */
function verificarCPF(dados) {
  const suspeitas = [];
  const cpf = dados.cpf;

  if (!cpf) {
    suspeitas.push("CPF não fornecido na transação.");
    return suspeitas;
  }

  // Exemplo de regra simples: CPF em uma lista de bloqueio
  if (cpf === "12345678900" || cpf === "00000000000") {
    suspeitas.push(`O CPF ${cpf} está em uma lista de observação.`);
  }

  // Você poderia adicionar outras validações de formato aqui

  return suspeitas;
}

module.exports = verificarCPF;
