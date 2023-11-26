// Function that gives random option 
let playerScore = 0;
let computerScore = 0;

function getComputerChoice () {
    const options = ["Rock","Paper","Scissors"];
    let randomID = Math.floor(Math.random()*options.length);
    return options[randomID];

}
// Function that plays a round and determines who won. Returns 1 if player won, -1 if computer won and 0 if it was a draw.
function playRound(playerSelection,computerSelection) {
    if (playerSelection == "rock"){
        if (computerSelection == "Rock") {
            return 0;
        } else if (computerSelection == "Paper" ) {
            return -1;
        } else {
            return 1;
        }
    } else if (playerSelection == "paper") {
        if(computerSelection == "Rock") {
            return 1;
        } else if(computerSelection == "Paper") {
            return 0;
        } else {
            return -1;
        }
    } else if (playerSelection == "scissors") {
        if (computerSelection == "Rock") {
            return -1;
        } else if (computerSelection == "Paper") {
            return 1;
        } else {
            return 0;
        }
    } else {
        return 0;
   }
}

function updateScore(roundResult) {
    if (roundResult == 1) {
        playerScore ++
    } else if (roundResult == -1) {
        computerScore ++
    }
}

function displayChoice (computerChoice) {
    const results = document.querySelector("#results")

    let computer = results.querySelector('.computer-choice')

    if (!computer) {
        computer = document.createElement('p')
        computer.classList.add('computer-choice')
        results.appendChild(computer)
    }

    computer.textContent = `Computer selection: ${computerChoice}`
}

function displayScore(playerScore,computerScore) {
    const results = document.querySelector("#results")

    let player = results.querySelector('.player-score')
    let computer = results.querySelector('.computer-score')

    if(!player) {
        player = document.createElement('h1')
        player.classList.add('player-score')
        results.appendChild(player)
    }

    if(!computer) {
        computer = document.createElement('h1')
        computer.classList.add('computer-score')
        results.appendChild(computer)
    }

    player.textContent = `Player score: ${playerScore}`
    computer.textContent = `Computer score: ${computerScore}`

}

function checkWinCondition (playerScore,computerScore) {
    if (playerScore == 5 || computerScore == 5) {
        return true
    } else {
        return false
    }
}

function displayWinner (playerScore,computerScore) {
    const results = document.querySelector("#results")
    const playerScoreElem = results.querySelector('.player-score')
    const computerScoreELem = results.querySelector('.computer-score')
    const computerChoiceElem = results.querySelector('.computer-choice')

    results.removeChild(playerScoreElem)
    results.removeChild(computerChoiceElem)
    results.removeChild(computerScoreELem)
    
    function determineWinner () {
        if (playerScore == 5) {
            return "Player"
        } else if (computerScore == 5) {
            return "Computer"
        }
    }
    let winner = determineWinner()
    let gameWinner = document.createElement('h1')
    gameWinner.classList.add('game-winner')
    results.appendChild(gameWinner)
    gameWinner.textContent = `The game was won by: ${winner}.`

    let tryAgainButton = document.createElement('button')
    tryAgainButton.textContent = "Play Again"
    tryAgainButton.classList.add('play-again')
    results.appendChild(tryAgainButton)

    tryAgainButton.addEventListener('click', () => {
        restartGame()
    })
}

function restartGame() {
    const results = document.querySelector("#results")

    let gameWinnerElem = results.querySelector('.game-winner')
    results.removeChild(gameWinnerElem)

    let tryAgainElem = results.querySelector('.play-again')
    results.removeChild(tryAgainElem)

    playerScore = 0;
    computerScore = 0;
}

const buttons = document.querySelectorAll("button")

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (!checkWinCondition(playerScore,computerScore)) {
            let computerSelection = getComputerChoice()
            displayChoice(computerSelection)
            let roundResult = playRound(button.className, computerSelection)
            updateScore(roundResult)
            displayScore(playerScore,computerScore)
        }

        if (checkWinCondition(playerScore,computerScore)){
            displayWinner(playerScore,computerScore)
        }
        
    })
})