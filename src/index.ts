import { readCSVFile } from './services/csvService';
import { isValidCpfOrCnpj } from './services/validationService';
import { formatToBRL } from './services/currencyFormatter';
import path from 'path';
import PDFDocument from 'pdfkit';
import fs from 'fs';

const filePath = path.resolve(__dirname, '..', 'data.csv');

// Função para gerar PDF com formatação aprimorada
function generatePDF(data: any[]) {
  const doc = new PDFDocument({ size: 'A4', margin: 30 });
  const outputPath = path.resolve(__dirname, '..', 'validation_results.pdf');
  const writeStream = fs.createWriteStream(outputPath);

  doc.pipe(writeStream);

  // Título centralizado e estilizado
  doc
    .fontSize(18)
    .font('Helvetica-Bold')
    .text('Resultado da Validação dos Registros', { align: 'center' })
    .moveDown(1.5);

  // Configuração do cabeçalho da tabela com posições ajustadas
  const colXPositions = [50, 110, 150, 200, 250]; // Ajuste das posições das colunas para melhor alinhamento
  
  // Cabeçalho da tabela alinhado com os dados
  doc.fontSize(8)
    .font('Helvetica-Bold')
    .text('CPF/CNPJ', colXPositions[0], doc.y, { continued: true })
    .text('Válido', colXPositions[1], doc.y, { continued: true })
    .text('Valor Total (BRL)', colXPositions[2], doc.y, { continued: true })
    .text('Valor Prestação (BRL)', colXPositions[3], doc.y, { continued: true })
    .text('Prestação Válida', colXPositions[4], doc.y);
  doc.moveDown();

  // Estilos de fonte para os dados
  doc.fontSize(8).font('Helvetica');

  // Processamento de cada registro
  data.forEach((record) => {
    const isCpfCnpjValid = isValidCpfOrCnpj(record.nrCpfCnpj);
    const vlTotal = parseFloat(record.vlTotal);
    const qtPrestacoes = parseInt(record.qtPrestacoes, 10);
    const vlPresta = parseFloat(record.vlPresta);
    const isInstallmentValid = (vlTotal / qtPrestacoes).toFixed(2) === vlPresta.toFixed(2);

    // Exibir dados com colunas alinhadas
    doc.text(record.nrCpfCnpj, colXPositions[0], doc.y, { continued: true })
      .text(isCpfCnpjValid ? 'Sim' : 'Não', colXPositions[1] - 3, doc.y, { continued: true })
      .text(formatToBRL(vlTotal), colXPositions[2], doc.y, { continued: true })
      .text(formatToBRL(vlPresta), colXPositions[3] + 25, doc.y, { continued: true })
      .text(isInstallmentValid ? 'Sim' : 'Não', colXPositions[4] + 75, doc.y);
    doc.moveDown();

    // Verifica se precisa adicionar uma nova página se o espaço acabar
    if (doc.y > 700) {
      doc.addPage();
      // Cabeçalho da tabela na nova página
      doc.fontSize(10)
        .font('Helvetica-Bold')
        .text('CPF/CNPJ', colXPositions[0], doc.y, { continued: true })
        .text('Válido', colXPositions[1], doc.y, { continued: true })
        .text('Valor Total (BRL)', colXPositions[2], doc.y, { continued: true })
        .text('Valor Prestação (BRL)', colXPositions[3], doc.y, { continued: true })
        .text('Prestação Válida', colXPositions[4], doc.y);
      doc.moveDown();
      doc.fontSize(8).font('Helvetica');
    }
  });

  doc.end();
  console.log(`PDF gerado com sucesso em: ${outputPath}`);
}

// Função principal para leitura de dados e geração do PDF
async function main() {
  try {
    const data = await readCSVFile(filePath);
    generatePDF(data); // Gera o PDF com os dados formatados
  } catch (error) {
    console.error('Erro ao ler o CSV:', error);
  }
}

main();