
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

export function calcularEstatisticas(dados, campo) {
    const valores = dados
        .map(medicao => medicao[campo])
        .filter(valor => Number.isFinite(valor));

    if (valores.length === 0) {
        return {
            media: null,
            minimo: null,
            maximo: null
        };
    }

    const soma = valores.reduce(
        (total, valor) => total + valor,
        0
    );

    return {
        media: soma / valores.length,
        minimo: Math.min(...valores),
        maximo: Math.max(...valores)
    };
}