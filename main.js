const fields = document.querySelectorAll(".field")

let game = true
let gameRound = 1
let xScoreboard = 0
let circleScoreboard = 0
let userOneFields = []
let userTwoFields = []
let endGame = false

fields.forEach(field => {
    field.addEventListener("click", runGame)
})

function runGame(event) {
    let field = event.target.dataset.field

    if (!game) {
        return;
    }

    if (fieldWasFilled(field)) {
        return;
    }

    setFields(event)
    checkWinner()
    checkEndGame()
    changeUserTurn()
}

function setFields(event) {
    if (isFirstUserTurn()) {
        addX(event)
        return;
    }

    addCircle(event)
}

function changeUserTurn() {
    if (!game) {
        return;
    }

    if (!endGame) {
        document.querySelector("#x").classList.toggle('turns')
        document.querySelector("#circle").classList.toggle('turns')
        document.querySelector(".pointer").classList.toggle('change')

        gameRound++
    }
}

function fieldWasFilled(field) {
    return userOneFields.indexOf(parseInt(field)) > -1 || userTwoFields.indexOf(parseInt(field)) > -1
}

function isFirstUserTurn() {
    return (gameRound % 2) == 1
}

function addX(event) {
    userOneFields.push(parseInt(event.target.dataset.field))
    event.target.innerHTML= `<div class="x" data-field="${event.target.dataset.field}"></div>`
}

function addCircle(event) {
    userTwoFields.push(parseInt(event.target.dataset.field))
    event.target.innerHTML= `<div class="circle" data-field="${event.target.dataset.field}"></div>`
}

function checkWinner() {
    const winningCombinations = getWinningCombinations()

    winningCombinations.map(combination => {
        let winnerX = 0
        let winnerCircle = 0

        combination.map(value => {
            if (userOneFields.indexOf(value) > -1) {
                winnerX++
            }

            if (userTwoFields.indexOf(value) > -1) {
                winnerCircle++
            }
        })

        if (winnerX === 3) {
            xIsWinner()
            return;
        }

        if (winnerCircle == 3) {
            circleIsWinner()
            return;
        }
    })
}

function checkEndGame() {
    if (userOneFields.length == 5 || userTwoFields.length == 5) {
        document.querySelector(".restart-button").classList.remove('hidden')
        endGame = true
    }
}

function getWinningCombinations() {
    return [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ]
}

function xIsWinner() {
    game = false;
    xScoreboard++
    setCssWinner()
    document.querySelector("#xScoreboard").innerHTML = xScoreboard
}

function circleIsWinner() {
    game = false;
    circleScoreboard++
    setCssWinner()
    document.querySelector("#circleScoreboard").innerHTML = circleScoreboard
}

function setCssWinner() {
    document.querySelector(".restart-button").classList.remove('hidden')
}

function restartGame() {
    game = true
    userOneFields = []
    userTwoFields = []

    document.querySelectorAll(".game .x").forEach(field => {
        field.parentNode.removeChild(field)
    })
    document.querySelectorAll(".game .circle").forEach(field => {
        field.parentNode.removeChild(field)
    })

    document.querySelector(".restart-button").classList.add('hidden')

    changeUserTurn()
    endGame = false;
}