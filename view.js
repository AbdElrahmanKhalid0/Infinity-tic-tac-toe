const cellsNumElm = document.querySelector("#cells");
const boardElm = document.querySelector(".board");
const BOARDWIDTH = +window.getComputedStyle(boardElm)['width'].replace('px','');
const BOARDHEIGHT = +window.getComputedStyle(boardElm)['height'].replace('px','');
const enterInformationForm = document.querySelector("#gameInformationForm");
const statusMessageElm = document.querySelector(".status-message");
const retryBtnElm = document.querySelector("#retry");
// let X =
//   "<svg width = '166.66' height='166.66'><line x1='10.66' y1='10.66' x2='156' y2='156' stroke='#000' stroke-width='10' stroke-linecap='round'/><line x1='156' y1='10.66' x2='10.66' y2='156' stroke='#000' stroke-width='10' stroke-linecap='round'/></svg>";
// let O =
//   "<svg width = '166.66' height='166.66'><circle width='100' height='100' r='50' cx='83.33' cy='83.33' fill='none' stroke='#000' stroke-width='15'/></svg>";
let playingBoard = [];

enterInformationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector(".game").style.display = "flex";
  InitializeBoard(cellsNumElm.value);
  enterInformationForm.remove();
});

const InitializeBoard = (cellsNum) => {
  const cellWidth = BOARDWIDTH / cellsNum;
  const cellHeight = BOARDHEIGHT / cellsNum;
  // in here the strokeWidth for the lines will be the (cellWidth * 10 / 166.66) because in the original
  // version when the cellWidth was 166.66 the stroeWidth was 10, and that is also with the circle but
  // instead of 10 it was 15 so its stroke will be (cellWidth * 15 / 166.66)
  X = `<svg width = '${cellWidth}' height='${cellHeight}'><line x1='10' y1='10' x2='${
    cellWidth - 10
  }' y2='${cellHeight - 10}' stroke='#000' stroke-width='${
    (cellWidth * 10) / 166.66
  }' stroke-linecap='round'/><line x1='${cellWidth - 10}' y1='10' x2='10' y2='${
    cellHeight - 10
  }' stroke='#000' stroke-width='${
    (cellWidth * 10) / 166.66
  }' stroke-linecap='round'/></svg>`;
  O = `<svg width = '${cellWidth}' height='${cellHeight}'><circle width='${
    (cellWidth * 70) / 100
  }' height='${(cellWidth * 70) / 100}' r='${(cellWidth * 70) / 100 / 2}' cx='${
    cellWidth / 2
  }' cy='${cellHeight / 2}' fill='none' stroke='#000' stroke-width='${
    (cellWidth * 15) / 166.66
  }'/></svg>`;
  for (let row = 0; row < cellsNum; row++) {
    playingBoard.push([]);

    const rowElm = document.createElement("div");
    rowElm.classList.add("row");
    rowElm.style.height = `calc(100% / ${cellsNum})`;
    for (let cell = 0; cell < cellsNum; cell++) {
      playingBoard[row].push("");

      const cellElm = document.createElement("div");
      cellElm.classList.add("cell");
      cellElm.style.width = `calc(100% / ${cellsNum})`;
      rowElm.appendChild(cellElm);
    }
    boardElm.appendChild(rowElm);
  }
  console.log(playingBoard);
  addClickFunctionality(boardElm);
  render(playingBoard, boardElm);

  // in case o is first
  // findBestMove(playingBoard, true)
};
