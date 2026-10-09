
import {
    obterDadosPlanilha
} from "./googleSheets.js";

import {
    processarDados,
    calcularEstatisticas
} from "./analysis.js";

import {
    inicializarGrafico
} from "./charts.js";

async function iniciarDashboard() {
    try {
        const dados = await obterDadosPlanilha();

        const dadosProcessados = processarDados(dados);

        const medicoesValidas = dadosProcessados
            .filter(medicao =>
                medicao.dataHora instanceof Date &&
                !isNaN(medicao.dataHora.getTime()) &&
                Number.isFinite(medicao.tensao) &&
                Number.isFinite(medicao.corrente)
            )
            .sort((a, b) =>
                a.dataHora.getTime() - b.dataHora.getTime()
            );

        if (medicoesValidas.length === 0) {
            throw new Error("Nenhuma medição válida encontrada.");
        }

        const ultimaMedicao =
            medicoesValidas[medicoesValidas.length - 1];
            
        const seletorEstatisticas =
            document.querySelector("#stats-type");

        const elementoMedia =
            document.querySelector("#stats-average");

        const elementoMinimo =
            document.querySelector("#stats-min");

        const elementoMaximo =
            document.querySelector("#stats-max");

        const grandezasEstatisticas = {
            tensao: {
                campo: "tensao",
                unidade: "V"
            },
            corrente: {
                campo: "corrente",
                unidade: "A"
            },
            potenciaAparente: {
                campo: "potenciaAparente",
                unidade: "VA"
            }
        };

        function atualizarEstatisticas() {
            const configuracao =
                grandezasEstatisticas[seletorEstatisticas.value];

            const estatisticas = calcularEstatisticas(
                medicoesValidas,
                configuracao.campo
            );

            const formatarValor = valor =>
                Number.isFinite(valor)
                    ? `${valor.toFixed(2).replace(".", ",")} ${configuracao.unidade}`
                    : "--";

            elementoMedia.textContent =
                formatarValor(estatisticas.media);

            elementoMinimo.textContent =
                formatarValor(estatisticas.minimo);

            elementoMaximo.textContent =
                formatarValor(estatisticas.maximo);
        }

        seletorEstatisticas.addEventListener(
            "change",
            atualizarEstatisticas
        );

        atualizarEstatisticas();

        document.querySelector("#voltage").textContent =
            ultimaMedicao.tensao.toFixed(2).replace(".", ",");

        document.querySelector("#current").textContent =
            ultimaMedicao.corrente.toFixed(2).replace(".", ",");

        document.querySelector("#power").textContent =
            ultimaMedicao.potenciaAparente.toFixed(2).replace(".", ",");

        document.querySelector("#info-voltage").textContent =
            `${ultimaMedicao.tensao.toFixed(2).replace(".", ",")} V`;

        document.querySelector("#info-current").textContent =
            `${ultimaMedicao.corrente.toFixed(2).replace(".", ",")} A`;

        document.querySelector("#info-apparent-power").textContent =
            `${ultimaMedicao.potenciaAparente.toFixed(2).replace(".", ",")} VA`;

        const quantidade = medicoesValidas.length;

        document.querySelector("#measurement-count").textContent =
            quantidade;

        const primeiraMedicao = medicoesValidas[0];

        const periodoMs =
            ultimaMedicao.dataHora.getTime() -
            primeiraMedicao.dataHora.getTime();

        const intervaloMedioSegundos =
            quantidade > 1
                ? periodoMs / 1000 / (quantidade - 1)
                : null;

        const intervaloElemento =
            document.querySelector("#measurement-interval");

        const periodoElemento =
            document.querySelector("#available-period");

        if (intervaloElemento) {
            intervaloElemento.textContent =
                intervaloMedioSegundos === null
                    ? "N/D"
                    : intervaloMedioSegundos >= 60
                        ? `${(intervaloMedioSegundos / 60).toFixed(1)} min`
                        : `${intervaloMedioSegundos.toFixed(1)} s`;
        }

        if (periodoElemento) {
            const periodoMinutos = periodoMs / 60000;
            const periodoHoras = periodoMs / 3600000;

            periodoElemento.textContent =
                periodoMinutos < 60
                    ? `${Math.round(periodoMinutos)} min`
                    : `${periodoHoras.toFixed(2)} h`;
        }

        inicializarGrafico(medicoesValidas);

        console.log("Dashboard carregado com dados reais.");
        console.log("Quantidade de medições:", quantidade);
        console.log("Última medição:", ultimaMedicao);

    } catch (erro) {
        console.error(
            "Erro ao carregar dados do Google Sheets:",
            erro
        );
    }
}

iniciarDashboard();