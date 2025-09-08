function verificarEnderecoIP(dados) {
  const suspeitas = [];
  const ip = dados.ip;

  // Exemplo de regra: IPs de rede local podem ser suspeitos em um contexto de produção real
  if (
    ip &&
    (ip.startsWith("192.168.") || ip.startsWith("10.") || ip === "127.0.0.1")
  ) {
    suspeitas.push("IP de rede interna detectado, o que pode ser suspeito.");
  }

  return suspeitas;
}

module.exports = verificarEnderecoIP;
