'use strict';

// Блок с активацией страницы и карты.

// Функция создания фрагмента с добавлением в него сгенерированных объявлений.
(function () {
  window.createFragment = function (listAD, filledTemplate) {
    let createdFragment = document.createDocumentFragment(); // Объявляем пременную в которой сохраняме фрагмент.
    let generatePin;
    for (let i = 0; i < listAD.length; i++) { // Запускаем цикл добавления сгенерированных меток во фрагмент.
      generatePin = filledTemplate(listAD[i]);
      createdFragment.appendChild(generatePin);
    }
    return createdFragment;
  };
}());

let mainMapPin = document.querySelector(`.map__pin--main`); // Находим главную метку.

window.fillInputAddress(window.getMapAddress()); // Вызываем функцию заполнения поля адреса ещё до активации страницы.

// Функция активации страницы.
let activatePage = function () {
  window.activateMap();
  window.activateAdForm();
  window.fillInputAddress(window.getMapAddress()); // Заполняем поле адреса уже после активации.
  window.mapAddFragment();
  window.mapCardAddFragment();
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
