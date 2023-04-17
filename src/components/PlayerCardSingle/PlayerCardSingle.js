import "./style.css";
import { secondsToTime } from "./../../functions/secToMinFormat.js";

const PlayerCardSingle = ({ secondsPassed, moves }) => {
  return (
    <>
      <div className="player-card-wrapper container">
        <div className="player-text">Time Elapsed</div>
        <div className="player-score">
          <span>{secondsToTime(secondsPassed)}</span>
        </div>
      </div>

      <div className="player-card-wrapper container">
        <div className="player-text">Moves Taken</div>
        <div className="player-score">
          <span>{moves} </span>
        </div>
      </div>
    </>
  );
};

export default PlayerCardSingle;
