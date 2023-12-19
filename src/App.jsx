import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { WINNING_COMBINATIONS } from "./winning_combinations";

const Board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function makeGameBoard(gameTurns, Board) {
  const gameBoard = [...Board.map((innerArray) => [...innerArray])];

  for (const turn of gameTurns) {
    const { button, player } = turn;
    const { row, col } = button;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  var winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstButton = gameBoard[combination[0].row][combination[0].column];
    const secondButton = gameBoard[combination[1].row][combination[1].column];
    const thirdButton = gameBoard[combination[2].row][combination[2].column];

    if (
      firstButton &&
      firstButton === secondButton &&
      firstButton === thirdButton
    ) {
      winner = players[firstButton];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState({ X: "Player1", O: "Player2" });
  const [gameTurns, setGameTurns] = useState([]);
  const gameBoard = makeGameBoard(gameTurns, Board);

  const winner = deriveWinner(gameBoard, players);
  let draw = gameTurns.length === 9 && !winner;
  const activePlayer = deriveActivePlayer(gameTurns);
  function handleActivePlayer(rowIndex, colIndex) {

    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { button: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }
  function handleRestart() {
    setGameTurns([]);
  }
  function handleNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handleNameChange}
          />
          <Player
            name="Player2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handleNameChange}
          />
        </ol>
        {(winner || draw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectButton={handleActivePlayer} board={gameBoard} />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App;
