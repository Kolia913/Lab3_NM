const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
})
const cm = require("./cramersMethod")
const mm = require("./matrixMethod")

const matrix = [[3.75, -0.28, 0.17],
                [2.11, -0.11, -0.12],
                [0.22, -3.17, 1.81]]

const resultCol = [0.75, 1.11, 0.05]

const displayResult = (vector) => {
    let obj = {}
    for(let i = 0; i < vector.length; i++) {
        obj = {...obj, [`x${i+1}`]: vector[i]}
    }
    console.log("Result: ",obj)
}



rl.question("Enter method c-Crammer's/m-Matrix: ", function(method) {
    rl.question("Enter epsilon: ", function(epsilon) {
        if(method === 'c') {
            const vect = cm.solve(matrix, resultCol, 3, Number(epsilon))
            displayResult(vect ? vect : [])
        } else {
            const vect = mm.solve(matrix, resultCol, 3, Number(epsilon))
            displayResult(vect ? vect : [])
        }
        rl.close()
    })
})

rl.on('close', function() {
    process.exit(0)
})