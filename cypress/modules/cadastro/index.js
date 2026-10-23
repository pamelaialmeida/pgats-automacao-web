/**
 * ------------------------------------
 *  FUNCOES DE INTERACOES COM PAGINAS
 * ------------------------------------
 */
export function iniciarCadastroDeUsuario(nome, email) {
    if (nome) { cy.get('[data-qa="signup-name"]').type(nome); }
    if (email) { cy.get('[data-qa="signup-email"]').type(email); }
    cy.get('[data-qa="signup-button"]').click();
}

export function realizarCadastro(dadosDoUsuario) {
    if (dadosDoUsuario.titulo === 'Mr.') {
        cy.get('#id_gender1').check();
    } else if (dadosDoUsuario.titulo === 'Mrs.') {
        cy.get('#id_gender2').check();
    }

    if (dadosDoUsuario.senha) { cy.get('[data-qa="password"]').type(dadosDoUsuario.senha); }

    if (dadosDoUsuario.diaNascimento) { cy.get('[data-qa="days"]').select(dadosDoUsuario.diaNascimento); }

    if (dadosDoUsuario.mesNascimento) { cy.get('[data-qa="months"]').select(dadosDoUsuario.mesNascimento); }

    if (dadosDoUsuario.anoNascimento) { cy.get('[data-qa="years"]').select(dadosDoUsuario.anoNascimento); }

    if (dadosDoUsuario.informativo) { cy.get('#newsletter').check(); }

    if (dadosDoUsuario.ofertas) { cy.get('#optin').check(); }

    if (dadosDoUsuario.nome) { cy.get('[data-qa="first_name"]').type(dadosDoUsuario.nome); }

    if (dadosDoUsuario.sobrenome) { cy.get('[data-qa="last_name"]').type(dadosDoUsuario.sobrenome); }

    if (dadosDoUsuario.empresa) { cy.get('[data-qa="company"]').type(dadosDoUsuario.empresa); }

    if (dadosDoUsuario.endereco) { cy.get('[data-qa="address"]').type(dadosDoUsuario.endereco); }

    if (dadosDoUsuario.complemento) { cy.get('[data-qa="address2"]').type(dadosDoUsuario.complemento); }

    if (dadosDoUsuario.pais) { cy.get('[data-qa="country"]').select(dadosDoUsuario.pais); }

    if (dadosDoUsuario.estado) { cy.get('[data-qa="state"]').type(dadosDoUsuario.estado); }

    if (dadosDoUsuario.cidade) { cy.get('[data-qa="city"]').type(dadosDoUsuario.cidade); }

    if (dadosDoUsuario.cep) { cy.get('[data-qa="zipcode"]').type(dadosDoUsuario.cep); }

    if (dadosDoUsuario.numeroCelular) { cy.get('[data-qa="mobile_number"]').type(dadosDoUsuario.numeroCelular); }

    cy.get('[data-qa="create-account"]').click();
}

export function concluirCadastro() {
    cy.get('[data-qa="continue-button"]').click();
}


/**
 * ------------------------------------
 *  FUNCOES DE VERIFICACOES
 * ------------------------------------
 */

export function verificarQueSignupEstaVisivel() {
    cy.contains('h2', 'New User Signup!').should('be.visible');
}

export function verificarQueEstaNaTelaDeSignup() {
    cy.contains('b', 'Enter Account Information').should('be.visible');
}

export function verificarQueContaFoiCriada() {
    cy.get('[data-qa="account-created"]').should('be.visible').and('have.text', 'Account Created!');
}

export function verificarQueErroDeSignupEhApresentado(mensagemDeErroEsperada) {
    cy.get('p[style="color: red;"]').should('be.visible').and('have.text', `${mensagemDeErroEsperada}`);
}