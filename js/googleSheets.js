import dadosMock from "./mockData.js";

const URL_SHEETS =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRJnHPYYoGazio_24ffh7dtCHGDI5PLtfQxTgnKmujE7BdK1vnrUiIOxuL2Tqxh9WbyT7qDFfykVHbr/pub?gid=0&single=true&output=csv";

export function obterDados() {
    return dadosMock;
}

export async function obterDadosPlanilha() {

    const resposta = await fetch(URL_SHEETS);

    if (!resposta.ok) {
        throw new Error(
            `Erro ao acessar Google Sheets: ${resposta.status}`
        );
    }

    const csv = await resposta.text();

    const linhas = csv
        .trim()
        .split("\n");

    const dados = linhas
        .slice(1)
        .map(linha => {

            const colunas = linha.split(",");

            const data = colunas[0].trim();
            const hora = colunas[1].trim();

            const [dia, mes, ano] = data.split("/");

            const [horas, minutos, segundos] =
                hora.split(":");

            const dataHora = new Date(
                Number(ano),
                Number(mes) - 1,
                Number(dia),
                Number(horas),
                Number(minutos),
                Number(segundos)
            );

            return {
                dataHora: dataHora,
                tensao: Number(colunas[2]),
                corrente: Number(colunas[3])
            };
        });

    return dados;
}

obterDadosPlanilha()
    .then(dados => {

        console.log(
            "Dados reais do Google Sheets:"
        );

        console.log(
            "Quantidade:",
            dados.length
        );

        console.log(
            "Primeira medição:",
            dados[0]
        );

        console.log(
            "Última medição:",
            dados[dados.length - 1]
        );

    })
    .catch(erro => {

        console.error(
            "Erro ao buscar Google Sheets:",
            erro
        );

    });