const fetch = require('node-fetch');

async function verificarGeolocalizacao(ip, paisDeclarado) {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode,status,message`);
    const data = await response.json();

    if (data.status !== 'success') {
      return { aprovado: false, motivo: `Erro ao consultar IP: ${data.message}` };
    }

    if (data.countryCode !== paisDeclarado) {
      return { aprovado: false, motivo: `Discrepância de país: IP indica ${data.countryCode}, declarado ${paisDeclarado}` };
    }

    return { aprovado: true };
  } catch (error) {
    return { aprovado: false, motivo: 'Erro na verificação de geolocalização' };
  }
}

module.exports = verificarGeolocalizacao;
