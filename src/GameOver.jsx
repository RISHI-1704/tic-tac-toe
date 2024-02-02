import React from "react";
import GameState from "./GameState";
import './App.css'

function GameOver({ gameState }) {
    switch (gameState) {
        case GameState.inProgress:
            return <></>;
        case GameState.playerOWins:
            return <div className="game-over">Winner : Player O </div>;
        case GameState.playerXWins:
            return <div className="game-over">Winner : Player X </div>;
        case GameState.draw:
            return <div className="game-over">Draw</div>;
        default:
            return <></>;
    }
}

export default GameOver;