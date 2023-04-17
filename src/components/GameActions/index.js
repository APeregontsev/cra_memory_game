import ActionsButtons from "./ActionButtons";
import "./style.css";

const GameActions = ({ onRestart, onNewGame }) => {
  return (
    <div className="title-wrapper">
      <div className="title-text">memory</div>

      <ActionsButtons textNewGame={"New Game"} onRestart={onRestart} onNewGame={onNewGame} />
    </div>
  );
};

export default GameActions;
