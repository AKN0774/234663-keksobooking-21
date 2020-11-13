'use strict';

// Данные и функция для создания случайных данных.

(function () {

  const AD_DISCRIPTION = {
    title: [`Уютное местечко для молодожёнов`, `Тихий уголок`, `Место для созерцания природы`, `Идеальное место для детей и их уставших родителей`], // Выбирается случайным образом
    type: [`palace`, `flat`, `house`, `bungalow`], // Выбирается случайным образом
    features: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`], // Выбирается случайным образом
    photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`], // Выбирается случайным образом
    description: `Всё расскажут на месте`,
  };

  const MAP_SIZE_X = [0, 1200]; // Размеры карты по оси X с учётом размера маркера по оси x.
  const MAP_SIZE_Y = [130, 650]; // Размеры карты по оси Y.
  const IMG_URL = `img/avatars/user0`;
  const IMG_TYPE = `.png`;
  const PRICE_RANGE = [1000, 8000]; // Диапазон цен.
  const ROOMS_RANGE = [1, 4]; // Диапазон числа комнат.
  const GUESTS_RANGE = [1, 5]; // Диапазон числа гостей.
  const CHECKIN = [`12:00`, `13:00`, `14:00`]; // Выбирается случайным образом
  const CHECKOUT = [`12:00`, `13:00`, `14:00`]; // Выбирается случайным образом


  // Функция расчёта случайного числа в заданном диапазоне.(price, rooms, guest, checkin, checkout,).
  let getRandomNumber = function (range) {
    let min = range[0];
    let max = range[1];
    return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
  };

  // Функция расчёта случайного элемента массива.(title, type).
  let getRandomElement = function (list) {
    let i = getRandomNumber([0, list.length - 1]);
    let randomListElement = list[i];
    return randomListElement;
  };

  // Создаём случайное объявление.
  let randomData = function (counter) {
    let locationX = getRandomNumber(MAP_SIZE_X);
    let locationY = getRandomNumber(MAP_SIZE_Y);
    let numberImg = counter + 1;
    return {
      'author': {
        avatar: IMG_URL + (numberImg) + IMG_TYPE,
      },
      'offer': {
        title: getRandomElement(AD_DISCRIPTION.title),
        address: locationX + ` ,` + locationX,
        price: getRandomNumber(PRICE_RANGE),
        type: getRandomElement(AD_DISCRIPTION.type),
        rooms: getRandomNumber(ROOMS_RANGE),
        guests: getRandomNumber(GUESTS_RANGE),
        checkin: getRandomElement(CHECKIN),
        checkout: getRandomElement(CHECKOUT),
        features: AD_DISCRIPTION.features,
        description: AD_DISCRIPTION.description,
        photos: AD_DISCRIPTION.photos,
      },
      'location': {
        x: locationX,
        y: locationY,
      }
    };
  };

  let AD_COUNTER = 8; // Колличество объявлений.

  // Функция создания массива из случайно сгенерированных объявлений.
  let createListAd = function (counter) {
    let listAd = [];
    for (let i = 0; i < counter; i++) {
      listAd.push(randomData(i));
    }
    return listAd;
  };

  // Создаём переменную в которую сохраням массив сгенерированных случайных объявлений.
  window.data = createListAd(AD_COUNTER);
})();
