export default function Log({ gameTurns }) {
  return (
    <ol id="log">
      {gameTurns.map((turn) => (
        <li key={`${turn.button.row}${turn.button.col}`}>
          {turn.player} selected {turn.button.row},{turn.button.col}
        </li>
      ))}
    </ol>
  );
}
