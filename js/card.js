'use strict';
(function () {
  window.cardFillTemplate = function (randomAd) {
    let cardTemplate = document.querySelector(`#card`)
    .content
    .querySelector(`.map__card`); // Находим шаблон карточки
    let cardFromPin = cardTemplate.cloneNode(true); // Клонируем шаблон карточки.
    let cardAvatar = cardFromPin.querySelector(`.popup__avatar`); // Картинка аватара.
    let cardTitle = cardFromPin.querySelector(`.popup__title`); // Заголовок объявления.
    let cardAddress = cardFromPin.querySelector(`.popup__text--address`); // Адрес объекта.
    let cardPrice = cardFromPin.querySelector(`.popup__text--price`); // Цена объекта.
    let cardType = cardFromPin.querySelector(`.popup__type`); // Тип жилья.
    let cardCapacity = cardFromPin.querySelector(`.popup__text--capacity`); // Количество комнат и гостей.
    let cardTime = cardFromPin.querySelector(`.popup__text--time`); // Время заезда и выезда.
    let cardListFeatures = cardFromPin.querySelector(`.popup__features`); // Список дополнительных опций жилища.
    let cardFeaturesElements = cardListFeatures.querySelectorAll(`.popup__feature`); // Все элементы списка дополнительных опций.
    let cardDescription = cardFromPin.querySelector(`.popup__description`); // Описание объекта.

    cardFromPin.style.display = `none`;
    cardAvatar.src = randomAd.author.avatar; // Добавляем аватар автора объявления.
    cardTitle.textContent = randomAd.offer.title; // Добавляем заголовок объявления.
    cardAddress.textContent = randomAd.offer.address; // Заполняем поле адреса.
    cardPrice.textContent = randomAd.offer.price + ` руб.`; // Заполняем поле цены объекта.
    cardType.textContent = randomAd.offer.type; // Заполняем поле типа жилья.
    cardCapacity.textContent = randomAd.offer.rooms + ` комнаты для ` + randomAd.offer.guests + ` гостей`; // Заполняем количество гостей и комнат.
    cardTime.textContent = ` Заезд после ` + randomAd.offer.checkin + ` , выезд до ` + randomAd.offer.checkout; // Заполняем время заезда и выезда.
    cardDescription.textContent = randomAd.offer.description; // Заполняем поле описания объекта.
    let filledFeatures = fillFeatures(cardFeaturesElements, randomAd.offer.features);
    cardFeaturesElements = filledFeatures;// Заполняем список дополнительных опций объекта.
    return cardFromPin;
  };


  let fillFeatures = function (elements, features) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].textContent = features[i];
    }
  };


})();
