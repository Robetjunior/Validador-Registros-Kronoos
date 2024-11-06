"use strict";
// src/services/validationService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidCpfOrCnpj = void 0;
const isValidCpfOrCnpj = (cpfCnpj) => {
    // Remove caracteres não numéricos
    cpfCnpj = cpfCnpj.replace(/[^\d]/g, '');
    // Verifica se o CPF/CNPJ tem um tamanho válido
    if (cpfCnpj.length === 11) {
        return isValidCpf(cpfCnpj);
    }
    else if (cpfCnpj.length === 14) {
        return isValidCnpj(cpfCnpj);
    }
    return false;
};
exports.isValidCpfOrCnpj = isValidCpfOrCnpj;
// Função de validação para CPF
const isValidCpf = (cpf) => {
    // Verifica se o CPF tem exatamente 11 dígitos
    if (cpf.length !== 11)
        return false;
    // Verifica se todos os dígitos são iguais, o que é inválido para CPF
    if (/^(\d)\1{10}$/.test(cpf))
        return false;
    let sum = 0;
    let remainder;
    // Calcula o primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11)
        remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9)))
        return false;
    // Calcula o segundo dígito verificador
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11)
        remainder = 0;
    return remainder === parseInt(cpf.charAt(10));
};
// Função de validação para CNPJ
const isValidCnpj = (cnpj) => {
    // Verifica se o CNPJ tem exatamente 14 dígitos
    if (cnpj.length !== 14)
        return false;
    // Verifica se todos os dígitos são iguais, o que é inválido para CNPJ
    if (/^(\d)\1{13}$/.test(cnpj))
        return false;
    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    let digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;
    // Calcula o primeiro dígito verificador
    for (let i = size; i >= 1; i--) {
        sum += parseInt(numbers.charAt(size - i)) * pos--;
        if (pos < 2)
            pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0)))
        return false;
    // Calcula o segundo dígito verificador
    size += 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (let i = size; i >= 1; i--) {
        sum += parseInt(numbers.charAt(size - i)) * pos--;
        if (pos < 2)
            pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return result === parseInt(digits.charAt(1));
};
