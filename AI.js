const findBestMove = (board, oIsFirst = false) => {
  let bestMove;
  let bestScore = -Infinity;
  for (let row = 0; row < board.length; row++) {
    for (let cell = 0; cell < board[row].length; cell++) {
      if (board[row][cell] === "") {
        board[row][cell] = o;
        let score;
        if (oIsFirst) {
          score = minimax(board, 0, true);
        } else {
          score = minimax(board, 0, false);
        }
        board[row][cell] = "";
        // debugging
        // console.log(row, cell);
        // console.log(score);
        if (score > bestScore) {
          bestScore = score;
          bestMove = { row, cell };
        }
      }
    }
  }
  // debugging
  // console.log(bestScore, bestMove)
  if (bestMove) {
    board[bestMove.row][bestMove.cell] = o;
  }
  render(board, boardElm);
  if (isBoardFull(board)) {
    statusMessageElm.innerText = `the game is draw`;
    retryBtnElm.style.display = "block";
  }
  if (checkWin(board)) {
    statusMessageElm.innerText = `${checkWin(playingBoard)} won`;
    retryBtnElm.style.display = "block";
  }
  changePlayer();
};

const minimax = (playingBoard, depth, isMaximizingPlayer) => {
  let board = playingBoard.map((row) => row);
  let score;
  if (checkWin(board)) {
    score = checkWin(board) === o ? 1 : -1;
    return score;
  }
  if (isBoardFull(board) && !checkWin(board)) {
    score = 0;
    return score;
  }
  // is O (the computer)
  if (isMaximizingPlayer) {
    let bestScore = -Infinity;
    for (let row = 0; row < board.length; row++) {
      for (let cell = 0; cell < board[row].length; cell++) {
        // is cell avaliable
        if (board[row][cell] === "") {
          board[row][cell] = o;
          score = minimax(board, depth + 1, false);
          bestScore = Math.max(score, bestScore);
          board[row][cell] = "";
        }
      }
    }
    return bestScore;
  }
  // is minimizing player X (the human)
  else {
    let bestScore = Infinity;
    for (let row = 0; row < board.length; row++) {
      for (let cell = 0; cell < board[row].length; cell++) {
        // is cell avaliable
        if (board[row][cell] === "") {
          board[row][cell] = x;
          score = minimax(board, depth + 1, true);
          bestScore = Math.min(score, bestScore);
          board[row][cell] = "";
        }
      }
    }
    return bestScore;
  }
};
