/**
 * ------------------------------------
 *  FUNCOES DE INTERACOES COM PAGINAS
 * ------------------------------------
 */

export function concluirDelecaoDeConta() {
    cy.get('[data-qa="continue-button"]').click();
}

/**
 * ------------------------------------
 *  FUNCOES DE VERIFICACOES
 * ------------------------------------
 */

export function verificarQueContaFoiDeletada() {
    cy.get('[data-qa="account-deleted"]').should('be.visible').and('have.text', 'Account Deleted!');
}