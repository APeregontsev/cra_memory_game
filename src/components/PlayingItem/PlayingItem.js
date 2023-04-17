import "./style.css";
import classNames from "classnames";
import IconContent from "./IconContent";
import TextContent from "./TextContent";

const PlayingItem = ({ playingItem, gameType, onClick }) => {
  // Обертка для классов для игрального елемента
  const playinItemClass = classNames(
    "playing-item",
    { pressed: playingItem.pressed },
    { opened: playingItem.opened }
  );

  const showPlayingItem = playingItem.pressed || playingItem.opened;
  const itemContent =
    gameType === "icons" ? (
      <IconContent number={playingItem.number} />
    ) : (
      <TextContent number={playingItem.number} />
    );

  return (
    <div className={playinItemClass} onClick={onClick}>
      {showPlayingItem && itemContent}
    </div>
  );
};

export default PlayingItem;
