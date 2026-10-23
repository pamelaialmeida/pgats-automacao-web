/**
 * ------------------------------------
 *  FUNCOES DE VERIFICACOES
 * ------------------------------------
 */

export function verificarQueEstaNaHome() {
    cy.get('a[href="/"]').contains('Home').should('have.attr', 'style', 'color: orange;');
}
