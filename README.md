# Validação de Registros em Grandes Volumes de Dados

Este projeto foi desenvolvido como parte do Teste Prático para Desenvolvedor Full Stack da Kronoos. O objetivo é criar uma aplicação que processe grandes volumes de dados (cerca de 30GB) em formato CSV, realizando uma série de validações e formatações em cada registro e exibindo os resultados em um relatório em PDF.

## Funcionalidades

A aplicação executa as seguintes operações em cada registro do arquivo CSV:

1. **Validação de CPF ou CNPJ**: Utiliza um algoritmo próprio para verificar a validade dos dados no campo `nrCpfCnpj`.
2. **Formatação de Valores Monetários**: Converte campos como `vlTotal` e `vlPresta` para o formato BRL (Real Brasileiro), utilizando o padrão `R$` e duas casas decimais.
3. **Validação de Valor Total e Prestações**: Verifica se o valor de cada prestação (`vlPresta`) corresponde ao valor total (`vlTotal`) dividido pela quantidade de prestações (`qtPrestacoes`).
4. **Geração de Relatório PDF**: Gera um relatório em PDF com os resultados das validações, organizado em uma tabela com colunas para CPF/CNPJ, Validade, Valor Total, Valor da Prestação, e Validade da Prestação.

## Estrutura do Projeto
```bash
|-/node_modules
|-/src
    |--/config
    |   |-- config.ts
    |--/services
    |   |-- csvService.ts
    |   |-- validationService.ts
    |   |-- currencyFormatter.ts
    |-- index.ts
|-- data.csv
|-- package.json
|-- package-lock.json
|-- tsconfig.json
|-- README.md
```

## Tecnologias Utilizadas

- **Node.js**: Para a execução da aplicação.
- **TypeScript**: Para tipagem estática e maior robustez no desenvolvimento.
- **fs (File System)**: Para leitura de arquivos CSV.
- **csv-parser**: Para converter o arquivo CSV em um array de objetos JavaScript.
- **pdfkit**: Para geração do relatório PDF com os resultados das validações.
- **Intl**: Para formatação de valores monetários em Real Brasileiro (BRL).

## Pré-Requisitos

Certifique-se de que você tem o **Node.js** e **npm** instalados em sua máquina.

## Instalação

1. Clone este repositório:
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```
2. Navegue até a pasta do projeto:
    ```bash
    cd seu-repositorio
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```

## Como Executar

1. Coloque o arquivo CSV com os dados na raiz do projeto e nomeie-o como `data.csv` ou ajuste o caminho do arquivo no código conforme necessário.
2. Compile o projeto TypeScript:
    ```bash
    npx tsc
    ```
3. Execute o projeto:
    ```bash
    node dist/index.js
    ```
4. Após a execução, o relatório PDF será gerado na raiz do projeto com o nome `validation_results.pdf`.

## Estrutura do Código

### index.ts
Arquivo principal que inicia a leitura dos dados e chama as funções de validação e geração do PDF.

### csvService.ts
Responsável pela leitura do arquivo CSV e conversão dos dados para um array de objetos.

### validationService.ts
Contém a lógica de validação de CPF e CNPJ.

### currencyFormatter.ts
Formata os valores monetários para o padrão brasileiro (BRL).

### config.ts
Arquivo de configuração para armazenar variáveis globais, como o caminho para o arquivo CSV, se necessário.

## Exemplo de Saída

A aplicação gera um PDF com o título **"Resultado da Validação dos Registros"**, contendo as seguintes colunas:

- **CPF/CNPJ**: Número de CPF ou CNPJ do registro.
- **Válido**: Indica se o CPF ou CNPJ é válido.
- **Valor Total (BRL)**: Valor total formatado como moeda brasileira.
- **Valor Prestação (BRL)**: Valor de cada prestação formatado como moeda brasileira.
- **Prestação Válida**: Indica se o valor da prestação está correto em relação ao valor total e quantidade de prestações.

## Observações

- O algoritmo de validação de CPF/CNPJ foi desenvolvido manualmente, sem bibliotecas externas, para atender aos requisitos do teste.
- A aplicação foi projetada para processar grandes volumes de dados. No entanto, para arquivos muito grandes, é recomendável rodar em um ambiente com recursos adequados de memória e processamento.

## Considerações Finais

Este projeto demonstra habilidades no desenvolvimento de soluções escaláveis, validação de dados, e geração de relatórios. Ele pode ser adaptado para outros cenários de validação de dados e processamento em larga escala.
