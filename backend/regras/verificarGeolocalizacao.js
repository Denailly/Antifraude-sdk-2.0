const fetch = require("node-fetch"); // Certifique-se de ter 'node-fetch' instalado com "npm install node-fetch@2"

/**
 * Verifica se o país de origem do IP corresponde ao país declarado.
 * Esta é uma regra ASSÍNCRONA, pois faz uma chamada para uma API externa.
 */
async function verificarGeolocalizacao(dados) {
  const suspeitas = [];
  const ip = dados.ip;
  const paisDeclarado = dados.pais;

  // Só podemos verificar se um IP for fornecido
  if (!ip || ip === "127.0.0.1") {
    return suspeitas;
  }

  try {
    const response = await fetch(
      `http://ip-api.com/json/${ip}?fields=countryCode,status,message`
    );
    const data = await response.json();

    if (data.status !== "success") {
      console.warn(
        `Aviso: A API de geolocalização falhou para o IP ${ip}. Motivo: ${data.message}`
      );
      return suspeitas; // Retorna sem suspeitas, pois a falha pode ser da API externa
    }

    if (data.countryCode && data.countryCode !== paisDeclarado) {
      suspeitas.push(
        `Discrepância de geolocalização: o IP indica origem de ${data.countryCode}, mas o país declarado foi ${paisDeclarado}.`
      );
    }
  } catch (error) {
    console.error("Erro crítico ao contatar a API de geolocalização:", error);
  }

  return suspeitas;
}

module.exports = verificarGeolocalizacao;
