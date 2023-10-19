const player = (name, symbol) => {
  return { name, symbol };
};

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

const gameLogic = (() => {
  const p1 = player("John", "X");
  const p2 = player("Jane", "O");

  let turns = 1;
  let gameOver = false;
  let curPlayer = p1;

  const getCurPlayer = () => {
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
    curPlayer = turns % 2 != 0 ? p1 : p2;
    if (gameBoard.getIndex(index) == undefined && gameOver == false && turns < 10) {
      gameBoard.putEntry(index, curPlayer.symbol);
      gameDisplay.updateCell(cell, curPlayer.symbol);
      if (checkWin(curPlayer.symbol)) {
        gameOver = true;
        return 0;
      } else if (turns == 9) {
        gameOver = true;
        return 2;
      } else {
        turns++;
        return 1;
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

const gameDisplay = (function (doc) {
  const cells = [...doc.getElementsByClassName("cell")];
  const resultDisplay = document.querySelector(".result");
  const resetBtn = document.querySelector(".reset");
  cells.forEach((cell) => cell.addEventListener("click", () => cellClicked(cell.getAttribute("data-cell"), cell)));

  const updateCell = (cell, symbol) => {
    cell.innerHTML = symbol;
  };

  const cellClicked = (index, cell) => {
    const turn = gameLogic.validTurn(index, cell);
    if (turn == 0) {
      resultDisplay.innerHTML = `Player ${gameLogic.getCurPlayer().name} wins`;
    } else if (turn == 1) {
    } else if (turn == 2) {
      resultDisplay.innerHTML = "TIE";
    }
  };

  const resetGame = () => {
    cells.forEach((cell) => (cell.innerHTML = ""));
    gameBoard.reset();
    gameLogic.resetGame();
    resultDisplay.innerHTML = null;
  };

  resetBtn.addEventListener("click", resetGame);

  return { updateCell };
})(document);
