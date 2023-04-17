export function playersCreation(numberOfPlayers) {
  const players = [];

  for (let i = 0; i < numberOfPlayers; i++) {
    const player = {
      id: 0,
      pairs: 0,
      activeTurn: false,
      elapsedTime: 0,
      moves: 0,
    };
    player.id = i + 1;
    players.push(player);
  }

  players[0].activeTurn = true;

  return players;
}

export function playingAreaFulfillment(areaSize) {
  // Создадим два массива т к элементов игровых должно быть парное количество
  const partA = new Array(areaSize / 2);
  const partB = new Array(areaSize / 2);

  function partCreation(arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = i + 1;
    }
  }

  partCreation(partA);
  partCreation(partB);

  // Создадим пустой массив необходимой длины
  let playingArea = [];
  const tempArray = partA.concat(partB);

  tempArray.forEach((item) => {
    let position = 0;

    randomPosition();
    // Сгенерируем рандомную позицию для вставки елемента, если елемент в массиве уже есть, тогда сгенерируем еще раз, пока не найдем свободную позицию
    function randomPosition() {
      // Сгенерируем случайное число от 0 до длинны массива игрового поля
      position = Math.floor(Math.random() * areaSize);
      /*  console.log("POSITION!!", position + " ITEM=", item); */

      if (typeof playingArea[position] === "object") {
        /*   console.log("НЕ ПУСТАЯ ПОЗИЦИЯ", position); */
        randomPosition();
      } else {
        return;
      }
    }

    playingArea[position] = { number: item, pressed: false, opened: false };
  });

  return playingArea;
}

export function turnHandler(turn, gameState, setGameState, timer) {
  // turn - это индекс игрального (числа) елемента в массиве gameState.playingArea. Под этим индексом смотрим наше игральное число.
  // если нажали на предыдущий click ИЛИ на открытый(отгаданый) елемент -> ничего не делаем, выходим

  if (turn === gameState.firstClick || gameState.playingArea[turn].opened) return;

  // Запустим Timer если игроков = 1, и нет значения у идентификатора Timer (timer_Id.current)
  if (timer.timer_Id.current === null && gameState.players.length === 1) {
    timer.start();
  }

  // 1_____занесем первый click

  const isFirstClick = gameState.firstClick == null;

  if (isFirstClick) {
    setGameState((gameState) => {
      // уберем все предыдущие признаки pressed
      const newPlayingArea = gameState.playingArea.map((item) =>
        item.pressed ? { ...item, pressed: false } : { ...item }
      );
      // добавим признак pressed текущему нажатию
      newPlayingArea[turn].pressed = true;

      // обновим состояние
      return { ...gameState, playingArea: newPlayingArea, firstClick: turn };
    });
  } else {
    // 2_____определим равен ли второй click первому
    // 1st click = 2nd click

    const firstClickedNumber = gameState.playingArea[gameState.firstClick].number;
    const numberIsOpened = firstClickedNumber === gameState.playingArea[turn].number;

    if (numberIsOpened) {
      setGameState(() => {
        // убираем все pressed
        const newPlayingArea = gameState.playingArea.map((item) =>
          item.pressed ? { ...item, pressed: false } : { ...item }
        );

        // проставляем признак opened
        const newPlayingAreaOpened = newPlayingArea.map((item) =>
          item.number === firstClickedNumber ? { ...item, opened: true } : { ...item }
        );

        // добавим очки текущему игроку и проставим следующего игрока

        // накинем очков текущему игроку
        const newPlayers = gameState.players;
        const positionOfPlayerInArray = gameState.activePlayer - 1;
        newPlayers[positionOfPlayerInArray].pairs = ++newPlayers[positionOfPlayerInArray].pairs;

        // уберем активность с текущего игрока
        newPlayers[positionOfPlayerInArray].activeTurn = false;
        newPlayers[positionOfPlayerInArray].moves = ++newPlayers[positionOfPlayerInArray].moves;

        // проставим следующего текущего игрока: если к текущему игроку добавить 1, если это меньше или равно длинны массива игроков, тогда увеличиваем, иначе, проставляем 1.
        const newActivePlayer =
          gameState.activePlayer + 1 <= gameState.players.length ? gameState.activePlayer + 1 : 1;

        // сделаем активным следующего игрока
        newPlayers[newActivePlayer - 1].activeTurn = true;

        // проверяем на предмет окончания игры !!!!!
        let gameFinished = newPlayingAreaOpened.every((playingItem) => playingItem.opened);

        let secondsPassed = 0;

        if (gameFinished) {
          timer.stopAndClear();

          secondsPassed = timer.secondsPassed;
        }

        // обновим состояние
        return {
          ...gameState,
          playingArea: newPlayingAreaOpened,
          firstClick: null,
          activePlayer: newActivePlayer,
          players: newPlayers,
          finished: gameFinished,
          secondsPassed: secondsPassed,
        };
      });
    } else {
      // 3_____1st click != 2nd click
      // не угадали число, убираем первый click и убираем все pressed

      setGameState(() => {
        const newPlayingArea = gameState.playingArea;

        //проставим pressed для второго нажатия
        newPlayingArea[turn].pressed = true;

        // проставим следующего текущего игрока: если к текущему игроку добавить 1, и эта сумма <= длинны массива игроков, тогда увеличиваем, иначе, проставляем 1.
        const newActivePlayer =
          gameState.activePlayer + 1 <= gameState.players.length ? gameState.activePlayer + 1 : 1;

        // уберем активность с текущего игрока
        const newPlayers = gameState.players;
        const positionOfPlayerInArray = gameState.activePlayer - 1;
        newPlayers[positionOfPlayerInArray].activeTurn = false;
        newPlayers[positionOfPlayerInArray].moves = ++newPlayers[positionOfPlayerInArray].moves;

        // сделаем активным следующего игрока
        newPlayers[newActivePlayer - 1].activeTurn = true;

        //сбрасываем firstClick
        // обновим состояние
        return {
          ...gameState,
          playingArea: newPlayingArea,
          firstClick: null,
          activePlayer: newActivePlayer,
          players: newPlayers,
        };
      });
    }
  }
}
