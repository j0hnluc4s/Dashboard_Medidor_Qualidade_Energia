const dadosMock = [];

const agora = new Date();

for (let i = 0; i < 5760; i++) {

    const data = new Date(
        agora.getTime() - (5759 - i) * 15000
    );

    const variacaoTensao = (Math.random() - 0.5) * 2;
    const variacaoCorrente = (Math.random() - 0.5) * 0.6;

    const tensao = 220 + variacaoTensao;
    const corrente = 2.2 + variacaoCorrente;

    dadosMock.push({
        dataHora: data,
        tensao: Number(tensao.toFixed(2)),
        corrente: Number(corrente.toFixed(4))
    });
}

export default dadosMock;