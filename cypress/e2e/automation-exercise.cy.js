/// <reference types="cypress" />
import * as home from '../modules/home/index.js';
import * as cabecalho from '../modules/cabecalho/index.js';
import * as rodape from '../modules/rodape/index.js';
import * as cadastro from '../modules/cadastro/index.js';
import * as delecao from '../modules/delecao/index.js';
import * as login from '../modules/login/index.js';
import * as produtos from '../modules/produtos/index.js';
import * as carrinho from '../modules/carrinho/index.js';
import * as checkout from '../modules/checkout/index.js';
import * as pagamento from '../modules/pagamento/index.js';
import { gerarEmail, gerarDadosDeUsuario, gerarDadosDePagamento } from '../utilitarios/gerador-de-dados.js';
import { criarNovoUsuario } from '../utilitarios/helpers.js';


describe('Automation Exercise - Projeto Final', () => {

    beforeEach(() => {
        cy.visit('/');
        home.verificarQueEstaNaHome();
    })

    describe('Testes de Novo Cadastro e Login', () => {

        beforeEach(() => {
            cabecalho.acessarMenuSignupLogin();
        })

        it('Test Case 1: Register User', () => {

            cadastro.verificarQueSignupEstaVisivel();

            const dadosDoUsuario = gerarDadosDeUsuario();
            const email = gerarEmail();

            cadastro.iniciarCadastroDeUsuario(dadosDoUsuario.nome, email);
            cadastro.verificarQueEstaNaTelaDeSignup();

            cadastro.realizarCadastro(dadosDoUsuario);
            cadastro.verificarQueContaFoiCriada();
            cadastro.concluirCadastro();

            cabecalho.verificarUsuarioLogado(dadosDoUsuario.nome);

            cabecalho.acessarMenuDeleteAccount();

            delecao.verificarQueContaFoiDeletada();
            delecao.concluirDelecaoDeConta();

            home.verificarQueEstaNaHome();

            cy.screenshot('tc01-result');
        });

        it('Test Case 2: Login User with correct email and password', () => {
            const usuario = criarNovoUsuario();

            login.verificarQueLoginEstaVisivel();

            login.realizarLogin(usuario.email, usuario.senha);

            cabecalho.verificarUsuarioLogado(usuario.nome);

            cabecalho.acessarMenuDeleteAccount();

            delecao.verificarQueContaFoiDeletada();

            cy.screenshot('tc02-result');
        });

        it('Test Case 3: Login User with incorrect email and password', () => {
            login.verificarQueLoginEstaVisivel();

            login.realizarLogin('usuario@inexistente.com', 'qualquersenha');

            login.verificarQueErroDeLoginEhApresentado('Your email or password is incorrect!');

            cy.screenshot('tc03-result');
        });

        it('Test Case 4: Logout User', () => {
            const usuario = criarNovoUsuario();

            login.verificarQueLoginEstaVisivel();

            login.realizarLogin(usuario.email, usuario.senha);

            cabecalho.verificarUsuarioLogado(usuario.nome);

            cabecalho.realizarLogout();

            login.verificarQueLoginEstaVisivel();

            cy.screenshot('tc04-result');
        });

        it('Test Case 5: Register User with existing email', () => {
            const usuario = criarNovoUsuario();

            cadastro.verificarQueSignupEstaVisivel();

            cadastro.iniciarCadastroDeUsuario(usuario.nome, usuario.email);

            cadastro.verificarQueErroDeSignupEhApresentado('Email Address already exist!');

            cy.screenshot('tc05-result');
        });

    });

    describe('Testes de Produtos', () => {

        beforeEach(() => {
            cabecalho.acessarMenuProducts();
        });

        it('Test Case 8: Verify All Products and product detail page', () => {
            produtos.verificarQueEstaNaTelaDeListagemDeProdutos();
            produtos.verificarQueListaDeProdutosEstaVisivel();
            produtos.visualizarProduto(0);
            produtos.verificarDetalhesDoProduto();

            cy.screenshot('tc08-result');
        });

        it('Test Case 9: Search Product', () => {
            produtos.verificarQueEstaNaTelaDeListagemDeProdutos();
            produtos.verificarQueListaDeProdutosEstaVisivel();

            const produto = 'blue';
            produtos.pesquisarProduto(produto);

            produtos.verificarQueSearchedProductsEstaVisivel();
            produtos.verificarQueProdutosListadosCorrespondemABusca(produto);

            cy.screenshot('tc09-result');
        });

    });

    describe('Testes de Inscricao', () => {

        it('Test Case 10: Verify Subscription in home page', () => {
            rodape.rolarPaginaParaRodape();
            rodape.verificarQueSubscriptionEhApresentadoNoRodape();

            const email = gerarEmail();
            rodape.realizarInscricao(email);
            rodape.verificarQueMensagemDeIncricaoComSucessoEhApresentada();

            cy.screenshot('tc10-result');
        });

    });

    describe('Testes de Pedidos', () => {

        beforeEach(() => {
            cabecalho.acessarMenuSignupLogin();
        })

        it('Test Case 15: Place Order: Register before Checkout', () => {

            const dadosDoUsuario = gerarDadosDeUsuario();
            console.log(dadosDoUsuario);
            const email = gerarEmail();

            cadastro.iniciarCadastroDeUsuario(dadosDoUsuario.nome, email);
            cadastro.realizarCadastro(dadosDoUsuario);
            cadastro.verificarQueContaFoiCriada();
            cadastro.concluirCadastro();

            cabecalho.verificarUsuarioLogado(dadosDoUsuario.nome);

            cabecalho.acessarMenuProducts();

            const produtosDoPedido = [];

            produtos.obterDadosDoProduto(1).then((produto) => produtosDoPedido.push(produto));
            produtos.adicionarProdutoNoCarrinho(1);
            produtos.clicarEmContinuarComprando();

            produtos.obterDadosDoProduto(2).then((produto) => produtosDoPedido.push(produto));
            produtos.adicionarProdutoNoCarrinho(2);
            produtos.clicarEmContinuarComprando();

            cabecalho.acessarMenuCart();

            carrinho.verificarQueEstaNaTelaDeCarrinho();
            carrinho.irParaCheckout();

            checkout.verificarDetalhesDoEndereco(dadosDoUsuario);
            checkout.verificarPedido(produtosDoPedido);

            checkout.adicionarComentarioNoPedido('Adicionando comentario no Pedido');
            checkout.confirmarPedido();

            const dadosPagamento = gerarDadosDePagamento();
            pagamento.realizarPagamento(dadosPagamento);

            // O Teste pede validacao desta mensagem, porém, a página sofre um redirecionamento muito rápido 
            // e pela forma que eh feito o site, nao eh possivel validar esta mensagem (somente se colocar a validacao antes de realizar o pagamento, ja que a mensagem so esta escondida)
            //pagamento.verificarMensagemDeSucesso();

            // Entao troquei para esta validacao
            pagamento.verificarQuePedidoFoiRealizado();
            pagamento.concluirPedido();

            cabecalho.acessarMenuDeleteAccount();

            delecao.verificarQueContaFoiDeletada();
            delecao.concluirDelecaoDeConta();

            home.verificarQueEstaNaHome();

            cy.screenshot('tc15-result');
        });

        it('Test Case 16: Place Order: Login before Checkout', () => {
            const usuario = criarNovoUsuario();
            login.realizarLogin(usuario.email, usuario.senha);

            cabecalho.verificarUsuarioLogado(usuario.nome);

            cabecalho.acessarMenuProducts();

            const produtosDoPedido = [];

            produtos.obterDadosDoProduto(1).then((produto) => produtosDoPedido.push(produto));
            produtos.adicionarProdutoNoCarrinho(1);
            produtos.clicarEmContinuarComprando();

            produtos.obterDadosDoProduto(2).then((produto) => produtosDoPedido.push(produto));
            produtos.adicionarProdutoNoCarrinho(2);
            produtos.clicarEmContinuarComprando();

            cabecalho.acessarMenuCart();

            carrinho.verificarQueEstaNaTelaDeCarrinho();
            carrinho.irParaCheckout();

            checkout.verificarDetalhesDoEndereco(usuario);
            checkout.verificarPedido(produtosDoPedido);

            checkout.adicionarComentarioNoPedido('Adicionando comentario no Pedido');
            checkout.confirmarPedido();

            const dadosPagamento = gerarDadosDePagamento();
            pagamento.realizarPagamento(dadosPagamento);

            // O Teste pede validacao desta mensagem, porém, a página sofre um redirecionamento muito rápido 
            // e pela forma que eh feito o site, nao eh possivel validar esta mensagem (somente se colocar a validacao antes de realizar o pagamento, ja que a mensagem so esta escondida)
            //pagamento.verificarMensagemDeSucesso();

            // Entao troquei para esta validacao
            pagamento.verificarQuePedidoFoiRealizado();
            pagamento.concluirPedido();

            cabecalho.acessarMenuDeleteAccount();

            delecao.verificarQueContaFoiDeletada();
            delecao.concluirDelecaoDeConta();

            home.verificarQueEstaNaHome();

            cy.screenshot('tc16-result');
        });

    });

});