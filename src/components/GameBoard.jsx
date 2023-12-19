export default function GameBoard({ onSelectButton, board }) {
  // const [gameBoard, setGameBoard] = useState(Board);
  // function handleBoard(rowIndex, colIndex) {
  //   setGameBoard((gameBoard) => {
  //     const updatedBoard = [...gameBoard.map((innerArray) => [...innerArray])];
  //     updatedBoard[rowIndex][colIndex] = active;

  //     return updatedBoard;
  //   });
  //   onSelectButton();
  // }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((col, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectButton(rowIndex, colIndex)}
                  disabled={col !== null}
                >
                  {col}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
