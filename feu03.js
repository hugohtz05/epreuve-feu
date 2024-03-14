const fs = require('fs');

function solveSudoku(board) {
    const emptyCell = findEmptyCell(board);
    if (!emptyCell) {
        return true; 
    }

    const { row, col } = emptyCell;

    for (let num = 1; num <= board.length; num++) {
        if (isValidMove(board, row, col, num)) {
            board[row][col] = num.toString();
            if (solveSudoku(board)) {
                return true;
            }
            board[row][col] = '.';
        }
    }
    return false;
}

function findEmptyCell(board) {
    for (let i = 0; i < board.length ; i++) {
        for (let j = 0; j < board; j++) {
            if (board[i][j] === '.') {
                return { row: i, col: j };
            }
        }
    }
    return null;
}

function isValidMove(board, row, col, num) {
    return (
        isRowValid(board, row, num) &&
        isColValid(board, col, num) &&
        isBoxValid(board, row - (row % 3), col - (col % 3), num)
    );
}

function isRowValid(board, row, num) {
    return !board[row].includes(num.toString());
}

function isColValid(board, col, num) {
    for (let i = 0; i < board.length; i++) {
        if (board[i][col] === num.toString()) {
            return false;
        }
    }
    return true;
}

function isBoxValid(board, startRow, startCol, num) {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row + startRow][col + startCol] === num.toString()) {
                return false;
            }
        }
    }
    return true;
}

function getArgument() {
    const sudokuGrid = fs.readFileSync('s.txt', 'utf-8').trim().split('\n').map(row => row.split(''));
    return { sudokuGrid };
}

function printSudoku(board) {
    for (let row of board) {
        console.log(row.join(' '));
    }
}

function resolution() {
    const myArgument = getArgument();
    const sudokuGrid = myArgument.sudokuGrid;
    solveSudoku(sudokuGrid)
    printSudoku(sudokuGrid);
}

resolution();