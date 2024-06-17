const fs = require("fs");

function findPositions(grid) {
  let start;
  let end;
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      if (grid[x][y] === "1") {
        start = [x, y];
      } else if (grid[x][y] === "2") {
        end = [x, y];
      }
    }
  }
  return { start, end };
}

function isValid(x, y, grid) {
  return (
    x >= 0 &&
    y >= 0 &&
    x < grid.length &&
    y < grid[0].length &&
    grid[x][y] !== "*" &&
    grid[x][y] !== "o"
  );
}

function findPath(x, y, end, stepCount, path, found, grid, bestPath) {
  if (found.value) {
    return;
  }
  if (x === end[0] && y === end[1]) {
    found.value = true;
    if (bestPath.length === 0 || path.length < bestPath.length) {
      bestPath.splice(0, bestPath.length, ...path);
    }
    return;
  }

  grid[x][y] = "o";
  path.push([x, y]);

  const directions = [
    { dx: 0, dy: 1 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: -1 },
    { dx: -1, dy: 0 },
  ];

  for (let i = 0; i < directions.length; i++) {
    let newX = x + directions[i].dx;
    let newY = y + directions[i].dy;
    if (isValid(newX, newY, grid)) {
      findPath(newX, newY, end, stepCount + 1, path, found, grid, bestPath);
    }
  }

  if (!found.value) {
    path.pop();
    grid[x][y] = " ";
  }
}

function solveLabyrinthe(grid) {
  const { start, end } = findPositions(grid);
  let path = [];
  let bestPath = [];
  let found = { value: false };

  findPath(start[0], start[1], end, 0, path, found, grid, bestPath);

  if (found.value) {
    return { path, found: true };
  } else {
    return { path: [], found: false };
  }
}

function displayLabyrinthe(grid, path) {
  if (path.length === 0) {
    console.log("aucun chemin trouvé");
    return;
  }

  for (let i = 0; i < path.length; i++) {
    let x = path[i][0];
    let y = path[i][1];
    grid[x][y] = "o";
  }

  console.log(`SORTIE ATEINTE EN ${path} COUP`);
  let solvedGrid = grid.map((row) => row.join("")).join("\n");
  solvedGrid = solvedGrid.replace(/\$/g, "");
  console.log(solvedGrid);

  for (let i = 0; i < path.length; i++) {
    let x = path[i][0];
    let y = path[i][1];
    grid[x][y] = " ";
  }
}

function getArgument() {
  const grid = fs
    .readFileSync(process.argv[2], "utf-8")
    .trim()
    .split("\n")
    .map((row) => row.split(""));
  return grid;
}

function resolution() {
  const myArgument = getArgument();
  const solvedLabyrinthe = solveLabyrinthe(myArgument);
  displayLabyrinthe(myArgument, solvedLabyrinthe.path);
}

resolution();
