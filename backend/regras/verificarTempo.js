module.exports = function verificarTempo(tempo) {
  return tempo < 5 ? ['Transação muito rápida'] : [];
};
