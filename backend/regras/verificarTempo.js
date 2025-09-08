/**
 * Verifica o tempo que o usuário levou para concluir a transação.
 * Regras:
 * - Tempos muito curtos podem indicar atividade de robôs.
 */
function verificarTempo(dados) {
  const suspeitas = [];
  const tempo = dados.tempoTransacaoSegundos;

  if (tempo === undefined || tempo === null) {
    suspeitas.push("O tempo da transação não foi fornecido.");
    return suspeitas;
  }

  if (tempo < 3) {
    suspeitas.push(
      `Tempo de transação suspeitamente rápido (${tempo} segundos).`
    );
  }

  return suspeitas;
}

module.exports = verificarTempo;
