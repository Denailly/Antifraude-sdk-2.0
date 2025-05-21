const request = require('supertest');
const express = require('express');
const app = require('../index'); // supondo que index.js exporte o app (vou te mostrar como fazer)

// Se ainda não exportou o app no index.js, altere ele assim:

/*
// No final do index.js
module.exports = app;
*/

describe('Testa API /api/verificar', () => {
  it('Deve aprovar uma transação válida', async () => {
    const res = await request(app)
      .post('/api/verificar')
      .send({
        nome: "Diogo Ramos",
        cpf: "12345678901",
        email: "diogo@example.com",
        cartao: "4532015112830366",  // cartão válido Luhn
        valor: 10,
        pais: "BR",
        tempoTransacaoSegundos: 5
      })
      .set('Accept', 'application/json');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.aprovado).toBe(true);
  });

  it('Deve reprovar uma transação com valor alto', async () => {
    const res = await request(app)
      .post('/api/verificar')
      .send({
        nome: "Fulano",
        cpf: "11122233344",
        email: "fulano@test.com",
        cartao: "4532015112830366",
        valor: 10000,
        pais: "BR",
        tempoTransacaoSegundos: 10
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.aprovado).toBe(false);
    expect(res.body.motivos).toContain('Valor alto');
  });

  // Adicione mais testes para outras regras conforme quiser
});
