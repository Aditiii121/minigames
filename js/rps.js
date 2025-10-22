
let computerPicture = document.querySelector(".computer img");
let playerPicture = document.querySelector(".player img");
let computerPoints = document.querySelector(".computerPoints");
let playerPoints = document.querySelector(".playerPoints");
let options = document.querySelectorAll(".options button");  
let reset = document.querySelector(".reset button");

let cPoints = 0;
let pPoints = 0;

// Shake animation
const shakeAnimation = () => {
    computerPicture.classList.add("shakeComputer");
    playerPicture.classList.add("shakePlayer");
};

// Remove shake after animation ends
computerPicture.addEventListener("animationend", () => {
    computerPicture.classList.remove("shakeComputer");
});
playerPicture.addEventListener("animationend", () => {
    playerPicture.classList.remove("shakePlayer");
});

// Handle game logic
options.forEach((option) => {
    option.addEventListener("click", () => {
        shakeAnimation();

        // Update player image
        playerPicture.src = "../images/" + option.innerText + "Player.png";

        // Random computer choice
        const choice = ["STONE", "PAPER", "SCISSOR"];
        let arrNo = Math.floor(Math.random() * 3);
        let computerChoice = choice[arrNo];
        computerPicture.src = "../images/" + computerChoice + "Computer.png";

        // Game logic
        if (option.innerText === "SCISSOR") {
            if (computerChoice === "PAPER") {
                playerPoints.innerText = ++pPoints;
            } else if (computerChoice === "STONE") {
                computerPoints.innerText = ++cPoints;
            }
        }
        if (option.innerText === "PAPER") {
            if (computerChoice === "STONE") {
                playerPoints.innerText = ++pPoints;
            } else if (computerChoice === "SCISSOR") {
                computerPoints.innerText = ++cPoints;
            }
        }
        if (option.innerText === "STONE") {
            if (computerChoice === "SCISSOR") {
                playerPoints.innerText = ++pPoints;
            } else if (computerChoice === "PAPER") {
                computerPoints.innerText = ++cPoints;
            }
        }
    });
});

// Reset game
reset.addEventListener("click", () => {
    cPoints = 0;
    pPoints = 0;
    playerPoints.innerText = pPoints;
    computerPoints.innerText = cPoints;

    playerPicture.src = "../images/STONEPlayer.png";
    computerPicture.src = "../images/STONEComputer.png";
});
