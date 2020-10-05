'use strict';

const AD_DISCRIPTION = {
  title: [`Уютное местечко для молодожёнов`, `Тихий уголок`, `Место для созерцания природы`, `Идеальное место для детей и их уставших родителей`], // Выбирается случайным образом
  type: [`palace`, `flat`, `house`, `bungalow`], // Выбирается случайным образом
  features: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`], // Выбирается случайным образом
  photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`], // Выбирается случайным образом
  description: `Всё расскажут на месте`,
};
const MARKER_SIZE_X = 79;
const MARKER_SIZE_Y = 158;
const MAP_SIZE_X = [0 - MARKER_SIZE_X, 1200 - MARKER_SIZE_X]; // Размеры карты по оси X с учётом размера маркера по оси x.
const MAP_SIZE_Y = [130 - MARKER_SIZE_Y, 650 - MARKER_SIZE_Y]; // Размеры карты по оси Y.
const IMG_URL = `img/avatars/user0`;
const IMG_TYPE = `.png`;
const PRICE_RANGE = [1000, 8000]; // Диапазон цен.
const ROOMS_RANGE = [1, 4]; // Диапазон числа комнат.
const GUESTS_RANGE = [1, 5]; // Диапазон числа гостей.
const CHECKIN = [`12:00`, `13:00`, `14:00`]; // Выбирается случайным образом
const CHECKOUT = [`12:00`, `13:00`, `14:00`]; // Выбирается случайным образом
const AD_COUNTER = 8; // Колличество объявлений.

// Функция расчёта случайного числа в заданном диапазоне.(price, rooms, guest, checkin, checkout,).
let getRandomNumber = function (range) {
  let min = range[0];
  let max = range[1];
  return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
};


// Функция расчёта случайного элемента массива.(title, type).
let getRandomElement = function (list) {
  let listRange = [];
  listRange.push(0);
  listRange.push(list.length - 1);
  let i = getRandomNumber(listRange);
  let randomListElement = list[i];
  return randomListElement;
};

let createRandomAD = function (counter) { // Создаём случайное объявление.
  let locationX = getRandomNumber(MAP_SIZE_X);
  let locationY = getRandomNumber(MAP_SIZE_Y);
  return {
    'author': {
      avatar: IMG_URL + (counter + 1) + IMG_TYPE,
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
      features: getRandomElement(AD_DISCRIPTION.features),
      description: AD_DISCRIPTION.description,
      photos: getRandomElement(AD_DISCRIPTION.photos),
    },
    'location': {
      x: locationX,
      y: locationY,
    }
  };
};

let createAdList = function (adCounter) { // Формируем массив из случайных объявлений.
  let adList = [];
  let randomAd;
  for (let i = 0; i < adCounter; i++) {
    randomAd = createRandomAD(i);
    adList.push(randomAd);
  }
  return adList;
};


let createMapPin = function (objectAd) { // Создаём метку на карте по шаблону.
  let simelarMapPinTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`); // Находим div в шаблоне, которому будем менять свойства. Что-то идёт не так. Постоянно выходит ошибка!!!!!
  let mapPin = simelarMapPinTemplate.cloneNode(true); // Клонируем шаблон
  let locationPinX = objectAd[`x`]; // Получаем координаты по X объекта с учётом размеров изображения указателя
  let locationPinY = objectAd[`y`]; // Получаем координаты по Y объекта с учётом размеров изображения указателя
  mapPin.style.left = locationPinX; // Добавляем координаты в шаблон
  mapPin.style.top = locationPinY;
  mapPin.src = objectAd[`avatar`]; // Добавляем адрес изображения
  mapPin.alt = objectAd[`title`]; // Добавляем описание из генерированного случайного объекта
  return mapPin;
};

let createFragmentPins = function () { // Создаём фрагмент из созданных маркеров на карте.

  let createdAdList = createAdList(AD_COUNTER); // Получаем массив случайных объектов.
  let fragmentMapPin = document.createDocumentFragment(); // Объявляем переменную для создания фрагмента
  for (let i = 0; i < AD_COUNTER; i++) {
    fragmentMapPin.appendChild(createMapPin(createdAdList[i])); // Добавляем созданные маркеры в фрагмент.
  }
  return fragmentMapPin;
};
let mapPinDiv = document.querySelector(`.map_pins`); // Находим блок, куда будем добавлять фрагмент.
mapPinDiv.appendChild(createFragmentPins); // Добавляем фрагмент в DOM
