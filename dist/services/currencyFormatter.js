"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatToBRL = formatToBRL;
exports.isValidInstallment = isValidInstallment;
function formatToBRL(value) {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
}
/**
 * Valida se o valor de cada prestação corresponde ao valor total dividido pelo número de prestações.
 */
function isValidInstallment(vlTotal, qtPrestacoes, vlPresta) {
    const expectedInstallment = vlTotal / qtPrestacoes;
    return expectedInstallment === vlPresta;
}
