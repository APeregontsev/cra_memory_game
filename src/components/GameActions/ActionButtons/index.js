import classNames from "classnames";
import "./style.css";

const ActionsButtons = ({ onRestart, onNewGame, textNewGame }) => {
  return (
    <div className={classNames("buttons-wrapper", { final: textNewGame === "Setup New Game" })}>
      <button
        className={classNames(
          { "restart-btn": textNewGame === "New Game" },
          { restart_btn: textNewGame === "Setup New Game" }
        )}
        onClick={onRestart}
      >
        Restart
      </button>
      <button
        className={classNames(
          { "new_game-btn": textNewGame === "New Game" },
          { setup_btn: textNewGame === "Setup New Game" }
        )}
        onClick={onNewGame}
      >
        {textNewGame}
      </button>
    </div>
  );
};

export default ActionsButtons;
