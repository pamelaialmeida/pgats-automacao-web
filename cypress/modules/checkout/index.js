/**
 * ------------------------------------
 *  FUNCOES DE INTERACOES COM PAGINAS
 * ------------------------------------
 */
export function adicionarComentarioNoPedido(comentario) {
    cy.get('textarea[name="message"]').type(comentario);
}

export function confirmarPedido() {
    cy.get('a[href*=payment]').click();
}

/**
 * ------------------------------------
 *  FUNCOES DE VERIFICACOES
 * ------------------------------------
 */
export function verificarDetalhesDoEndereco(dadosDoUsuario) {
    const nomeCompleto = `${dadosDoUsuario.titulo} ${dadosDoUsuario.nome} ${dadosDoUsuario.sobrenome}`;
    const cidadeEstadoCep = `${dadosDoUsuario.cidade} ${dadosDoUsuario.estado} ${dadosDoUsuario.cep}`;

    cy.contains('h2', 'Address Details').should('be.visible');
    cy.get('#address_delivery .address_firstname').should('contain.text', nomeCompleto);
    cy.get('#address_delivery .address_address1').eq(0).should('have.text', dadosDoUsuario.empresa);
    cy.get('#address_delivery .address_address1').eq(1).should('have.text', dadosDoUsuario.endereco);
    cy.get('#address_delivery .address_address1').eq(2).should('have.text', dadosDoUsuario.complemento);
    cy.contains('#address_delivery .address_city', cidadeEstadoCep).should('be.visible');
    cy.get('#address_delivery .address_country_name').should('have.text', dadosDoUsuario.pais);
    cy.get('#address_delivery .address_phone').should('have.text', dadosDoUsuario.numeroCelular);
}

export function verificarPedido(produtosDoPedido) {
    cy.contains('h2', 'Review Your Order').should('be.visible');
    cy.then(() => {
        produtosDoPedido.forEach((produto) => {
            cy.contains('#cart_info tbody tr', produto.titulo).within(() => {
                cy.get('.cart_price p').should('have.text', produto.preco);
                cy.get('.cart_quantity button').should('have.text', '1');
                cy.get('.cart_total_price').should('have.text', produto.preco);
            });
        });
    });
}
