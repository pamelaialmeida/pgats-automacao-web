import { faker } from '@faker-js/faker';

/**
 * ------------------------------------
 *  FUNCOES DE GERACAO DE DADOS
 * ------------------------------------
 */

export function gerarEmail() {
    return `pgtas-${Date.now()}@email.com`;
}

export function gerarDadosDeUsuario() {
    return {
        titulo: faker.helpers.arrayElement(['Mr.', 'Mrs.']),
        senha: faker.internet.password(),
        diaNascimento: String(faker.number.int({ min: 1, max: 31 })),
        mesNascimento: faker.helpers.arrayElement(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']),
        anoNascimento: String(faker.number.int({ min: 1900, max: 2021 })),
        informativo: faker.datatype.boolean(),
        ofertas: faker.datatype.boolean(),
        nome: faker.person.firstName(),
        sobrenome: faker.person.lastName(),
        empresa: faker.company.name(),
        endereco: faker.location.streetAddress(),
        complemento: faker.location.secondaryAddress(),
        pais: faker.helpers.arrayElement(['India', 'United States', 'Canada', 'Australia', 'Israel', 'New Zealand', 'Singapore']),
        estado: faker.location.state(),
        cidade: faker.location.city(),
        cep: faker.location.zipCode(),
        numeroCelular: faker.string.numeric(10)
    };
}

export function gerarDadosDePagamento() {
    return {
        nomeCartao: faker.person.fullName(),
        numeroCartao: faker.finance.creditCardNumber().replace(/\D/g, ''),
        cvc: faker.finance.creditCardCVV(),
        mesVencimento: String(faker.number.int({ min: 1, max: 12 })).padStart(2, '0'),
        anoVencimento: String(faker.number.int({ min: new Date().getFullYear() + 1, max: new Date().getFullYear() + 10 }))
    };
}