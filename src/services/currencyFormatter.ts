export function formatToBRL(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
  
  /**
   * Valida se o valor de cada prestação corresponde ao valor total dividido pelo número de prestações.
   */
  export function isValidInstallment(vlTotal: number, qtPrestacoes: number, vlPresta: number): boolean {
    const expectedInstallment = vlTotal / qtPrestacoes;
    return expectedInstallment === vlPresta;
  }