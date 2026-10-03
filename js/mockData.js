const dadosMock = [];

const agora = new Date();

for (let i = 0; i < 144; i++) {

    const data = new Date(agora.getTime() - (143 - i) * 600000);

    const variacaoTensao = (Math.random() - 0.5) * 2;
    const variacaoCorrente = (Math.random() - 0.5) * 0.4;

    const tensao = 220 + variacaoTensao;
    const corrente = 3.2 + variacaoCorrente;

    dadosMock.push({
        dataHora: data,
        tensao: Number(tensao.toFixed(2)),
        corrente: Number(corrente.toFixed(2))
    });
}

export default dadosMock;