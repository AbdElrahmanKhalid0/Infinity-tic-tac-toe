const boardElm = document.querySelector(".board");
const statusMessageElm = document.querySelector(".status-message");
const retryBtnElm = document.querySelector("#retry");
let playingBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
const X =
  "<svg width = '166.66' height='166.66'><line x1='10.66' y1='10.66' x2='156' y2='156' stroke='#000' stroke-width='10' stroke-linecap='round'/><line x1='156' y1='10.66' x2='10.66' y2='156' stroke='#000' stroke-width='10' stroke-linecap='round'/></svg>";
const O =
  "<svg width = '166.66' height='166.66'><circle width='100' height='100' r='50' cx='83.33' cy='83.33' fill='none' stroke='#000' stroke-width='15'/></svg>";
const x = "x";
const o = "o";

const render = (board, boardElm) => {
  let row;
  for (let row = 0; row < board.length; row++) {
    rowCellsElms = boardElm.querySelectorAll(".row")[`${row}`].children;
    for (let cell = 0; cell < board[row].length; cell++) {
      if (board[row][cell] === x) {
        rowCellsElms[cell].innerHTML = X;
      } else if (board[row][cell] === o) {
        rowCellsElms[cell].innerHTML = O;
      } else {
        rowCellsElms[cell].innerHTML = "";
      }
    }
  }
};

const checkRow = (row) => {
  for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
    if (
      (row[cellIndex] !== row[cellIndex + 1] &&
        row[cellIndex + 1] !== undefined) ||
      row[cellIndex] === ""
    ) {
      return false;
    }
  }
  // in this case all the array elements are the same so it will return the first element that is equal to
  // all the other elements and that is the winning player
  return row[0];
};

const reverse2DArray = (array) => {
  let newArray = [];
  for (let rowIndex = 0; rowIndex < array.length; rowIndex++) {
    for (let cellIndex = 0; cellIndex < array[rowIndex].length; cellIndex++) {
      if (!newArray[cellIndex]) {
        newArray.push([]);
      }
      newArray[rowIndex][cellIndex] = array[cellIndex][rowIndex];
    }
  }
  return newArray;
};

const checkWin = (board) => {
  const cellsNum = board.length;
  // checking for row win
  for (let rowIndex = 0; rowIndex < cellsNum; rowIndex++) {
    if (checkRow(board[rowIndex])) {
      return checkRow(board[rowIndex]);
    }
  }
  // checking for column win
  const reversedBoard = reverse2DArray(board);
  for (let rowIndex = 0; rowIndex < cellsNum; rowIndex++) {
    if (checkRow(reversedBoard[rowIndex])) {
      return checkRow(reversedBoard[rowIndex]);
    }
  }
  // checking for cross win
  const firstCrossArray = board.reduce(
    (final1DArray, current1DArray, current1DArrayIndex) => {
      final1DArray.push(current1DArray[current1DArrayIndex]);
      return final1DArray;
    },
    []
  );
  const secondCrossArray = board.reduce(
    (final1DArray, current1DArray, current1DArrayIndex) => {
      final1DArray.push(
        current1DArray[current1DArray.length - 1 - current1DArrayIndex]
      );
      return final1DArray;
    },
    []
  );
  if (checkRow(firstCrossArray)) {
    return checkRow(firstCrossArray);
  }
  if (checkRow(secondCrossArray)) {
    return checkRow(secondCrossArray);
  }
  return false;
};

const isBoardFull = (board) => {
  for (row of board) {
    for (cell of row) {
      if (cell === "") {
        return false;
      }
    }
  }
  return true;
};

let currentPlayer = x;
// in case o is first
// let currentPlayer = o;

const changePlayer = () => {
  currentPlayer = currentPlayer === x ? o : x;
};

const erasePlayingBoard = () => {
  for (let row = 0; row < playingBoard.length; row++) {
    for (let cell = 0; cell < playingBoard[row].length; cell++) {
      playingBoard[row][cell] = "";
    }
  }
};
