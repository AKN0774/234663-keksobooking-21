'use strict';
(function () {
  let map = document.querySelector(`.map`); // Находим карту.
  let createTemplateCard = function (randomAd) {
    let cardTemplate = document.querySelector(`#card`)
    .content
    .querySelector(`.map__card`); // Находим шаблон карточки
    let card = cardTemplate.cloneNode(true); // Клонируем шаблон карточки.
    let cardAvatar = card.querySelector(`.popup__avatar`); // Картинка аватара.
    let cardTitle = card.querySelector(`.popup__title`); // Заголовок объявления.
    let cardAddress = card.querySelector(`.popup__text--address`); // Адрес объекта.
    let cardPrice = card.querySelector(`.popup__text--price`); // Цена объекта.
    let cardType = card.querySelector(`.popup__type`); // Тип жилья.
    let cardCapacity = card.querySelector(`.popup__text--capacity`); // Количество комнат и гостей.
    let cardTime = card.querySelector(`.popup__text--time`); // Время заезда и выезда.
    let cardListFeatures = card.querySelector(`.popup__features`); // Список дополнительных опций жилища.
    let cardFeaturesElements = cardListFeatures.querySelectorAll(`.popup__feature`); // Все элементы списка дополнительных опций.
    let cardDescription = card.querySelector(`.popup__description`); // Описание объекта.
    let cardPhotosDiv = card.querySelector(`.popup__photos`); // Контейнер для фотографий объекта.
    let cardPhotoElements = cardPhotosDiv.querySelectorAll(`.popup__photo`);
    let cardClose = card.querySelector(`.popup__close`); // Кнопка закрытия карточки.

    cardAvatar.src = randomAd.author.avatar; // Добавляем аватар автора объявления.
    cardTitle.textContent = randomAd.offer.title; // Добавляем заголовок объявления.
    cardAddress.textContent = randomAd.offer.address; // Заполняем поле адреса.
    cardPrice.textContent = randomAd.offer.price + ` руб.`; // Заполняем поле цены объекта.
    cardType.textContent = randomAd.offer.type; // Заполняем поле типа жилья.
    cardCapacity.textContent = randomAd.offer.rooms + ` комнаты для ` + randomAd.offer.guests + ` гостей`; // Заполняем количество гостей и комнат.
    cardTime.textContent = ` Заезд после ` + randomAd.offer.checkin + ` , выезд до ` + randomAd.offer.checkout; // Заполняем время заезда и выезда.
    cardDescription.textContent = randomAd.offer.description; // Заполняем поле описания объекта.
    cardListFeatures.appendChild(createFeatures(cardFeaturesElements, randomAd.offer.features)); // Добавляем фрагмент из созданных features.
    cardPhotosDiv.appendChild(createPhoto(cardPhotoElements, randomAd.offer.photos));
    cardClose.addEventListener(`click`, function () {
      removeCard();
    });
    return card;
  };

  let onCardEscPress = function (evt) {
    if (evt.key === `Escape`) {
      removeCard();
    }
  };

  let createFeatures = function (elements, features) {
    let createdFragment = document.createDocumentFragment();
    for (let i = elements.length - 1; i >= 0; i--) {
      let element = elements[i];
      element.parentElement.removeChild(element);
    }
    for (let i = 0; i < features.length; i++) {
      let li = document.createElement(`li`);
      li.classList.add(`popup__feature`);
      li.classList.add(`popup__feature--` + features[i]);
      createdFragment.appendChild(li);
    }
    return createdFragment;
  };

  let createPhoto = function (elements, photoList) {
    let createdFragment = document.createDocumentFragment();
    for (let i = elements.length - 1; i >= 0; i--) {
      let element = elements[i];
      element.parentElement.removeChild(element);
    }
    for (let i = 0; i < photoList.length; i++) {
      let img = document.createElement(`img`);
      img.src = photoList[i];
      img.classList.add(`popup__photo`);
      img.width = `45`;
      img.height = `40`;
      img.alt = `Фотография жилья`;
      createdFragment.appendChild(img);
    }
    return createdFragment;
  };

  let removeCard = function () {
    let cardElement = map.querySelector(`.map__card`);
    if (cardElement) {
      cardElement.remove();
      document.removeEventListener(`keydown`, window.card.closeEscCard);
    }
  };


  window.card = {
    createCard: createTemplateCard,
    deleteCard: removeCard,
    closeEscCard: onCardEscPress
  };
})();
