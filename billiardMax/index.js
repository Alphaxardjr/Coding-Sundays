const addPlayerBtn = document.querySelector("#add-player-btn")
const playerInputEl = document.querySelector("#player-input-el")
const scoreEditEl = document.getElementById("score-edit").innerText
const data = JSON.parse(localStorage.getItem("playerData")) || []

localStorage.setItem("playerData", JSON.stringify(data))

function getPlayerName() {
    const playerName = playerInputEl.value
    return playerName
}

function addPlayerDetails(name) {
    const playerData = {
        playerName: name,
        scores: [0, 45, 54],
        id: Date.now()
    }

    data.push(playerData)
    localStorage.setItem("playerData", JSON.stringify(data))
    getName()
    getScores()
}

addPlayerBtn.addEventListener('click', function (e) {
    e.preventDefault()
    const name = getPlayerName()
    if (name) {
        addPlayerDetails(name)
        playerInputEl.value = ""
    }
})

function addToList(oldList, newValues) {
    oldList.length = 0 // Clear the array

    // Split by commas and trim spaces from each element
    const values = newValues.split(",").map(val => val.trim())

    for (let val of values) {
        const num = parseInt(val, 10)
        if (!isNaN(num)) {
            oldList.push(num)
        }
    }
    return oldList
}

// Show and hide edit menu
document.getElementById("player-name").addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON" && e.target.classList.contains("nameBtn")) {
        const clickedId = parseInt(e.target.id, 10)
        const playerData = data.filter(obj => obj.id === clickedId)[0]

        document.getElementById("score-edit").innerHTML =
            `<div class="score-heading"><h3 class="score-edit-header">Editing <span class="fancy-name">${playerData.playerName}'s</span> scores</h3></div>
            <div id="marks-controls" class="marks-controls">
                <div id="marks-input" class="marks-input"></div>
                <div class="ball-btn" id="ball-btn">
                </div>
                <div class="action-btns" id="action-btns">
                    <button type="button" id="minus-btn"><i class="fa-solid fa-minus"></i></button>
                    <button type="button" id="comma-btn">,</button>
                    <button type="button" id="done-btn" class="done-btn"><i class="fa-solid fa-check"></i></button>
                </div>
            </div>`

        const ballBtnContainer = document.getElementById('ball-btn')
        for (let i = 0; i < 10; i++) {
            const button = document.createElement('button')
            button.type = 'button'
            button.textContent = i
            button.id = i
            button.className = 'ball-btn'
            ballBtnContainer.appendChild(button)
        }

        const scoresDiv = document.getElementById("marks-input")
        scoresDiv.innerText = playerData.scores.join(",") + ","
        let newScores = scoresDiv.innerText.trim()

        addToList(playerData.scores, newScores)
        localStorage.setItem("playerData", JSON.stringify(data))
        getScores()

        function addScore(score) {
            const marksInput =document.getElementById("marks-input")
            if(marksInput){
                marksInput.innerHTML += score
            }
        }

        let marks = 0

        document.getElementById("ball-btn").addEventListener("click", function (e) {
            const clickedBall = parseInt(e.target.id)
            if (!isNaN(clickedBall)) {
                switch (clickedBall) {
                    case 1:
                        marks = 17
                        break
                    case 2:
                        marks = 16
                        break
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        marks = 6
                        break
                    case 7:
                        marks = 7
                        break
                    case 8:
                        marks = 8
                        break
                    case 9:
                        marks = 9
                        break
                    case 10:
                        marks = 10
                        break
                    case 11:
                        marks = 11
                        break
                    case 12:
                        marks = 12
                        break
                    case 13:
                        marks = 13
                        break
                    case 14:
                        marks = 14
                        break
                    case 15:
                        marks = 15
                        break
                    default:
                        console.log('Clicked ID is not handled in the switch')
                }
                addScore(marks)
            }
        })

        document.getElementById("action-btns").addEventListener("click", function (e) {
            const clickedAction = e.target.id
            let action

            switch (clickedAction) {
                case "minus-btn":
                    action = "-"
                    break
                case "comma-btn":
                    action = ","
                    break
            }

            addScore(action)
        })

        document.getElementById("done-btn").addEventListener("click", function () {
            // Get the updated scores
            newScores = document.getElementById("marks-input").innerText.trim()
            // Update the player's scores and local storage
            addToList(playerData.scores, newScores)
            localStorage.setItem("playerData", JSON.stringify(data))
            // Refresh displayed scores
            getScores()
            // Clearing the edit menu
            document.getElementById("score-edit").innerHTML = ""
        })

       
    }
})

localStorage.clear()

function getRank(score) {
    const scores = []
    for (let player of data) {
        scores.push(player.scores.reduce((x, y) => x + y, 0))
    }

    const sortedScores = scores.sort((a, b) => b - a)

    return sortedScores.indexOf(score) === -1 ? "-" :
        sortedScores.indexOf(score) + 1
}

function getScores() {
    let playerScores = ""
    for (let player of data) {
        const totalScore = player.scores.reduce((x, y) => x + y, 0)
        const playerScore = `
                    <tr>
                        <td>${player.scores}</td>
                        <td>
                            ${totalScore}
                        </td>   
                        <td>${getRank(totalScore)}</td>
                    </tr>
        `
        playerScores += playerScore
    }
    document.getElementById("player-detail").innerHTML = playerScores
}

function getName() {
    let players = ""
    for (let player of data) {
        const playerName = `
                    <tr>
                        <td class ="player-col">
                            <button class="nameBtn" id="${player.id}">
                                ${player.playerName}
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                         </td>    
                    </tr>
                `
        players += playerName
    }
    document.getElementById("player-name").innerHTML = players
}

getName()
getScores()

localStorage.clear()
