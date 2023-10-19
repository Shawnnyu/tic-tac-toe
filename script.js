const gameFlow = (function (doc) {
  const innerBoard = new Array(9);
  const cells = [...doc.getElementsByClassName("cell")];
  const resultDisplay = document.querySelector(".result");
  const resetBtn = document.querySelector(".reset");
  cells.forEach((cell) => cell.addEventListener("click", () => cellClicked(cell.getAttribute("data-cell"), cell)));
  resetBtn.addEventListener("click", resetGame);
  /*temp*/

  let turns = 1;
  let gameOver = false;

  /*temp*/

  function cellClicked(index, cell) {
    let symbol = turns % 2 != 0 ? "X" : "O";
    if (innerBoard[index] == undefined && gameOver == false && turns < 10) {
      innerBoard[index] = symbol;
      cell.innerHTML = symbol;
      //console.log(innerBoard);
      if (checkWin(symbol)) {
        console.log("win");
        resultDisplay.innerHTML = `Player ${symbol} WINS`;
        gameOver = true;
      } else {
        console.log("continue");
        turns++;
      }
    }

    if (turns == 10) {
      resultDisplay.innerHTML = `TIE`;
    }
  }

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

  function checkWin(symbol) {
    for (let i = 0; i < winCons.length; i++) {
      const row = winCons[i];
      if (row.every((element) => innerBoard[element] == symbol)) {
        return true;
      }
    }
    return false;
  }

  function resetGame() {
    turns = 1;
    gameOver = false;
    cells.forEach((cell) => (cell.innerHTML = ""));
    for (let i = 0; i < innerBoard.length; i++) {
      innerBoard[i] = undefined;
    }
    resultDisplay.innerHTML = null;
  }
})(document);
