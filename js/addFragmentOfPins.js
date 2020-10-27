'use strict';
// Блок функций для добавления фрагмента в DOM.

(function () {
  const AD_COUNTER = 8; // Колличество объявлений.

  // Функция создания массива из случайно сгенерированных объявлений.
  let createListAd = function (counter) {
    let listAd = [];
    for (let i = 0; i < counter; i++) {
      listAd.push(window.randomPin(i));
    }
    return listAd;
  };

  let randomListAD = createListAd(AD_COUNTER); // Создаём переменную в которую сохраням массив сгенерированных случайных объявлений.
  // Функция создания фрагмента с добавлением в него сгенерированных объявлений.
  let createFragmentOfPins = function (listAD) {
    let createdFragment = document.createDocumentFragment(); // Объявляем пременную в которой сохраняме фрагмент.
    let generatePin;
    for (let i = 0; i < listAD.length; i++) { // Запускаем цикл добавления сгенерированных меток во фрагмент.
      generatePin = window.createMapPin(listAD[i]);
      createdFragment.appendChild(generatePin);
    }
    return createdFragment;
  };

  let mapPinDiv = document.querySelector(`.map__pins`); // Находим блок, куда будем добавлять фрагмент.
  window.addFramentOfPins = function () {
    mapPinDiv.appendChild(createFragmentOfPins(randomListAD)); // Добавляем фрагмент в DOM
  };
})();
