'use strict';

// Блок с активацией страницы и карты.

// Функция создания фрагмента с добавлением в него сгенерированных объявлений.
(function () {
  let mainMapPin = document.querySelector(`.map__pin--main`); // Находим главную метку.
  let map = document.querySelector(`.map`); // Находим карту.
  let mapFilter = map.querySelector(`.map__filters-container`); // Находим блок фильтра объявлений.
  let mapPinDiv = document.querySelector(`.map__pins`); // Находим блок, куда будем добавлять фрагмент.
  window.form.fillInputAddress(window.map.getPinAddress()); // Вызываем функцию заполнения поля адреса ещё до активации страницы.

  let addFragment = function (listAd) {
    let createdFragmentPin = document.createDocumentFragment(); // Объявляем пременную в которой сохраняме фрагмент.
    let generatePin;
    let generateCard;
    for (let i = 0; i < listAd.length; i++) { // Запускаем цикл добавления сгенерированных меток во фрагмент.
      generatePin = window.pin.fillPin(listAd[i]);
      generatePin.addEventListener(`click`, function () {
        generateCard = window.card.createCard(listAd[i]);
        if (map.querySelector(`.map__card`)) {
          let cardElement = map.querySelector(`.map__card`);
          cardElement.remove();
        }
        map.insertBefore(generateCard, mapFilter);
      });
      createdFragmentPin.appendChild(generatePin);
    }
    mapPinDiv.appendChild(createdFragmentPin);
  };

  // Функция активации страницы.
  let activatePage = function () {
    window.map.activateMap();
    window.form.activateAdForm();
    window.form.fillInputAddress(window.map.getPinAddress()); // Заполняем поле адреса уже после активации.
    addFragment(window.data.randomListAd);
    /* window.map.addPinFragment();
    window.map.addCardFragment(); */
  };

  // Добавляем обработчик нажатия кнопки мыши на главный пин.
  mainMapPin.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      activatePage(); // Активируем страницу.
    }
  });

  // Добавляема обработчик нажатия клавиши Enter при фокусе на главном пине.
  mainMapPin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      activatePage(); // Активируем страницу.
    }
  });

}());
