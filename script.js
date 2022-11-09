class Start {
    constructor() {
        this.option = ["🖐", "✌", "✊"];
        this.playerOption;
        this.botOption;
        this.winner;
    }

    set setPlayerOption(option) {
        this.playerOption = option;
    }

    get getPlayerOption() {
        return this.playerOption;
    }

    set setBotOption(option) {
        this.botOption = option;
    }

    get getBotOption() {
        return this.botOption;
    }

    botBrain() {
        const randomPicker = this.option[Math.floor(Math.random() * this.option.length)];
        return randomPicker;
    }
}

let playerScore = 0;
let botScore = 0;

// TITLE
const title = document.getElementById("title");

// MATCH BOARD 
const matchBoard = document.getElementById("match");

// TARGET SCORE
const targetScore = document.getElementById("target-score");

// OPTION
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const rock = document.getElementById("rock");

// PLAYER & BOT NAME
const namePlayer = document.getElementById("player-name");
const nameBot = document.getElementById("bot-name");

// PLAYER & BOT OPTION
const optionPlayer = document.getElementById("player-option");
const optionBot = document.getElementById("bot-option");

// PLAYER & BOT SCORE
const scorePlayer = document.getElementById("player-score");
const scoreBot = document.getElementById("bot-score");

// RESULT
const statusResult = document.getElementById("result");
let result;

// PICKER
const pickerOption = document.getElementById("picker");

// RESET
const playAgain = document.getElementById("play-again");
const backHome = document.getElementById("back-home");

// GET PLAYER NAME
window.addEventListener("load", () => {
    const username = localStorage.getItem("USERNAME");
    namePlayer.textContent = "PLAYER";
    nameBot.textContent = "BOT";
})

// FUNCTION MAIN GAME
const mainGame = (option) => {
    const start = new Start();
    start.setPlayerOption = option;
    start.setBotOption = start.botBrain();

    const waitingMessage = document.createElement("p");
    waitingMessage.textContent = "Waiting..."
    waitingMessage.classList.add("fadeIn");

    if (optionBot.textContent == "") {
        optionBot.appendChild(waitingMessage);
    }

    optionPlayer.textContent = start.getPlayerOption;
    paper.disabled = true;
    scissors.disabled = true;
    rock.disabled = true;

    if (start.getPlayerOption === start.getBotOption) {
        result = "DRAW";
    } else if (start.getPlayerOption === start.option[0]) {
        if (start.getBotOption === start.option[2]) {
            result = "WIN";
            playerScore++;
        } else {
            result = "LOSE";
            botScore++;
        }
    } else if (start.getPlayerOption === start.option[1]) {
        if (start.getBotOption === start.option[0]) {
            result = "WIN";
            playerScore++;
        } else {
            result = "LOSE";
            botScore++;
        }
    } else if (start.getPlayerOption === start.option[2]) {
        if (start.getBotOption === start.option[1]) {
            result = "WIN";
            playerScore++;
        } else {
            result = "LOSE";
            botScore++;
        }
    }

    setTimeout(() => {
        waitingMessage.classList.add("fadeOut");
    }, 4500);

    setTimeout(() => {
        optionBot.textContent = start.getBotOption;
        scoreBot.textContent = `Score: ${botScore}`;
        scorePlayer.textContent = `Score: ${playerScore}`;
        statusResult.textContent = result;
        statusResult.classList.add("fadeIn");
    }, 5000);

    setTimeout(() => {
        optionPlayer.textContent = "";
        optionBot.textContent = "";
        waitingMessage.classList.remove("fadeIn");
        waitingMessage.classList.remove("fadeOut");
        paper.disabled = false;
        scissors.disabled = false;
        rock.disabled = false;
        if (playerScore === 5 || botScore === 5) {
            title.classList.add("hidden");
            matchBoard.classList.add("hidden");
            targetScore.classList.add("hidden");
            pickerOption.classList.add("hidden");
            playAgain.classList.add("visible");
            backHome.classList.add("visible");
        } else {
            statusResult.textContent = "";
        }
    }, 8000);
}

// FUNCTION RESET
const reset = () => {
    playerScore = 0;
    botScore = 0;
    scoreBot.textContent = `Score: ${botScore}`;
    scorePlayer.textContent = `Score: ${playerScore}`;
    statusResult.textContent = "";
    title.classList.remove("hidden");
    pickerOption.classList.remove("hidden");
    matchBoard.classList.remove("hidden");
    targetScore.classList.remove("hidden");
    playAgain.classList.remove("visible");
    backHome.classList.remove("visible");
}

// RESET MENU
playAgain.addEventListener("click", reset);