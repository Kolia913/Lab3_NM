const matrixBeautifulPrint = (matrix, n, epsilon) => {
    for(let i = 0; i < n; i++) {
        console.log(matrix[i].map( item => (
            item.toFixed(countDecimals(epsilon) <= 16 ? countDecimals(epsilon) : 16)
        )))
    }
}

const numberToBeautifulString = (number, epsilon) => {
    return number.toFixed(countDecimals(epsilon) <= 16 ? countDecimals(epsilon) : 16) + ""
}

// counting decimal places
const countDecimals = function (num) {
    if (Math.floor(num.valueOf()) === num.valueOf()) return 0;
    const numParts = num.toString().split(".")
    if (numParts[1] && numParts[1].length >= 1) {
        return numParts[1].length || 0
    } else {
        const result = num.toString().split('-')
        if (result[1] && result[1].length) {
            return +result[1] || 0
        }
    }
    return 0
}

module.exports.countDecimals = countDecimals
module.exports.matrixBeautifulPrint = matrixBeautifulPrint
module.exports.numberToBeautifulString = numberToBeautifulString