const determinant = (matrix, n) => {
    let d = 0
    if (n == 1) {
        return matrix[0][0]
    }

    if (n == 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
    }

    if (n >= 3) {
        let newMatrix = new Array(n - 1);
        for (let skipColumn = 0; skipColumn < n; skipColumn++) {
            for (let k = 0; k < (n - 1); k++) {
                newMatrix[k] = new Array(n - 1)
            }
            for (let i = 1; i < n; i++) {
                let skipRow = 0
                for (let j = 0; j < n; j++) {
                    if (j == skipColumn) continue
                    newMatrix[i - 1][skipRow] = matrix[i][j]
                    skipRow++;
                }
            }
            let negPowerOfSkip;
            if (skipColumn % 2 == 0) {
                negPowerOfSkip = 1
            } else {
                negPowerOfSkip = -1
            }

            d += negPowerOfSkip * matrix[0][skipColumn] * determinant(newMatrix, n - 1)
        }
    }
    return d
}

module.exports.determinant = determinant