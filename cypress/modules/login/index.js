/**
 * ------------------------------------
 *  FUNCOES DE INTERACOES COM PAGINAS
 * ------------------------------------
 */
export function realizarLogin(email, senha) {
    if (email) { cy.get('[data-qa="login-email"]').type(email); }
    if (senha) { cy.get('[data-qa="login-password"]').type(senha); }
    cy.get('[data-qa="login-button"]').click();
}

/**
 * ------------------------------------
 *  FUNCOES DE VERIFICACOES
 * ------------------------------------
 */

export function verificarQueLoginEstaVisivel() {
    cy.contains('h2', 'Login to your account').should('be.visible');
}

export function verificarQueErroDeLoginEhApresentado(mensagemDeErroEsperada) {
    cy.get('p[style="color: red;"]').should('be.visible').and('have.text', `${mensagemDeErroEsperada}`);
}
