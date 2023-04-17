import classNames from "classnames";
import ActionsButtons from "../GameActions/ActionButtons";
import PlayerCardSingle from "../PlayerCardSingle/PlayerCardSingle";
import "./style.css";

const FinalCard = ({ gameStat, onRestart, onNewGame, secondsPassed }) => {
  let winners = [];
  let pairs = 0;

  // Сформируем [ winners ]  победителей

  gameStat.forEach((player) => {
    if (player.pairs > pairs) {
      pairs = player.pairs;
      winners[0] = player.id;
    } else if (player.pairs === pairs) {
      winners.push(player.id);
    }
    console.log("winners", winners);
  });

  const showSinglePlayerStats = gameStat.length === 1;
  const multipleWinners = winners.length > 1;

  return (
    <div className="final-card-wrapper ">
      <div className="final-card-multi">
        <div className="card-header">
          <div className="header-title">
            {showSinglePlayerStats
              ? "You did it!"
              : multipleWinners
              ? "It's a tie!"
              : `Player ${winners[0]} Wins!`}
          </div>
          <div className="header-text">Game over! Here are the results…</div>
        </div>

        <div className="players-wrapper">
          {showSinglePlayerStats && (
            <PlayerCardSingle secondsPassed={secondsPassed} moves={gameStat[0].moves + " Moves"} />
          )}

          {!showSinglePlayerStats && (
            <>
              {gameStat
                .sort((a, b) => b.pairs - a.pairs)
                .map((playerCard) => {
                  return (
                    <div
                      key={playerCard.id}
                      className={classNames("player-card-wrapper container", {
                        winner: winners.includes(playerCard.id),
                      })}
                    >
                      <div className="player-text">Player {playerCard.id}</div>
                      <div className="player-score">
                        <span>{playerCard.pairs} </span>Pairs
                      </div>
                    </div>
                  );
                })}
            </>
          )}
        </div>

        <ActionsButtons
          textNewGame={"Setup New Game"}
          onRestart={onRestart}
          onNewGame={onNewGame}
        />
      </div>
    </div>
  );
};

export default FinalCard;
