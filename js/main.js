import {
    obterDadosPlanilha
} from "./googleSheets.js";

import {
    processarDados
} from "./analysis.js";

import {
    inicializarGrafico
} from "./charts.js";

async function iniciarDashboard() {

    try {

        const dados =
            await obterDadosPlanilha();

        const dadosProcessados =
            processarDados(dados);

        const ultimaMedicao =
            dadosProcessados[
                dadosProcessados.length - 1
            ];

        document.querySelector("#voltage").textContent =
            ultimaMedicao.tensao
                .toFixed(2)
                .replace(".", ",");

        document.querySelector("#current").textContent =
            ultimaMedicao.corrente
                .toFixed(2)
                .replace(".", ",");

        document.querySelector("#power").textContent =
            ultimaMedicao.potenciaAparente
                .toFixed(2)
                .replace(".", ",");

        document.querySelector("#info-voltage").textContent =
            `${ultimaMedicao.tensao
                .toFixed(2)
                .replace(".", ",")} V`;

        document.querySelector("#info-current").textContent =
            `${ultimaMedicao.corrente
                .toFixed(2)
                .replace(".", ",")} A`;

        document.querySelector("#info-apparent-power").textContent =
            `${ultimaMedicao.potenciaAparente
                .toFixed(2)
                .replace(".", ",")} VA`;

        document.querySelector("#measurement-count").textContent =
            dadosProcessados.length;

        inicializarGrafico(dados);

        console.log(
            "Dashboard carregado com dados reais."
        );

        console.log(
            "Quantidade de medições:",
            dadosProcessados.length
        );

        console.log(
            "Última medição:",
            ultimaMedicao
        );

    } catch (erro) {

        console.error(
            "Erro ao carregar dados do Google Sheets:",
            erro
        );

    }
}

iniciarDashboard();