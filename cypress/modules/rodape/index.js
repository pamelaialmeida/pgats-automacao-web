/**
 * ------------------------------------
 *  FUNCOES DE INTERACOES COM PAGINAS
 * ------------------------------------
 */
export function rolarPaginaParaRodape() {
    cy.get('#footer').scrollIntoView();
}

export function realizarInscricao(email) {
    cy.get('#susbscribe_email').type(email);
    cy.get('#subscribe').click();
}

/**
 * ------------------------------------
 *  FUNCOES DE VERIFICACOES
 * ------------------------------------
 */

export function verificarQueSubscriptionEhApresentadoNoRodape() {
    cy.get('#footer').contains('h2', 'Subscription').should('be.visible');
}

export function verificarQueMensagemDeIncricaoComSucessoEhApresentada(){
    cy.get('#success-subscribe .alert').should('be.visible').and('contain.text', 'You have been successfully subscribed!');
}