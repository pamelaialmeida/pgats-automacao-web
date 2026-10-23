/**
 * ------------------------------------
 *  FUNCOES DE INTERACOES COM PAGINAS
 * ------------------------------------
 */
export function irParaCheckout() {
    cy.get('.check_out').click();
}

/**
 * ------------------------------------
 *  FUNCOES DE VERIFICACOES
 * ------------------------------------
 */

export function verificarQueEstaNaTelaDeCarrinho() {
    cy.get('#cart_info_table').should('be.visible');
}
