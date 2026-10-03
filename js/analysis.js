export function calcularGrandezas(medicao) {

    const tensao = medicao.tensao;
    const corrente = medicao.corrente;

    const potenciaAparente = tensao * corrente;

    return {
        ...medicao,
        potenciaAparente: Number(potenciaAparente.toFixed(2))
    };
}

export function processarDados(dados) {
    return dados.map(medicao => calcularGrandezas(medicao));
}