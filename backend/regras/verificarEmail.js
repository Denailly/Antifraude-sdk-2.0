module.exports = function verificarEmail(email) {
  if (!email || typeof email !== 'string') return ['Email inválido'];
  return email.endsWith('@teste.com') ? ['Email suspeito'] : [];
};
