const fs = require("fs");

function valueIsValid(x, y, value, grid) {
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    if (grid[y][rowIndex] === value) {
      return false;
    }
  }
  for (let colIndex = 0; colIndex < grid.length; colIndex++) {
    // j'ai renommer les variable qui etait de base des letres en vrai mot en sah jsp si c'est beacoup plus propre ?

    if (grid[colIndex][x] === value) {
      return false;
    }
  }
  let subGridStartCol = ((x / 3) | 0) * 3;
  let subGridStartRow = ((y / 3) | 0) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[subGridStartRow + i][subGridStartCol + j] === value) {
        return false;
      }
    }
  }
  return true;
}

function solveSudoku(grid) {
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (grid[y][x] === ".") {
        for (let value = 1; value <= 9; value++) {
          if (valueIsValid(x, y, value, grid)) {
            grid[y][x] = value;
            if (solveSudoku(grid)) {
              return true;
            }
          }
        }
        return false;
      }
    }
  }
  return true;
}

function printGrid(grid) {
  for (let i = 0; i < 9; i++) {
    let row = "";
    for (let j = 0; j < 9; j++) {
      row += grid[i][j] + " ";
    }
    console.log(row);
  }
}

function getArgument() {
  const sudokuGrid = fs
    .readFileSync(process.argv[2], "utf-8")
    .trim()
    .split("\n")
    .map((row) => row.split(""));
  return sudokuGrid;
}

function resolution() {
  const myArgument = getArgument();
  solveSudoku(myArgument);
  printGrid(myArgument);
}

resolution();
