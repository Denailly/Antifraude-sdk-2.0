function verificarEnderecoIP(transacao) {
  if (transacao.ip && transacao.ip.startsWith("192.")) {
    return {
      aprovado: false,
      motivo: "IP suspeito detectado",
    };
  }
  return { aprovado: true };
}

module.exports = verificarEnderecoIP;
