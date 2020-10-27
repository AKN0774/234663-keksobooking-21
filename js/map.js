'use strict';
// Блок функций и переменных для карты.

(function () {
  const MAIN_PIN_X = 64; // Размеры главного маркера по оси X.
  const MAIN_PIN_Y_NOACTIVE = 64; // Размеры главного маркера по оси Y в не активном состоянии.
  const MAIN_PIN_Y_ACTIVE = 86; // Размеры главного маркера по оси Y в активном состоянии.
  let map = document.querySelector(`.map`); // Находим карту.
  let mainMapPin = document.querySelector(`.map__pin--main`); // Находим главную метку.

  // Функция получения адреса из координат пина.
  window.getMapAddress = function () {
    let locX = mainMapPin.style.left;
    let locY = mainMapPin.style.top;
    if (map.classList.contains(`map--faded`)) {
      locX = parseInt(locX, 10) + (MAIN_PIN_X / 2);
      locY = parseInt(locY, 10) + (MAIN_PIN_Y_NOACTIVE / 2);
    } else {
      locX = parseInt(locX, 10) + (MAIN_PIN_X / 2);
      locY = parseInt(locY, 10) + (MAIN_PIN_Y_ACTIVE);
    }
    return {
      x: locX,
      y: locY,
    };
  };

  mainMapPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };


    let onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainMapPin.style.top = (mainMapPin.offsetTop - shift.y) + `px`;
      mainMapPin.style.left = (mainMapPin.offsetLeft - shift.x) + `px`;
    };

    let onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      map.removeEventListener(`mousemove`, onMouseMove);
      map.removeEventListener(`mouseup`, onMouseUp);
    };

    map.addEventListener(`mousemove`, onMouseMove);
    map.addEventListener(`mouseup`, onMouseUp);

    map.addEventListener(`mousemove`, onMouseMove);
    map.addEventListener(`mouseup`, onMouseUp);
  });
})();
