const fs = require("fs");

function findForm(board, tofind) {
  for (let i = 0; i <= board.length - tofind.length; i++) {
    for (let j = 0; j <= board[0].length - tofind[0].length; j++) {
      let found = true;

      for (let k = 0; k < tofind.length; k++) {
        for (let l = 0; l < tofind[0].length; l++) {
          if (tofind[k][l] !== " " && board[i + k][j + l] !== tofind[k][l]) {
            found = false;
          }
        }
      }
      if (found) {
        console.log(`Trouvé !\nCoordonnées : ${j},${i}`);

        for (let m = 0; m < board.length; m++) {
          let row = "";
          for (let n = 0; n < board[0].length; n++) {
            if (
              found &&
              tofind[m - i] &&
              tofind[m - i][n - j] !== " " &&
              i <= m &&
              m < i + tofind.length &&
              j <= n &&
              n < j + tofind[0].length
            ) {
              row += board[m][n];
            } else {
              row += "-";
            }
          }
          console.log(row);
        }
        return;
      }
    }
  }
  console.log("Introuvable");
}

function getArgument() {
  const board = fs
    .readFileSync("board.txt", "utf-8")
    .trim()
    .split("\n")
    .map((row) => row.split(""));
  const toFind = fs
    .readFileSync(process.argv[3], "utf-8")
    .trim()
    .split("\n")
    .map((row) => row.split(""));
  return { board, toFind };
}

function resolution() {
  const myArgument = getArgument();
  const board = myArgument.board;
  const toFind = myArgument.toFind;
  findForm(board, toFind);
}

resolution();
