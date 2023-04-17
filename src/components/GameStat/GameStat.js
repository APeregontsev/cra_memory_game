import "./style.css";
import { secondsToTime } from "./../../functions/secToMinFormat.js";

const GameStat = ({ stat, secondsPassed }) => {
  return (
    <div className="game-stat-wrapper">
      <div className="time-wrapper">
        <div className="text">Time</div>
        <div className="number">{secondsToTime(secondsPassed)}</div>
      </div>

      <div className="moves-wrapper">
        <div className="text">Moves</div>
        <div className="number">{stat.moves}</div>
      </div>
    </div>
  );
};

export default GameStat;
