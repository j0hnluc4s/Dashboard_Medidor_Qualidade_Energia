import ApexCharts from "apexcharts";

const dados = {
    "1h": {
        categorias: [
            "14:00",
            "14:05",
            "14:10",
            "14:15",
            "14:20",
            "14:25"
        ],

        power: [680, 710, 695, 730, 715, 760],
        voltage: [220.1, 220.4, 219.8, 220.7, 221.0, 220.5],
        current: [3.10, 3.22, 3.18, 3.30, 3.25, 3.40],
        energy: [2.10, 2.12, 2.14, 2.16, 2.18, 2.20],
        "power-factor": [0.91, 0.92, 0.90, 0.93, 0.91, 0.92],
        frequency: [59.9, 60.0, 60.1, 60.0, 59.9, 60.0],
        "apparent-power": [705, 720, 710, 735, 725, 765],
        "reactive-power": [295, 300, 290, 305, 298, 310]
    },

    "6h": {
        categorias: [
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00"
        ],

        power: [620, 680, 650, 720, 695, 760],
        voltage: [219.5, 220.2, 220.0, 221.0, 220.4, 220.5],
        current: [2.85, 3.10, 2.95, 3.25, 3.15, 3.40],
        energy: [1.10, 1.25, 1.40, 1.58, 1.78, 2.00],
        "power-factor": [0.89, 0.91, 0.90, 0.92, 0.91, 0.92],
        frequency: [60.0, 59.9, 60.1, 60.0, 60.0, 60.0],
        "apparent-power": [690, 710, 705, 735, 720, 765],
        "reactive-power": [310, 295, 300, 305, 300, 310]
    },

    "24h": {
        categorias: [
            "00:00",
            "04:00",
            "08:00",
            "12:00",
            "16:00",
            "20:00"
        ],

        power: [540, 580, 640, 720, 690, 760],
        voltage: [220.0, 219.8, 220.3, 221.0, 220.5, 220.7],
        current: [2.45, 2.65, 2.90, 3.25, 3.10, 3.40],
        energy: [0.20, 0.55, 0.90, 1.40, 1.90, 2.50],
        "power-factor": [0.88, 0.89, 0.90, 0.92, 0.91, 0.92],
        frequency: [60.0, 60.1, 59.9, 60.0, 60.0, 59.9],
        "apparent-power": [610, 650, 700, 735, 725, 765],
        "reactive-power": [330, 320, 315, 305, 300, 310]
    }
};

const grandezas = {
    power: {
        titulo: "Potência ao longo do tempo",
        nome: "Potência",
        unidade: "W"
    },

    voltage: {
        titulo: "Tensão ao longo do tempo",
        nome: "Tensão",
        unidade: "V"
    },

    current: {
        titulo: "Corrente ao longo do tempo",
        nome: "Corrente",
        unidade: "A"
    },

    energy: {
        titulo: "Energia consumida ao longo do tempo",
        nome: "Energia consumida",
        unidade: "kWh"
    },

    "power-factor": {
        titulo: "Fator de potência ao longo do tempo",
        nome: "Fator de potência",
        unidade: ""
    },

    frequency: {
        titulo: "Frequência ao longo do tempo",
        nome: "Frequência",
        unidade: "Hz"
    },

    "apparent-power": {
        titulo: "Potência aparente ao longo do tempo",
        nome: "Potência aparente",
        unidade: "VA"
    },

    "reactive-power": {
        titulo: "Potência reativa ao longo do tempo",
        nome: "Potência reativa",
        unidade: "var"
    }
};

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
            name: "Potência",
            data: dados["1h"].power
        }
    ],

    xaxis: {
        categories: dados["1h"].categorias
    },

    yaxis: {
        title: {
            text: "Potência (W)"
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
        y: {
            formatter: function (value) {
                return value + " W";
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

    const dadosPeriodo = dados[periodo][grandeza];
    const configuracao = grandezas[grandeza];

    chartTitle.textContent = configuracao.titulo;

    chart.updateOptions({
        xaxis: {
            categories: dados[periodo].categorias
        },

        yaxis: {
            title: {
                text: configuracao.unidade
                    ? `${configuracao.nome} (${configuracao.unidade})`
                    : configuracao.nome
            }
        },

        tooltip: {
            y: {
                formatter: function (value) {
                    return configuracao.unidade
                        ? `${value} ${configuracao.unidade}`
                        : value;
                }
            }
        }
    });

    chart.updateSeries([
        {
            name: configuracao.nome,
            data: dadosPeriodo
        }
    ]);
}

timeRange.addEventListener("change", atualizarGrafico);

measurementType.addEventListener("change", atualizarGrafico);