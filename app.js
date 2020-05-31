const playRandomly = () => {
  let randomRow = +(Math.random() * (playingBoard.length - 1)).toFixed();
  let randomCell = +(Math.random() * (playingBoard[0].length - 1)).toFixed();
  if (playingBoard[randomRow][randomCell]) {
    playRandomly();
    return;
  }
  playingBoard[randomRow][randomCell] = currentPlayer;
  render(playingBoard, boardElm);
  if (checkWin(playingBoard)) {
    statusMessageElm.innerText = `${checkWin(playingBoard)} won`;
    retryBtnElm.style.display = "block";
  }
  changePlayer();
};

const addClickFunctionality = (board) => {
  for (let row = 0; row < board.children.length; row++) {
    for (let cell = 0; cell < board.children[row].children.length; cell++) {
      board.children[row].children[cell].addEventListener("click", () => {
        if (!isBoardFull(playingBoard) && !checkWin(playingBoard)) {
          // not replacing the content in the cell if there was content in it
          if (playingBoard[row][cell]) {
            return;
          }
          playingBoard[row][cell] = currentPlayer;
          render(playingBoard, boardElm);
          if (checkWin(playingBoard)) {
            statusMessageElm.innerText = `${checkWin(playingBoard)} won`;
            retryBtnElm.style.display = "block";
            return;
          }
          changePlayer();
        }
        if (isBoardFull(playingBoard) && !checkWin(playingBoard)) {
          statusMessageElm.innerText = `the game is draw`;
          retryBtnElm.style.display = "block";
          return;
        }
        if (currentPlayer === o) {
          // playRandomly();
          findBestMove(playingBoard);
        }
      });
    }
  }
};

retryBtnElm.addEventListener("click", function () {
  erasePlayingBoard();
  currentPlayer = x;
  // in case o is first
  // currentPlayer = o;
  // findBestMove(playingBoard, true);
  render(playingBoard, boardElm);
  this.style.display = "none";
  statusMessageElm.innerText = "";
});

addClickFunctionality(boardElm);
render(playingBoard, boardElm);
// in case o is first
// findBestMove(playingBoard, true)
