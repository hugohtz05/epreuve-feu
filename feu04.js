const fs = require("fs");

function isEmpty(grid, x, y) {
  return (
    x >= 0 &&
    x < grid[0].length &&
    y >= 0 &&
    y < grid.length &&
    grid[y][x] === "."
  );
}

function findLargestSquare(grid) {
  let largestX = 0;
  let largestY = 0;
  let largestSize = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (isEmpty(grid, x, y)) {
        let size = 1;
        let isSquare = true;
        while (
          isSquare &&
          x + size < grid[0].length &&
          y + size < grid.length
        ) {
          for (let i = 0; i <= size; i++) {
            if (
              !isEmpty(grid, x + size, y + i) ||
              !isEmpty(grid, x + i, y + size)
            ) {
              isSquare = false;
              break;
            }
          }
          if (isSquare) {
            size++;
          }
        }
        if (size > largestSize) {
          largestX = x;
          largestY = y;
          largestSize = size;
        }
      }
    }
  }
  return { x: largestX, y: largestY, size: largestSize };
}

function displayModifiedGrid(grid, largestSquare) {
  for (let i = largestSquare.y; i < largestSquare.y + largestSquare.size; i++) {
    for (
      let l = largestSquare.x;
      l < largestSquare.x + largestSquare.size;
      l++
    ) {
      grid[i][l] = "o";
    }
  }
  console.log(grid.map((row) => row.join("")).join("\n"));
}

function checkArguments() {
  if (process.argv.length < 3) {
    console.log("tu a mis trop d'arguments, mets en un seul ");
    process.exit(1);
  }
}

function isValidGridFormat(grid) {
  if (grid.length !== grid[0].length) {
    console.error("le format de la grille n'est pas valide");
    process.exit(1);
  }
}

function validateGridCharacters(grid) {
  const allowedCharacters = ["x", ".", "o"];

  const flatGrid = grid.flat();
  for (let char of flatGrid) {
    if (!allowedCharacters.includes(char)) {
      console.error(
        `Le caractere "${char}" n'est pas autoriser dans la grille.`
      );
      process.exit(1);
    }
  }
}

function isArgumentExist() {
  if (!fs.existsSync(process.argv[2])) {
    console.error("Fichier de plateau introuvable ");
    process.exit(1);
  }
}

function getArgument() {
  isArgumentExist();
  validateGridCharacters();
  isValidGridFormat();
  checkArguments();
  const grid = fs
    .readFileSync(process.argv[2], "utf-8")
    .trim()
    .split("\n")
    .map((row) => row.split(""));
  return grid;
}

function resolution() {
  const myArgument = getArgument();
  const largestSquare = findLargestSquare(myArgument);
  displayModifiedGrid(myArgument, largestSquare);
}

resolution();
