/**
 * ------------------------------------
 *  FUNCOES DE INTERACOES COM PAGINAS
 * ------------------------------------
 */
export function realizarPagamento(dadosPagamento) {
    if (dadosPagamento.nomeCartao) { cy.get('[data-qa="name-on-card"]').type(dadosPagamento.nomeCartao); }
    if (dadosPagamento.numeroCartao) { cy.get('[data-qa="card-number"]').type(dadosPagamento.numeroCartao); }
    if (dadosPagamento.cvc) { cy.get('[data-qa="cvc"]').type(dadosPagamento.cvc); }
    if (dadosPagamento.mesVencimento) { cy.get('[data-qa="expiry-month"]').type(dadosPagamento.mesVencimento); }
    if (dadosPagamento.anoVencimento) { cy.get('[data-qa="expiry-year"]').type(dadosPagamento.anoVencimento); }
    cy.get('[data-qa="pay-button"]').click();
}

export function concluirPedido() {
    cy.get('[data-qa="continue-button"]').click();
}

/**
 * ------------------------------------
 *  FUNCOES DE VERIFICACOES
 * ------------------------------------
 */
export function verificarMensagemDeSucesso() {
    cy.get('#success_message .alert-success').should('contain.text', 'Your order has been placed successfully!');
}

export function verificarQuePedidoFoiRealizado() {
    cy.get('[data-qa="order-placed"]').should('be.visible').and('have.text', 'Order Placed!');
}