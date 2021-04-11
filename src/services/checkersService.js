

export const checkersService = {
    createBoard,
    getBoard,
    initGame,
    deselect,
    getPossibleMovesBlack,
    getPossibleMovesRed,
    resetPossibleMoves,
    move
}

var gBoard = [];
var gRemove = []
const SIZE = 8;

function initGame() {
    createBoard();
}


function getBoard() {
    return gBoard;
}


function createBoard() {
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < SIZE; j++) {
            if ((i + j + 1) % 2 === 0) {
                var redCell = {
                    id: 'c' + i + j,
                    j,
                    i,
                    color: '#3E3E3E',
                    possibleMove: false,
                    type: 'red'
                }
                board[i][j] = redCell
            }
            else {
                var blackCell = {
                    id: 'c' + i + j,
                    posX: j,
                    posY: i,
                    color: '#E5BDBD',
                    possibleMove: false,
                    type: 'black'
                }
                board[i][j] = blackCell;
            }
        }
    }
    gBoard = board;
    placePieces(i, j);
    return board;
}


function placePieces() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < SIZE; j++) {
            if ((j + i + 1) % 2 === 0) {
                gBoard[i][j].piece = _placeRedPieces(i, j);
            }
        }
    }
    for (let i = 5; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            if ((j + i + 1) % 2 === 0) {
                gBoard[i][j].piece = _placeBlackPieces(i, j);
            }
        }
    }
}

function _placeRedPieces(i, j) {
    return {
        id: 'p' + i + j,
        color: 'red',
        type: 'red',
        j,
        i,
        isSelected: false,
    }
}
function _placeBlackPieces(i, j) {
    return {
        id: 'p' + i + j,
        color: '#8F8F8F',
        type: 'black',
        j,
        i,
        isSelected: false,
    }
}


function deselect() {
    gBoard.forEach(row => {
        row.forEach(cell => {
            if (cell.piece) {
                if (cell.piece.isSelected) cell.piece.isSelected = false;
            }
        })
    })
}

function resetPossibleMoves() {
    gBoard.forEach(row => {
        row.forEach(cell => {
            cell.possibleMove = false;
        })
    })
}

function getPossibleMovesBlack(piece) {
    if (piece.type === 'black') {
        for (var i = piece.i - 1; i < piece.i; i++) {
            for (var j = piece.j - 1; j < piece.j + 2; j++) {
                if (j >= 0 && j < SIZE && !gBoard[i][j].piece && gBoard[i][j].type !== 'black') {
                    gBoard[i][j].possibleMove = true;
                }
                if (j >= 0 && j < SIZE && gBoard[i][j].piece && gBoard[i][j].piece.type === 'red') {
                    if (piece.j > j) {
                        gBoard[i - 1][j - 1].possibleMove = true;
                        gRemove.push(gBoard[i][j].piece);
                    }
                    else {
                        gBoard[i - 1][j + 1].possibleMove = true;
                        gRemove.push(gBoard[i][j].piece);
                    }
                }
            }
        }
    }
}
function getPossibleMovesRed(piece) {
    if (piece.type === 'red') {
        for (var i = piece.i + 1; i < piece.i + 2; i++) {
            for (var j = piece.j - 1; j < piece.j + 2; j++) {
                if (j >= 0 && j < SIZE && !gBoard[i][j].piece && gBoard[i][j].type !== 'black') {
                    gBoard[i][j].possibleMove = true;
                }
                if (j >= 0 && j < SIZE && gBoard[i][j].piece && gBoard[i][j].piece.type === 'black') {
                    if (piece.j > j) {
                        gBoard[i + 1][j - 1].possibleMove = true;
                        gRemove.push(gBoard[i][j].piece);
                    }
                    else {
                        gBoard[i + 1][j + 1].possibleMove = true;
                        gRemove.push(gBoard[i][j].piece);
                    }
                }
            }
        }
    }
}



function move(piece, cell) {
    if (cell.possibleMove) {
        delete gBoard[piece.i][piece.j].piece;
        gBoard[cell.i][cell.j].piece = piece;
        gBoard[cell.i][cell.j].piece.i = cell.i
        gBoard[cell.i][cell.j].piece.j = cell.j
        if (gRemove.length) {
            delete gBoard[gRemove[0].i][gRemove[0].j].piece;
            gRemove = [];
        }
    }
}

function checkForPointBlack(piece) {

}