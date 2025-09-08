/**
 * Verifica o formato do e-mail.
 */
function verificarEmail(dados) {
  const suspeitas = [];
  const email = dados.email;

  if (!email || typeof email !== "string") {
    suspeitas.push("O e-mail fornecido é inválido ou não existe.");
    return suspeitas;
  }

  // Regex para uma validação de formato de e-mail mais robusta
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    suspeitas.push(`O formato do e-mail '${email}' é inválido.`);
  }

  return suspeitas;
}

module.exports = verificarEmail;
