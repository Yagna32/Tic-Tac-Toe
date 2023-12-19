import { useState } from "react";

export default function Player({ name, symbol, isActive, onChangeName }) {
  const [newPlayer, setNewPlayer] = useState(name);
  const [selected, setSelected] = useState(false);
  function handleNewPlayer(event) {
    setNewPlayer(event.target.value);
  }
  function handleEdit(bool) {
    setSelected((bool) => !bool);
    if (selected) {
      onChangeName(symbol, newPlayer);
    }
  }
  let playerName = <span className="player-name">{newPlayer}</span>;

  if (selected) {
    playerName = (
      <input
        type="text"
        required
        value={newPlayer}
        onChange={handleNewPlayer}
      />
    );
  }
  return (
    <li className={isActive ? "active" : null}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={() => handleEdit(selected)}>
        {selected ? "Save" : "Edit"}
      </button>
    </li>
  );
}
