import Context from "../../Context";
import RadioBtn from "../../components/RadioButtons";
import "./style.css";
import { useContext } from "react";

const StartGame = ({ setGameStarted, setGameProps, gameProps }) => {
  const { setNavigation } = useContext(Context);

  function startGameBtnHandler() {
    if (allFieldsAreValid) {
      setNavigation(false);
      setGameStarted(true);
    }
  }

  const themeIsEmpty = gameProps.theme === null;
  const playersIsEmpty = gameProps.numberOfPlayers === null;
  const gridIsEmpty = gameProps.gridSize === null;

  const allFieldsAreValid = !themeIsEmpty && !playersIsEmpty && !gridIsEmpty;

  return (
    <div className="start-game-wrapper">
      <div className="game-title">memory</div>

      <div className="menu-card-wrapper">
        <div className="select-wrapper">
          <div className="title-wrapper-menu">
            <div className="title">Select Theme</div>
            {themeIsEmpty && <div className="title-warning-text"></div>}
          </div>
          <div className="items">
            {[
              { name: "theme", id: "type_numbers", value: "numbers" },
              { name: "theme", id: "type_icons", value: "icons" },
            ].map((button, index) => {
              return (
                <RadioBtn
                  key={index}
                  name={button.name}
                  id={button.id}
                  value={button.value}
                  setGameProps={setGameProps}
                />
              );
            })}
          </div>
        </div>
        <div className="select-wrapper">
          <div className="title-wrapper-menu">
            <div className="title">Number of Players</div>
            {playersIsEmpty && <div className="title-warning-text"></div>}
          </div>

          <div className="items">
            {[
              { name: "numberOfPlayers", id: "type_1", value: "1" },
              { name: "numberOfPlayers", id: "type_2", value: "2" },
              { name: "numberOfPlayers", id: "type_3", value: "3" },
              { name: "numberOfPlayers", id: "type_4", value: "4" },
            ].map((button, index) => {
              return (
                <RadioBtn
                  key={index}
                  name={button.name}
                  id={button.id}
                  value={button.value}
                  setGameProps={setGameProps}
                />
              );
            })}
          </div>
        </div>
        <div className="select-wrapper">
          <div className="title-wrapper-menu">
            <div className="title">Grid Size</div>
            {gridIsEmpty && <div className="title-warning-text"></div>}
          </div>

          <div className="items">
            {[
              { name: "gridSize", id: "type_4x4", value: "4x4" },
              { name: "gridSize", id: "type_6x6", value: "6x6" },
            ].map((button, index) => {
              return (
                <RadioBtn
                  key={index}
                  name={button.name}
                  id={button.id}
                  value={button.value}
                  setGameProps={setGameProps}
                />
              );
            })}
          </div>
        </div>
        <div className="select-wrapper">
          <button className="start-game" onClick={startGameBtnHandler}>
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartGame;
