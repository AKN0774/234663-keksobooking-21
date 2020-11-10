'use strict';
(function () {
  let map = document.querySelector(`.map`); // Находим карту.
  let createCard = function (randomAd) {
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
    let cardPhotosDiv = cardFromPin.querySelector(`.popup__photos`); // Контейнер для фотографий объекта.
    let cardPhotoElements = cardPhotosDiv.querySelectorAll(`.popup__photo`);
    let cardClose = cardFromPin.querySelector(`.popup__close`); // Кнопка закрытия карточки.

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
      cardFromPin.style.display = `none`;
    });
    cardClose.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        cardFromPin.style.display = `none`;
      }
    });
    return cardFromPin;
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
      switch (features[i]) {
        case `wifi`:
          li.textContent = `wifi`;
          li.classList.add(`popup__feature--wifi`);
          break;
        case `dishwasher` :
          li.textContent = `dishwasher`;
          li.classList.add(`popup__feature--dishwasher`);
          break;
        case `parking` :
          li.textContent = `parking`;
          li.classList.add(`popup__feature--parking`);
          break;
        case `washer`:
          li.textContent = `washer`;
          li.classList.add(`popup__feature--washer`);
          break;
        case `elevator` :
          li.textContent = `elevator`;
          li.classList.add(`popup__feature--elevator`);
          break;
        case `conditioner` :
          li.textContent = `conditioner`;
          li.classList.add(`popup__feature--conditioner`);
          break;
      }
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
    }
  };


  window.card = {
    filledCard: createCard,
    deleteCard: removeCard
  };
})();
