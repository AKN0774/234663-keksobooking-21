'use strict';

(function () {
  const MARKER_SIZE_X = 50; // Размеры маркера по оси X.
  const MARKER_SIZE_Y = 70; // Размеры маркера по оси Y.

  // Функция создания метки на карте из случайного объявления.
  let createTemplatePin = function (randomAd) { // Создаём метку на карте по шаблону.
    let simelarMapPinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`); // Находим button в шаблоне, которой будем менять свойства.
    let randomMapPin = simelarMapPinTemplate.cloneNode(true); // Клонируем шаблон
    let locationPinX = randomAd.location.x - MARKER_SIZE_X / 2 + `px`; // Получаем координаты по X объекта с учётом размеров изображения указателя
    let locationPinY = randomAd.location.y - MARKER_SIZE_Y + `px`; // Получаем координаты по Y объекта с учётом размеров изображения указателя
    randomMapPin.style.left = locationPinX; // Добавляем координаты в шаблон
    randomMapPin.style.top = locationPinY;
    randomMapPin.children[0].src = randomAd.author.avatar; // Добавляем адрес изображения
    randomMapPin.children[0].alt = randomAd.offer.title; // Добавляем описание из генерированного случайного объекта

    return randomMapPin;
  };
  window.pin = {
    fillPin: createTemplatePin
  };

})();
