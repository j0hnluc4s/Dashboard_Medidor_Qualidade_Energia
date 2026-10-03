import ApexCharts from "apexcharts";
import { obterDados } from "./googleSheets.js";
import { processarDados } from "./analysis.js";

const dadosBrutos = obterDados();
const dadosProcessados = processarDados(dadosBrutos);

const grandezas = {
    voltage: {
        titulo: "Tensão ao longo do tempo",
        nome: "Tensão",
        unidade: "V",
        campo: "tensao"
    },

    current: {
        titulo: "Corrente ao longo do tempo",
        nome: "Corrente",
        unidade: "A",
        campo: "corrente"
    },

    "apparent-power": {
        titulo: "Potência aparente ao longo do tempo",
        nome: "Potência aparente",
        unidade: "VA",
        campo: "potenciaAparente"
    }
};

const quantidadePorPeriodo = {
    "1h": 6,
    "6h": 36,
    "24h": 144
};

function obterDadosDoPeriodo(periodo, grandeza) {

    const quantidade = quantidadePorPeriodo[periodo];

    const dadosPeriodo = dadosProcessados.slice(-quantidade);

    const configuracao = grandezas[grandeza];

    return dadosPeriodo.map(medicao => ({
        x: medicao.dataHora.getTime(),
        y: medicao[configuracao.campo]
    }));
}

const dadosIniciais = obterDadosDoPeriodo(
    "1h",
    "voltage"
);

const options = {
    chart: {
        type: "area",
        height: 270,
        toolbar: {
            show: false
        }
    },

    series: [
        {
            name: "Tensão",
            data: dadosIniciais
        }
    ],

    xaxis: {
        type: "datetime"
    },

    yaxis: {
        title: {
            text: "Tensão (V)"
        }
    },

    stroke: {
        curve: "smooth",
        width: 3
    },

    fill: {
        type: "gradient",
        gradient: {
            opacityFrom: 0.35,
            opacityTo: 0.05
        }
    },

    dataLabels: {
        enabled: false
    },

    grid: {
        borderColor: "#eef1f5"
    },

    tooltip: {
        x: {
            format: "dd/MM HH:mm"
        },

        y: {
            formatter: function (value) {
                return value + " V";
            }
        }
    }
};

const chart = new ApexCharts(
    document.querySelector("#power-chart"),
    options
);

chart.render();

const timeRange = document.querySelector("#time-range");
const measurementType = document.querySelector("#measurement-type");
const chartTitle = document.querySelector("#chart-title");

function atualizarGrafico() {

    const periodo = timeRange.value;
    const grandeza = measurementType.value;

    if (!grandezas[grandeza]) {
        return;
    }

    const configuracao = grandezas[grandeza];

    const dados = obterDadosDoPeriodo(
        periodo,
        grandeza
    );

    chartTitle.textContent = configuracao.titulo;

    chart.updateOptions({
        xaxis: {
            type: "datetime"
        },

        yaxis: {
            title: {
                text: `${configuracao.nome} (${configuracao.unidade})`
            }
        },

        tooltip: {
            x: {
                format: "dd/MM HH:mm"
            },

            y: {
                formatter: function (value) {
                    return `${value} ${configuracao.unidade}`;
                }
            }
        }
    });

    chart.updateSeries([
        {
            name: configuracao.nome,
            data: dados
        }
    ]);
}

timeRange.addEventListener(
    "change",
    atualizarGrafico
);

measurementType.addEventListener(
    "change",
    atualizarGrafico
);