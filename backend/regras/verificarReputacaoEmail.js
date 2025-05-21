const dominiosSuspeitos = [
  "disposablemail.com",
  "mailinator.com",
  "tempmail.com",
  "teste.com",
  "fakeinbox.com",
  "trashmail.com"
];

function verificarReputacaoEmail(transacao) {
  const email = transacao.email || "";
  const dominio = email.split("@")[1];
  if (!dominio) return false;

  return !dominiosSuspeitos.includes(dominio.toLowerCase());
}

module.exports = verificarReputacaoEmail;
