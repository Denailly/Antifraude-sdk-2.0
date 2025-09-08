const fs = require("fs");
const path = require("path");

// Carrega a lista de domínios bloqueados do arquivo JSON de forma dinâmica
const dominiosBloqueados = JSON.parse(
  fs.readFileSync(path.join(__dirname, "dominiosBloqueados.json"), "utf8")
);

function verificarReputacaoEmail(dados) {
  const suspeitas = [];
  const email = dados.email || "";
  const dominio = email.split("@")[1];

  if (!dominio) {
    suspeitas.push("Email não possui um domínio válido.");
    return suspeitas;
  }

  if (dominiosBloqueados.includes(dominio.toLowerCase())) {
    suspeitas.push(`O domínio de email '${dominio}' é considerado suspeito.`);
  }

  return suspeitas;
}

module.exports = verificarReputacaoEmail;
