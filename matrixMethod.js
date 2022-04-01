const { determinant } = require('./determinant')
const { countDecimals, matrixBeautifulPrint, numberToBeautifulString } = require("./helper")

const getAlgebraicComplement = (matrix, elRow, elCol) => {
    let temp = matrix.filter((_,i) => (i != elRow))
    return temp.map(item => item.filter((_, i) => (i != elCol)))
}

const getComplements = (matrix, n) => {
    let res = []
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            res.push(getAlgebraicComplement(matrix,i,j))
        }
    }
    res = res.map( (item, index) => index % 2 === 0 ?
     1*determinant(item, item.length) : -1*determinant(item, item.length))
     return res
}

const getComplementsMatrix = (elements, n) => {
    let res = []
    if(elements.length !== n*n) {
        console.log("Wrong params!")
        return
    }
    let temp = []
    for(let i = 0; i < elements.length; i += n) {
        temp = elements.slice(i, i + n)
        res.push(temp)
    }
    return res
}

const transposeMatrix = (matrix, n, epsilon) => {
    let res = new Array(n)
    for(let k = 0; k < n; k++) {
        res[k] = new Array(n)
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            res[i][j] = matrix[j][i]
        }
    }
    console.log("Transposed matrix: ")
    matrixBeautifulPrint(res, n, epsilon)
    return res
}

const getInvertedMatrix = (matrix, transposedMatrix, n) => {
    let det = determinant(matrix, n)
    if(det === 0) {
        return
    }
    return transposedMatrix.map( item => item.map(el => el/det))
}

const solveWithMatrixMethod = (matrix, resultsCol, n, epsilon) => {
    if (!epsilon || epsilon === NaN) {
        console.error("Wrong epsilon!")
        return []
    }
    if (epsilon >= 1) {
        console.error("Wrong epsilon! Enter value between 0 and 1.");
        return []
    }
    let res = []
    if (resultsCol.length != n) {
        return []
    }

    const det = determinant(matrix, n)
    console.log("Determinant is: ", numberToBeautifulString(det, epsilon))
    if (det === 0) {
        return []
    }

    matrix =
        getInvertedMatrix(matrix,
            transposeMatrix(getComplementsMatrix(getComplements(matrix, n), n), n, epsilon), n)
    console.log("Inverted matrix: ")
    matrixBeautifulPrint(matrix, n, epsilon)

    for(let i = 0; i < n; i++) {
        let temp = 0;
        for(let j = 0; j < n; j++) {
            temp += matrix[i][j] * resultsCol[j]
        }
        res.push(temp)
    }
    return res.map(i => i.toFixed(countDecimals(epsilon) <= 16 ? countDecimals(epsilon) : 16))
}

module.exports.solve = solveWithMatrixMethod
