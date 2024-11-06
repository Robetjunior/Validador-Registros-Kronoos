import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';

interface CSVRecord {
  nrInst: number;
  nrAgencia: number;
  cdClient: number;
  nmClient: string;
  nrCpfCnpj: string;
  nrContrato: number;
  dtContrato: string;
  qtPrestacoes: string;
  vlTotal: string;
  vlPresta: string;
  vlMora: number;
  vlMulta: number;
  vlOutAcr: string;
  vlIof: string;
  vlDescon: string;
  vlAtual: number;
  idSituac: string;
  idSitVen: string;
  // Adicione outros campos conforme necessário
}

export const readCSVFile = (filePath: string): Promise<CSVRecord[]> => {
  return new Promise((resolve, reject) => {
    const results: CSVRecord[] = [];
    
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};
