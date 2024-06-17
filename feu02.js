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

function checkArguments() {
  if (process.argv.length < 4) {
    console.log("tu a mis trop d'arguments, mets en deux ");
    process.exit(1);
  }
}

function validateBoardAndForm(board, toFind) {
  if (board.length === 0 || board[0].length === 0) {
    console.log("le plateau ne peut pas etre vide");
    process.exit(1);
  }
  if (toFind.length === 0 || toFind[0].length === 0) {
    console.log("la forme a rechercher ne peut pas être vide");
    process.exit(1);
  }
  if (board.length < toFind.length || board[0].length < toFind[0].length) {
    console.log("La forme a touver est plus grande que le plateau");
    process.exit(1);
  }
}

function isArgumentExist() {
  if (!fs.existsSync(process.argv[2])) {
    console.error("Fichier de plateau introuvable :");
    process.exit(1);
  }
  if (!fs.existsSync(process.argv[3])) {
    console.error("Fichier de forme introuvable :");
    process.exit(1);
  }
}

function getArgument() {
  checkArguments();

  const board = fs
    .readFileSync(process.argv[2], "utf-8")
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
  validateBoardAndForm(myArgument.board, myArgument.toFind);
  findForm(myArgument.board, myArgument.toFind);
}

resolution();
