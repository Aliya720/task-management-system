export const generateFibonacciSeries = (n: number): number[] => {
    if (n <= 0) return [0];
    if (n === 1) return [0, 1];

    let series: number[] = [1, 2];
    for (let i = 2; i <= n; i++) {
        series = [...series, series[i - 1] + series[i - 2]];
    }
    return series;
};