'use strict';

// Блок с активацией страницы и карты.

// Функция создания фрагмента с добавлением в него сгенерированных объявлений.
(function () {
  let mainMapPin = document.querySelector(`.map__pin--main`); // Находим главную метку.
  window.form.fillInputAddress(window.map.getPinAddress()); // Вызываем функцию заполнения поля адреса ещё до активации страницы.

  let addFragment = function (listAd) {
    let createdFragmentPin = document.createDocumentFragment(); // Объявляем пременную в которой сохраняме фрагмент.

    for (let i = 0; i < listAd.length; i++) { // Запускаем цикл добавления сгенерированных меток во фрагмент.
      const pin = window.pin.fillPin(listAd[i]);
      pin.addEventListener(`click`, function () {
        const card = window.card.createCard(listAd[i]);
        window.card.deleteCard();
        window.map.addCard(card);
        document.addEventListener(`keydown`, window.card.closeEscCard);
      });
      createdFragmentPin.appendChild(pin);
    }
    window.map.addPin(createdFragmentPin);
  };

  // Функция активации страницы.
  let activatePage = function () {
    window.map.activateMap();
    window.form.activateAdForm();
    window.form.fillInputAddress(window.map.getPinAddress()); // Заполняем поле адреса уже после активации.
    addFragment(window.data);
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
