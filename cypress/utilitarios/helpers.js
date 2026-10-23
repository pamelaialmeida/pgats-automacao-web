import * as cadastro from '../modules/cadastro/index.js';
import * as header from '../modules/cabecalho/index.js';
import { gerarEmail, gerarDadosDeUsuario } from '../utilitarios/gerador-de-dados.js';

/**
 * ------------------------------------
 *  FUNCOES DE AJUDA/HELPERS
 * ------------------------------------
 */

export function criarNovoUsuario() {
    const dadosDoUsuario = gerarDadosDeUsuario();
    const email = gerarEmail();

    cadastro.iniciarCadastroDeUsuario(dadosDoUsuario.nome, email);
    cadastro.realizarCadastro(dadosDoUsuario);
    cadastro.concluirCadastro();
    header.realizarLogout();

    return {
        ...dadosDoUsuario,
        email
    };
}