import "./App.css";
import StartGame from "./pages/StartGame";
import { Route, Routes } from "react-router-dom";
import Game from "./pages/Game";
import { useState } from "react";
import Context from "./Context";

function App() {
  const [navigation, setNavigation] = useState(true);

  const [gameStarted, setGameStarted] = useState(false);
  const [gameProps, setGameProps] = useState({
    theme: null,
    numberOfPlayers: null,
    gridSize: null,
  });

  console.log("from the APP GAME_PROPS", gameProps);

  return (
    <Context.Provider value={{ setNavigation }}>
      <div className="wrapper" style={gameStarted ? { backgroundColor: "#f2f2f2" } : null}>
        {navigation ? (
          <StartGame
            setGameStarted={setGameStarted}
            gameProps={gameProps}
            setGameProps={setGameProps}
          />
        ) : (
          <Game setGameStarted={setGameStarted} gameProps={gameProps} setGameProps={setGameProps} />
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
