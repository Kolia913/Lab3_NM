const {determinant} = require("./determinant")
const {countDecimals, matrixBeautifulPrint, numberToBeautifulString} = require("./helper")

const determinantWithReplacedColumn = (matrix, column, colIdx, n, epsilon) => {
    let newMatrix = new Array(n)
    for (let k = 0; k < n; k++) {
        newMatrix[k] = new Array(n)
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            newMatrix[i][j] = matrix[i][j];
        }
    }
    for (let i = 0; i < n; i++) {
        newMatrix[i][colIdx] = column[i]
    }

    let det = determinant(newMatrix, n)

    console.log("Matrix with replaced column: ");
    matrixBeautifulPrint(newMatrix, n, epsilon);
    console.log("It's determinant: ", numberToBeautifulString(det, epsilon));

    return det
}

const solveWithCramersRule = (matrix, resultsCol, n, epsilon) => {
    if(!epsilon || epsilon === NaN) {
        console.error("Wrong epsilon!");
        return []
    }
    if(epsilon >= 1) {
        console.error("Wrong epsilon! Enter value between 0 and 1.");
        return []
    }
    let res = []
    if (resultsCol.length != n) {
        return []
    }
    const det = determinant(matrix, n)
    console.log("Determinant is: ", numberToBeautifulString(det, epsilon))
    if(det === 0) {
        return []
    }
    let tempDet;
    for (let i = 0; i < n; i++) {
        tempDet = determinantWithReplacedColumn(matrix, resultsCol, i, n, epsilon)
        res.push((tempDet / det))
    }    
    return res.map(i => +i.toFixed(countDecimals(epsilon) <= 16 ? countDecimals(epsilon) : 16))
}

module.exports.solve = solveWithCramersRule