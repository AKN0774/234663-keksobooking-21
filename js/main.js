'use strict';

// Блок с активацией страницы и карты.

let adForm = document.querySelector(`.ad-form`); // Находим форму объявления.
let fieldsetForm = adForm.querySelectorAll(`fieldset`); // Находим все fieldset формы.
let map = document.querySelector(`.map`); // Находим карту.
let mapFilterForm = document.querySelector(`.map__filters`); // Находим форму фильтра.
let mainMapPin = document.querySelector(`.map__pin--main`); // Находим главную метку.

// Функция добавления неактивного состояния элементов.
let addDisabled = function (elements) {
  for (let element of elements) {
    element.disabled = true;
  }
};

addDisabled(fieldsetForm);
addDisabled(mapFilterForm);

// Функция перевода элементов в активное состояние.
let removeDisabled = function (elements) {
  for (let element of elements) {
    element.disabled = false;
  }
};

// Функция активации карты.
let activateMap = function () {
  map.classList.remove(`map--faded`);
};

// Функция активации формы объвления.
let activateAdForm = function () {
  adForm.classList.remove(`ad-form--disabled`);
  removeDisabled(mapFilterForm);
  removeDisabled(fieldsetForm);
};

// Функция активации страницы.
let activatePage = function () {
  activateMap();
  activateAdForm();
  window.fillAddress(window.getMapAddress); // Заполняем поле адреса уже после активации.
  window.addFramentOfPins();
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
