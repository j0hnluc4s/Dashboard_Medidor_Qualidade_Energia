import ApexCharts from "apexcharts";

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
            data: [
                680,
                710,
                695,
                730,
                715,
                760,
                745,
                790,
                770,
                810,
                795,
                825
            ]
        }
    ],

    xaxis: {
        categories: [
            "14:00",
            "14:05",
            "14:10",
            "14:15",
            "14:20",
            "14:25",
            "14:30",
            "14:35",
            "14:40",
            "14:45",
            "14:50",
            "14:55"
        ]
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