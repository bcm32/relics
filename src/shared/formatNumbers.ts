export function formatRateNumber(number: number): string {
    if(number < 1 && number > -1) {
        return number.toLocaleString('en-US', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 3
        })
    }
    return number.toLocaleString('en-US', {
        maximumFractionDigits: 4
    });
}
