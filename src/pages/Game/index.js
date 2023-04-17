import classNames from "classnames";
import { useState, useContext } from "react";
import Context from "../../Context";
import GameActions from "../../components/GameActions";
import GameStat from "../../components/GameStat/GameStat";
import MultipleGameStat from "../../components/MultipleGameStat";
import PlayingItem from "../../components/PlayingItem/PlayingItem";
import "./style.css";

import { useTimer } from "./../../Timer/";
import FinalCard from "../../components/FinalCard";

import {
  playersCreation,
  playingAreaFulfillment,
  turnHandler,
} from "../../functions/gameplayFunctions.js";

const Game = ({ setGameStarted, gameProps, setGameProps }) => {
  const { setNavigation } = useContext(Context);

  function newGameBtnHandler() {
    setGameProps({ theme: null, numberOfPlayers: null, gridSize: null });
    setGameStarted(false);
    setNavigation(true);
  }

  function restartBtnHandler() {
    timer.stopAndClear();

    setGameState(() => {
      const resetState = {
        playingArea: playingAreaFulfillment(areaSize),
        firstClick: null,
        activePlayer: 1,
        players: playersCreation(
          gameProps.numberOfPlayers === null ? 1 : gameProps.numberOfPlayers
        ),
        secondsPassed: 0,
        finished: false,
      };

      return { ...resetState };
    });
  }

  // Определим размер игрового поля если 4*4 тогда 16, если 6*6 тогда 36
  const areaSize = gameProps.gridSize === "6x6" ? 36 : 16;

  const [gameState, setGameState] = useState({
    playingArea: playingAreaFulfillment(areaSize),
    firstClick: null,
    activePlayer: 1,
    finished: false,
    secondsPassed: 0,

    players: playersCreation(gameProps.numberOfPlayers === null ? 1 : gameProps.numberOfPlayers),
  });

  console.log("playingArea", gameState);

  // инициализируем Timer

  const timer = useTimer();

  const showSinglePlayerStats =
    gameProps.numberOfPlayers === 1 || gameProps.numberOfPlayers === null;

  return (
    <>
      <div className={classNames("game-card-wrapper ", { opacity: gameState.finished })}>
        <GameActions onRestart={restartBtnHandler} onNewGame={newGameBtnHandler} />

        <div
          className={classNames("playing-zone-wrapper", {
            small_zone: gameProps.gridSize !== "6x6",
          })}
        >
          {gameState.playingArea.map((item, index) => {
            return (
              <PlayingItem
                onClick={() => turnHandler(index, gameState, setGameState, timer)}
                key={index}
                playingItem={item}
                gameType={gameProps.theme}
              />
            );
          })}
        </div>
        {showSinglePlayerStats && (
          <GameStat stat={gameState.players[0]} secondsPassed={timer.secondsPassed} />
        )}
        {!showSinglePlayerStats && <MultipleGameStat gameState={gameState} />}
      </div>

      {gameState.finished && (
        <FinalCard
          gameStat={gameState.players}
          secondsPassed={gameState.secondsPassed}
          onRestart={restartBtnHandler}
          onNewGame={newGameBtnHandler}
        />
      )}
    </>
  );
};

export default Game;
