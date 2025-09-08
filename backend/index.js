const express = require("express");
const bodyParser = require("body-parser");
const sdkMiddleware = require("./sdk-middleware");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// ROTA CORRIGIDA
// O middleware (sdkMiddleware) é passado como uma referência de função, sem os parênteses ().
// Ele será executado primeiro e, quando terminar, chamará a próxima função na fila.
app.post("/identity/verify", sdkMiddleware, (req, res) => {
  // Após o sdkMiddleware rodar, o resultado estará em req.sdkResult.
  // Esta função final apenas envia a resposta de volta ao cliente.
  res.json(req.sdkResult);
});

// Rota de exemplo para checkout, mostrando o reuso do middleware
app.post("/checkout", sdkMiddleware, (req, res) => {
  // Aqui podemos adicionar uma lógica extra com base na resposta do SDK
  if (req.sdkResult.status === "deny") {
    return res.status(403).json({
      error: "Transação bloqueada pela análise de risco.",
      details: req.sdkResult,
    });
  }

  // Se o status for 'allow' ou 'review', a lógica de checkout pode continuar
  res.json({
    message: "Checkout em processamento...",
    analysis: req.sdkResult,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Exporta o app para que os testes possam usá-lo
module.exports = app;
