

import React, { useEffect, useState } from 'react'
import { checkersService } from './../services/checkersService';


export default function Board() {
    const [board, setBoard] = useState([]);
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [turn, setTurn] = useState(true);


    useEffect(() => {
        checkersService.initGame();
        setBoard(checkersService.getBoard());
        console.log(board);
    }, [])

    useEffect(() => {
        console.log('SELECTED PIECE: ', selectedPiece);
    }, [selectedPiece])


    const selectPiece = (cell) => {
        resetSelections();
        cell.piece.isSelected = true;
        setSelectedPiece(cell.piece);
        if (turn) {
            checkersService.getPossibleMovesBlack(cell.piece);
            setTurn(false);
        } else {
            checkersService.getPossibleMovesRed(cell.piece);
            setTurn(true);
        }
    }

    const movePiece = (cell) => {
        if (selectedPiece) {
            checkersService.move(selectedPiece, cell);
            resetSelections();
            setSelectedPiece(null);
        }
    }

    const resetSelections = () => {
        checkersService.deselect();
        checkersService.resetPossibleMoves();
    }

    return (
        <div className="board">
            {board.map((row, idx) => {
                return (
                    <div className="row" key={idx}>
                        <div className="flex">
                            {row.map(cell => {
                                return (
                                    <div className="cell flex" style={{
                                        backgroundColor: cell.possibleMove ? 'blue' : cell.color,
                                        cursor: cell.possibleMove ? 'pointer' : null
                                    }} key={cell.id}
                                        onClick={() => movePiece(cell)}>
                                        <p className="cell-id">{cell.id}</p>
                                        {cell.piece &&
                                            <div className="piece flex" style={{
                                                backgroundColor: cell.piece.color,
                                                border: cell.piece.isSelected ? '4px solid blue ' : null,

                                            }}
                                                onClick={() => selectPiece(cell)}>
                                                {cell.piece.id}
                                            </div>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
