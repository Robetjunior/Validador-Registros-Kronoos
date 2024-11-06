"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csvService_1 = require("./services/csvService");
const validationService_1 = require("./services/validationService");
const currencyFormatter_1 = require("./services/currencyFormatter");
const path_1 = __importDefault(require("path"));
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const filePath = path_1.default.resolve(__dirname, '..', 'data.csv');
// Função para gerar PDF com formatação aprimorada
function generatePDF(data) {
    const doc = new pdfkit_1.default({ size: 'A4', margin: 30 });
    const outputPath = path_1.default.resolve(__dirname, '..', 'validation_results.pdf');
    const writeStream = fs_1.default.createWriteStream(outputPath);
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
        const isCpfCnpjValid = (0, validationService_1.isValidCpfOrCnpj)(record.nrCpfCnpj);
        const vlTotal = parseFloat(record.vlTotal);
        const qtPrestacoes = parseInt(record.qtPrestacoes, 10);
        const vlPresta = parseFloat(record.vlPresta);
        const isInstallmentValid = (vlTotal / qtPrestacoes).toFixed(2) === vlPresta.toFixed(2);
        // Exibir dados com colunas alinhadas
        doc.text(record.nrCpfCnpj, colXPositions[0], doc.y, { continued: true })
            .text(isCpfCnpjValid ? 'Sim' : 'Não', colXPositions[1] - 3, doc.y, { continued: true })
            .text((0, currencyFormatter_1.formatToBRL)(vlTotal), colXPositions[2], doc.y, { continued: true })
            .text((0, currencyFormatter_1.formatToBRL)(vlPresta), colXPositions[3] + 25, doc.y, { continued: true })
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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, csvService_1.readCSVFile)(filePath);
            generatePDF(data); // Gera o PDF com os dados formatados
        }
        catch (error) {
            console.error('Erro ao ler o CSV:', error);
        }
    });
}
main();
