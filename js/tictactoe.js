

// let boxes = document.querySelectorAll(".box");
// let resetBtn = document.querySelector("#reset-btn");
// let newGameBtn = document.querySelector("#new-btn");
// let msgContainer = document.querySelector(".msg-container");
// let msg = document.querySelector("#msg");
// let turnIndicator = document.querySelector("#turn-indicator");
// let aiBtn = document.querySelector("#aiModeBtn");

// let scoreO = document.querySelector("#score-o");
// let scoreX = document.querySelector("#score-x");
// let scoreD = document.querySelector("#score-d");

// let turnO = true;
// let count = 0;
// let running = true;
// let aiEnabled = false;

// const winPattern = [
//   [0,1,2],[0,3,6],[0,4,8],
//   [1,4,7],[2,5,8],[2,4,6],
//   [3,4,5],[6,7,8]
// ];

// let board = ["","","","","","","","",""];

// aiBtn.addEventListener("click", () => {
//   aiEnabled = !aiEnabled;
//   aiBtn.textContent = aiEnabled ? "Play vs Human" : "Play vs AI";
//   resetGame();
// });

// const updateTurnIndicator = () => {
//   turnIndicator.innerText = `Turn: Player ${turnO ? "O" : "X"}`;
// };

// const disableBoxes = () => boxes.forEach(b => b.disabled = true);

// const enableBoxes = () => {
//   boxes.forEach(b => {
//     b.disabled = false;
//     b.innerText = "";
//     b.classList.remove("highlight");
//   });
// };

// const resetGame = () => {
//   turnO = true;
//   count = 0;
//   running = true;
//   board.fill("");
//   enableBoxes();
//   msgContainer.classList.add("hide");
//   updateTurnIndicator();
// };

// const newGame = () => resetGame();

// boxes.forEach((box, index) => {
//   box.addEventListener("click", () => playerMove(box, index));
// });

// function playerMove(box, index) {
//   if (!running || box.innerText !== "") return;

//   box.innerText = turnO ? "O" : "X";
//   board[index] = turnO ? "O" : "X";
//   box.classList.toggle("color", !turnO);
//   box.disabled = true;
//   count++;

//   let winner = checkWinner();
//   if (winner) return showWinner(winner);
//   if (count === 9) return gameDraw();

//   turnO = !turnO;
//   updateTurnIndicator();

//   if (aiEnabled && !turnO && running) {
//     setTimeout(aiMove, 500);
//   }
// }

// function aiMove() {
//   let bestMove = findBestMove();
//   board[bestMove] = "X";
//   boxes[bestMove].innerText = "X";
//   boxes[bestMove].disabled = true;
//   count++;

//   let winner = checkWinner();
//   if (winner) return showWinner(winner);
//   if (count === 9) return gameDraw();

//   turnO = true;
//   updateTurnIndicator();
// }

// function findBestMove() {
//   let bestScore = -Infinity;
//   let move;
//   for (let i = 0; i < 9; i++) {
//     if (board[i] === "") {
//       board[i] = "X";
//       let score = minimax(board, 0, false);
//       board[i] = "";
//       if (score > bestScore) {
//         bestScore = score;
//         move = i;
//       }
//     }
//   }
//   return move;
// }

// function minimax(newBoard, depth, isMaximizing) {
//   let winner = evaluateBoard();
//   if (winner !== null) return winner;

//   if (isMaximizing) {
//     let bestScore = -Infinity;
//     for (let i = 0; i < 9; i++) {
//       if (newBoard[i] === "") {
//         newBoard[i] = "X";
//         let score = minimax(newBoard, depth + 1, false);
//         newBoard[i] = "";
//         bestScore = Math.max(score, bestScore);
//       }
//     }
//     return bestScore;
//   } else {
//     let bestScore = Infinity;
//     for (let i = 0; i < 9; i++) {
//       if (newBoard[i] === "") {
//         newBoard[i] = "O";
//         let score = minimax(newBoard, depth + 1, true);
//         newBoard[i] = "";
//         bestScore = Math.min(score, bestScore);
//       }
//     }
//     return bestScore;
//   }
// }

// function evaluateBoard() {
//   for (let pattern of winPattern) {
//     let [a,b,c] = pattern;
//     if (board[a] && board[a] === board[b] && board[b] === board[c]) {
//       return board[a] === "X" ? 1 : -1;
//     }
//   }
//   if (!board.includes("")) return 0;
//   return null;
// }

// function checkWinner() {
//   for (let pattern of winPattern) {
//     let [a, b, c] = pattern;
//     if (board[a] && board[a] === board[b] && board[b] === board[c]) {
//       boxes[a].classList.add("highlight");
//       boxes[b].classList.add("highlight");
//       boxes[c].classList.add("highlight");
//       return board[a];
//     }
//   }
//   return null;
// }

// function showWinner(winner) {
//   msg.innerText = `Winner: ${winner}`;
//   msgContainer.classList.remove("hide");
//   disableBoxes();
//   running = false;

//   if (winner === "O") scoreO.innerText = parseInt(scoreO.innerText) + 1;
//   else if (winner === "X") scoreX.innerText = parseInt(scoreX.innerText) + 1;
// }

// function gameDraw() {
//   msg.innerText = "Game is a Draw!";
//   msgContainer.classList.remove("hide");
//   disableBoxes();
//   running = false;
//   scoreD.innerText = parseInt(scoreD.innerText) + 1;
// }

// resetBtn.addEventListener("click", resetGame);
// newGameBtn.addEventListener("click", newGame);
// updateTurnIndicator();

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnIndicator = document.querySelector("#turn-indicator");
let aiBtn = document.querySelector("#aiModeBtn");

let scoreO = document.querySelector("#score-o");
let scoreX = document.querySelector("#score-x");
let scoreD = document.querySelector("#score-d");

let turnO = true;
let count = 0;
let running = true;
let aiEnabled = false;

const winPattern = [
  [0,1,2],[0,3,6],[0,4,8],
  [1,4,7],[2,5,8],[2,4,6],
  [3,4,5],[6,7,8]
];

let board = ["","","","","","","","",""];

aiBtn.addEventListener("click", () => {
  aiEnabled = !aiEnabled;
  aiBtn.textContent = aiEnabled ? "Play vs Human" : "Play vs AI";
  resetBoard();
});

const updateTurnIndicator = () => {
  turnIndicator.innerText = `Turn: Player ${turnO ? "O" : "X"}`;
};

const disableBoxes = () => boxes.forEach(b => b.disabled = true);

const enableBoxes = () => {
  boxes.forEach(b => {
    b.disabled = false;
    b.innerText = "";
    b.classList.remove("highlight");
  });
};

const resetBoard = () => {
  turnO = true;
  count = 0;
  running = true;
  board.fill("");
  enableBoxes();
  msgContainer.classList.add("hide");
  updateTurnIndicator();
};

const resetScores = () => {
  scoreO.innerText = "0";
  scoreX.innerText = "0";
  scoreD.innerText = "0";
  resetBoard();
};

boxes.forEach((box, index) => {
  box.addEventListener("click", () => playerMove(box, index));
});

function playerMove(box, index) {
  if (!running || box.innerText !== "") return;

  box.innerText = turnO ? "O" : "X";
  board[index] = turnO ? "O" : "X";
  box.classList.toggle("color", !turnO);
  box.disabled = true;
  count++;

  let winner = checkWinner();
  if (winner) return showWinner(winner);
  if (count === 9) return gameDraw();

  turnO = !turnO;
  updateTurnIndicator();

  if (aiEnabled && !turnO && running) {
    setTimeout(aiMove, 500);
  }
}

function aiMove() {
  let bestMove = findBestMove();
  board[bestMove] = "X";
  boxes[bestMove].innerText = "X";
  boxes[bestMove].disabled = true;
  count++;

  let winner = checkWinner();
  if (winner) return showWinner(winner);
  if (count === 9) return gameDraw();

  turnO = true;
  updateTurnIndicator();
}

function findBestMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = "X";
      let score = minimax(board, 0, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function minimax(newBoard, depth, isMaximizing) {
  let result = evaluateBoard();
  if (result !== null) return result;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (newBoard[i] === "") {
        newBoard[i] = "X";
        let score = minimax(newBoard, depth + 1, false);
        newBoard[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (newBoard[i] === "") {
        newBoard[i] = "O";
        let score = minimax(newBoard, depth + 1, true);
        newBoard[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function evaluateBoard() {
  for (let pattern of winPattern) {
    let [a,b,c] = pattern;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a] === "X" ? 1 : -1;
    }
  }
  if (!board.includes("")) return 0;
  return null;
}

function checkWinner() {
  for (let pattern of winPattern) {
    let [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      boxes[a].classList.add("highlight");
      boxes[b].classList.add("highlight");
      boxes[c].classList.add("highlight");
      return board[a];
    }
  }
  return null;
}

function showWinner(winner) {
  msg.innerText = `Winner: ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  running = false;

  if (winner === "O") scoreO.innerText = parseInt(scoreO.innerText) + 1;
  else if (winner === "X") scoreX.innerText = parseInt(scoreX.innerText) + 1;
}

function gameDraw() {
  msg.innerText = "Game is a Draw!";
  msgContainer.classList.remove("hide");
  disableBoxes();
  running = false;
  scoreD.innerText = parseInt(scoreD.innerText) + 1;
}

resetBtn.addEventListener("click", resetScores);
newGameBtn.addEventListener("click", resetBoard);
updateTurnIndicator();
