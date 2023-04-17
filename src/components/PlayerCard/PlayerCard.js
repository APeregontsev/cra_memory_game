import "./style.css";

const PlayerCard = ({ playerData }) => {
  return (
    <div className={playerData.activeTurn ? "player-card-wrapper active" : "player-card-wrapper"}>
      <div className="player-text">Player {playerData.id}</div>
      <div className="player-score">{playerData.pairs}</div>
    </div>
  );
};

export default PlayerCard;
