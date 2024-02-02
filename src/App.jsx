import React from 'react'
import { useState, useEffect } from 'react'

import './App.css'
import Board from './Board'
import GameOver from './GameOver'
import GameState from './GameState'
import Reset from './Reset'


const player_x = "X"
const player_y = "O"

const winningCombinations = [
  //Rows
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },

  //Columns
  { combo: [0, 3, 6], strikeClass: "strike-column-1" },
  { combo: [1, 4, 7], strikeClass: "strike-column-2" },
  { combo: [2, 5, 8], strikeClass: "strike-column-3" },

  //Diagonals
  { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
  { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
];

const checkWinner = (tiles, setStrikeClass, setGameState) => {
  for (const { combo, strikeClass } of winningCombinations) {
    const tileValue1 = tiles[combo[0]];
    const tileValue2 = tiles[combo[1]];
    const tileValue3 = tiles[combo[2]];

    if (
      tileValue1 !== null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      setStrikeClass(strikeClass);
      if (tileValue1 === player_x) {
        setGameState(GameState.playerXWins);
      } else {
        setGameState(GameState.playerOWins);
      }
      return;
    }


    const areAllTilesFilledIn = tiles.every((tile) => tile !== null);
    if (areAllTilesFilledIn) {
      setGameState(GameState.draw);

    }
  }
}


const App = () => {
  const [tiles, setTiles] = useState(Array(9).fill(null))
  const [playerTurn, setPlayerTurn] = useState(player_x)
  const [strikeClass, setStrikeClass] = useState()
  const [gameState, setGameState] = useState(GameState.inProgress);
  const [xScore, setXScore] = useState(0);
  const [yScore, setYScore] = useState(0);

  const playAgainClick = () => {
    setGameState(GameState.inProgress)
    setTiles(Array(9).fill(null))
    setPlayerTurn(player_x)
    setStrikeClass(null)
  }
  const resetClick = () => {
    setGameState(GameState.inProgress)
    setTiles(Array(9).fill(null))
    setPlayerTurn(player_x)
    setStrikeClass(null)
    setXScore(0)
    setYScore(0)
  }
  useEffect(() => {
    function scores() {
      if (gameState === GameState.playerXWins) {
        setXScore(prevXScore => prevXScore + 1)
      }
      if (gameState === GameState.playerOWins) {
        setYScore(prevYScore => prevYScore + 1)
      }
    }
    scores()
  }, [gameState])

  useEffect(() => {
    checkWinner(tiles, setStrikeClass, setGameState);
  }, [tiles]);

  const handleClick = (index) => {
    if (gameState !== GameState.inProgress) {
      return;
    }

    if (tiles[index] !== null) {
      return
    }

    const newTiles = [...tiles]
    newTiles[index] = playerTurn;
    setTiles(newTiles)
    if (playerTurn === player_x) {
      setPlayerTurn(player_y)
    }
    else {
      setPlayerTurn(player_x)
    }
  }

  return (
    <>
      <h1 className='header'>Tic Tac Toe</h1>
      <Board strikeClass={strikeClass} playerTurn={playerTurn} tiles={tiles} onTileClick={handleClick} />
      <GameOver gameState={gameState} />
      <Reset playAgain={playAgainClick} xScore={xScore} yScore={yScore} onReset={resetClick}/>
    </>
  )
}

export default App