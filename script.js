/*Player Module
 * creates a player with name and symbol*/

const player = (name, symbol) => {
  return { name, symbol };
};

/* game board module
 * creates behind the scenes board for later logic*/
const gameBoard = (() => {
  const board = new Array(9);

  const putEntry = (index, symbol) => {
    if (board[index] == undefined) {
      board[index] = symbol;
    }
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = undefined;
    }
  };

  const getIndex = (index) => {
    return board[index];
  };

  return { getIndex, putEntry, reset };
})();

/*Game logic Module
 *behind the scenes implementation of the actual game*/
const gameLogic = (() => {
  const p1 = player("Player 1", "X");
  const p2 = player("PLayer 2", "O");

  turns = 1;
  gameOver = false;
  let curPlayer = p1;

  const getCurPlayer = () => {
    curPlayer = turns % 2 != 0 ? p1 : p2;
    return curPlayer;
  };

  const winCons = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const validTurn = (index, cell) => {
    curPlayer = getCurPlayer();

    if (gameBoard.getIndex(index) == undefined && gameOver == false && turns < 10) {
      gameBoard.putEntry(index, curPlayer.symbol);
      gameDisplay.updateCell(cell, curPlayer.symbol);
      if (checkWin(curPlayer.symbol)) {
        gameDisplay.finishGame("win");
        gameOver = true;
      } else if (turns == 9) {
        gameOver = true;
        gameDisplay.finishGame("tie");
      } else {
        turns++;
        gameDisplay.updateTurn();
      }
    }
  };

  const checkWin = (symbol) => {
    for (let i = 0; i < winCons.length; i++) {
      const row = winCons[i];
      if (row.every((element) => gameBoard.getIndex(element) == symbol)) {
        return true;
      }
    }
    return false;
  };

  const resetGame = () => {
    turns = 1;
    gameOver = false;
    curSymbol = p1.symbol;
  };

  return { validTurn, getCurPlayer, resetGame };
})();

/*Game display Module
 * Updates the game board that the user sees and interacts with*/
const gameDisplay = (function (doc) {
  const cells = [...doc.getElementsByClassName("cell")];
  const resetBtn = document.querySelector(".reset");
  const turnDisplay = document.querySelector(".turn-display");
  cells.forEach((cell) => cell.addEventListener("click", () => cellClicked(cell.getAttribute("data-cell"), cell)));

  const updateTurn = () => {
    const curPlayer = gameLogic.getCurPlayer();
    turnDisplay.innerHTML = `${curPlayer.name} (${curPlayer.symbol})'s  turn`;
  };

  const finishGame = (result) => {
    if (result == "win") {
      const curPlayer = gameLogic.getCurPlayer();
      turnDisplay.innerHTML = `${curPlayer.name} (${curPlayer.symbol}) wins!`;
    } else {
      turnDisplay.innerHTML = `TIE`;
    }
  };

  updateTurn();

  const updateCell = (cell, symbol) => {
    const para = document.createElement("p");
    const content = document.createTextNode(symbol);
    para.appendChild(content);
    if (symbol == "X") {
      para.classList.add("x-symbol");
    } else {
      para.classList.add("o-symbol");
    }

    cell.appendChild(para);
  };

  const cellClicked = (index, cell) => {
    const turn = gameLogic.validTurn(index, cell);
  };

  const resetGame = () => {
    cells.forEach((cell) => (cell.innerHTML = ""));
    gameBoard.reset();
    gameLogic.resetGame();
    updateTurn();
  };

  resetBtn.addEventListener("click", resetGame);

  return { updateCell, updateTurn, finishGame };
})(document);
