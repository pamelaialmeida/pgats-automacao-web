/**
 * ------------------------------------
 *  FUNCOES DE NAVEGACAO
 * ------------------------------------
 */
export function acessarMenuSignupLogin() {
    cy.get('a[href*=login]').click();
}

export function acessarMenuDeleteAccount() {
    cy.get('a[href*=delete_account]').click();
}

export function realizarLogout() {
    cy.get('a[href*=logout]').click();
}

export function acessarMenuProducts() {
    cy.get('ul.nav.navbar-nav a[href="/products"]').click();
}

export function acessarMenuCart() {
    cy.get('ul.nav.navbar-nav a[href="/view_cart"]').click();
}


/**
 * ------------------------------------
 *  FUNCOES DE VERIFICACOES
 * ------------------------------------
 */

export function verificarUsuarioLogado(nomeEsperado) {
    cy.get('a').contains('Logged in as').find('b').should('have.text', nomeEsperado);
}