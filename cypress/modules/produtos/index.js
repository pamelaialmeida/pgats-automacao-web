/**
 * ------------------------------------
 *  FUNCOES DE INTERACOES COM PAGINAS
 * ------------------------------------
 */
export function visualizarProduto(index) {
    cy.get('.features_items .product-image-wrapper').eq(index).find('a[href^="/product_details/"]').click();
}

export function pesquisarProduto(produto) {
    cy.get('#search_product').type(produto);
    cy.get('#submit_search').click();
}

export function obterDadosDoProduto(index) {
    return cy.get('.features_items .product-image-wrapper').eq(index).find('.productinfo').then(($produto) => {
        const preco = $produto.find('h2').text().trim();

        return {
            titulo: $produto.find('p').text().trim(),
            preco: preco,
            valor: Number(preco.replace(/\D/g, '')),
        };
    });
}

export function adicionarProdutoNoCarrinho(index) {
    cy.get('.features_items .product-image-wrapper').eq(index).find('.productinfo a.add-to-cart').click();
}

export function clicarEmContinuarComprando() {
    cy.contains('#cartModal button', 'Continue Shopping').click();
    cy.get('#cartModal').should('not.be.visible');
}

/**
 * ------------------------------------
 *  FUNCOES DE VERIFICACOES
 * ------------------------------------
 */

export function verificarQueEstaNaTelaDeListagemDeProdutos() {
    cy.contains('h2', 'All Products').should('be.visible');
}

export function verificarQueListaDeProdutosEstaVisivel() {
    cy.get('.features_items').should('be.visible');
}

export function verificarDetalhesDoProduto() {
    cy.get('.product-information h2').should('be.visible');
    cy.get('.product-information p').contains('Category:').should('be.visible');
    cy.get('.product-information span').contains(/^Rs\./).should('be.visible');
    cy.get('.product-information p').contains('Availability:').should('be.visible');
    cy.get('.product-information p').contains('Condition:').should('be.visible');
    cy.get('.product-information p').contains('Brand:').should('be.visible');
}

export function verificarQueSearchedProductsEstaVisivel() {
    cy.contains('h2', 'Searched Products').should('be.visible');
}

export function verificarQueProdutosListadosCorrespondemABusca(produtoPesquisado) {
    cy.get('.product-image-wrapper .productinfo p').each(($produto) => {
        expect($produto.text().toLocaleLowerCase()).to.contain(produtoPesquisado.toLocaleLowerCase());
    });
}
