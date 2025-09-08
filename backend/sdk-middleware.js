const verificarValor = require("./regras/verificarValor");
const verificarTempo = require("./regras/verificarTempo");
const verificarEmail = require("./regras/verificarEmail");
const verificarCPF = require("./regras/verificarCPF");
const verificarCartao = require("./regras/verificarCartao");
const verificarPais = require("./regras/verificarPais");
const verificarReputacaoEmail = require("./regras/verificarReputacaoEmail");
const verificarEnderecoIP = require("./regras/verificarEnderecoIP");
const verificarGeolocalizacao = require("./regras/verificarGeolocalizacao");
const {
  verificarHistorico,
  registrarTransacao,
} = require("./regras/verificarHistorico");

// Centraliza todas as regras de verificação em um array
const regrasDeVerificacao = [
  verificarValor,
  verificarTempo,
  verificarEmail,
  verificarCPF,
  verificarCartao,
  verificarPais,
  verificarReputacaoEmail,
  verificarEnderecoIP,
  verificarGeolocalizacao, // Regra assíncrona
  verificarHistorico,
];

async function sdkMiddleware(req, res, next) {
  const dados = req.body;
  let score = 100; // Score inicial de confiança

  try {
    // Mapeia cada regra para uma Promise e aguarda todas resolverem
    const resultadosPromises = regrasDeVerificacao.map((regra) => regra(dados));
    const resultadosArrays = await Promise.all(resultadosPromises);

    // Achata o array de arrays em um único array de suspeitas
    const suspeitas = resultadosArrays.flat();

    // Lógica de pontuação: cada suspeita reduz o score
    if (suspeitas.length > 0) {
      score -= suspeitas.length * 25; // Ex: cada suspeita tira 25 pontos
      if (score < 0) score = 0;
    }

    // Após a verificação, registra a transação para futuras análises
    registrarTransacao(dados);

    // Define o status final com base no score
    let status = "allow";
    if (score < 75 && score > 30) {
      status = "review";
    } else if (score <= 30) {
      status = "deny";
    }

    // Adiciona o resultado do SDK ao objeto `req` para que a próxima rota possa usá-lo
    req.sdkResult = {
      status,
      score,
      suspeitas,
    };

    // Passa para a próxima função no pipeline do Express (a rota principal)
    return next();
  } catch (error) {
    console.error("Erro crítico no middleware do SDK Antifraude:", error);
    // Em caso de erro, nega a transação por segurança
    req.sdkResult = {
      status: "deny",
      score: 0,
      suspeitas: ["Erro interno no sistema de análise de risco."],
    };
    return next();
  }
}

module.exports = sdkMiddleware;
