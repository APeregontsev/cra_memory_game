import PlayerCard from "../PlayerCard/PlayerCard";
import "./style.css";

const MultipleGameStat = ({ gameState }) => {
  return (
    <div className="players-number-wrapper">
      {gameState.players.map((player) => (
        <PlayerCard key={player.id} playerData={player} />
      ))}
    </div>
  );
};

export default MultipleGameStat;
