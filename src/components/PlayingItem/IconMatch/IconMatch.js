import icon_1 from "./../../../images/img_1.png";
import icon_2 from "./../../../images/img_2.png";
import icon_3 from "./../../../images/img_3.png";
import icon_4 from "./../../../images/img_4.png";
import icon_5 from "./../../../images/img_5.png";
import icon_6 from "./../../../images/img_6.png";
import icon_7 from "./../../../images/img_7.png";
import icon_8 from "./../../../images/img_8.png";
import icon_9 from "./../../../images/img_9.png";
import icon_10 from "./../../../images/img_10.png";

// Функция которая сопоставляет число с картинкой, если выбран тип игры = картинка
function iconMatch(playingItemNumber) {
  const icons = new Map([
    [1, icon_1],
    [2, icon_2],
    [3, icon_3],
    [4, icon_4],
    [5, icon_5],
    [6, icon_6],
    [7, icon_7],
    [8, icon_8],
    [9, icon_9],
    [10, icon_10],
    [11, icon_1],
    [12, icon_2],
    [13, icon_3],
    [14, icon_4],
    [15, icon_5],
    [16, icon_6],
    [17, icon_7],
    [18, icon_8],
  ]);

  return icons.get(playingItemNumber);
}

export default iconMatch;
