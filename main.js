const fields = document.querySelectorAll(".field")

let game = true
let gameRound = 1
let xScoreboard = 0
let circleScoreboard = 0
let userOneFields = []
let userTwoFields = []

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

    document.querySelector("#x").classList.toggle('turns')
    document.querySelector("#circle").classList.toggle('turns')
    document.querySelector(".pointer").classList.toggle('change')

    gameRound++
}

function fieldWasFilled(field) {
    return userOneFields.indexOf(parseInt(field)) > -1 || userTwoFields.indexOf(parseInt(field)) > -1
}

function isFirstUserTurn() {
    return (gameRound % 2) == 1
}

function addX(event) {
    userOneFields.push(parseInt(event.target.dataset.field))
    event.target.innerHTML = 
    `<svg class="x" data-field="${event.target.dataset.field}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
            <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
            <g><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"><path d="M1037.3,5011.7C628.6,4956,269.8,4649,143.1,4244.1c-51.8-165-55.6-443.3-9.6-602.5c86.4-289.8,25-222.6,1734.7-1934.3l1587-1588.9l-1587-1587C158.5-3182.3,219.9-3115.1,133.5-3404.9c-48-159.3-44.1-439.4,9.6-602.6c109.4-347.3,385.7-621.7,731.1-731.1c163.1-53.7,443.3-57.6,602.6-9.6c289.8,86.3,222.6,24.9,1936.2,1734.7l1587,1587l1588.9-1587c1711.7-1709.8,1644.5-1648.4,1934.3-1734.7c159.3-48,439.5-44.2,602.6,9.6c347.3,109.4,621.8,385.7,731.1,731.1c53.7,163.1,57.6,443.3,9.6,602.6c-86.3,289.8-24.9,222.6-1734.7,1936.2l-1587,1587l1587,1588.9c1709.8,1711.7,1648.4,1644.6,1734.7,1934.3c48,159.3,44.2,439.4-9.6,602.5c-109.4,345.4-383.8,621.7-731.1,731.1c-163.1,53.7-443.3,57.6-602.6,9.6c-289.8-86.3-222.6-25-1934.3-1734.7L5000,1663.1l-1587,1587c-1381.7,1379.7-1604.2,1592.7-1706,1642.6C1490.2,5002.1,1259.9,5042.4,1037.3,5011.7z"/></g></g>
    </svg>`
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
    if ((userOneFields.length == 5 || userTwoFields.length == 5) && game == true) {
        document.querySelector(".restart-button").classList.remove('hidden')
        game = false
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
}