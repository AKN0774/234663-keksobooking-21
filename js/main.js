'use strict';

const QUANTITY_AD = 8; // Колличество объявлений.
const IMG_URL = `img/avatars/user0`;
const IMG_TYPE = `.png`;
const TITLE_ARR = [`Уютное местечко для молодожёнов`, `Тихий уголок`, `Место для созерцания природы`, `Идеальное место для детей и их уставших родителей`]; // Выбирается случайным образом
const ADDRESS_X = 50;// Начальные координаты случайного адреса. Умножается на случайное число от 3 до 8
const ADDRESS_Y = 50; // Начальные координаты случайного адреса. Умножается на случайное число от 3 до 8
const COORDINATES_ADDRESS = [3, 8]; // Диапазон коэффициента случайных координат адреса.
const ADDRESS_TITLE = `Наше чудное место находится по адрессу :`;
const PRICE = 200; // Умножается на случайное число от 10 до 30
const PRICE_RANGE = [10, 30]; // Диапазон коэффициента умножения случайной цены.
const TYPE_ARR = [`palace`, `flat`, `house`, `bungalow`]; // Выбирается случайным образом
const ROOMS_RANGE = [1, 4]; // Диапазон числа комнат.
const GUESTS_RANGE = [1, 5]; // Диапазон числа гостей.
const CHECKIN = [`12:00`, `13:00`, `14:00`]; // Выбирается случайным образом
const CHECKOUT = [`12:00`, `13:00`, `14:00`]; // Выбирается случайным образом
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const DESCRIPTION = `Всё расскажут на месте`;
const PHOTO = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const LOCATION_X = 50; // Начальная координата на карте по X;
const LOCATION_Y = 130; // Начальная координата на карте по Y;
const LOCATION_RANGE = [1, 10]; // Диапазон коэффицента координат;
const LOCATION_X_STEP = 100; // Шаг изменеия координат по X;
const LOCATION_Y_STEP = 50; // Шаг изменения координат по Y;

// Функция расчёта случайного числа в заданном диапазоне.(price, rooms, guest).
let getRandomNumber = function (arr) {
  let min = arr[0];
  let max = arr[1];
  return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
};

// Функция расчёта случайного элемента массива.(title, type, checkin, checkout).
let getRandomFromArr = function (arr) {
  let min = 0;
  let max = arr.length;
  let i = Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
  let randomArrElement = arr[i];
  return randomArrElement;
};

// Функция расчёта случайных координат(address, location)
let getRandomCoordinates = function (num, arr) {
  let location = num * getRandomNumber(arr);
  return location;
};


let getRandomAdArr = function (quantityAd) {

  let objectAdArr = []; // Пустой массив, добавляем в него объекты.
  let j;

  for (let i = 0; i < quantityAd; i++) {
    let author = {}; // Пустой объект, добавляем в него объект avatar.
    let offer = {}; // Пустой объект, добавляем в него свойства.
    let location = {}; // Пустой объект, добавляем в него координаты.
    let randomObj = {}; // Пустой объект, добавляем в него объекты author, offer, location.
    let avatarObj = {}; // Пустой объект, добавляем в него свойство avatar.
    j = i;
    avatarObj.avatar = IMG_URL + ++j + IMG_TYPE;
    author.avatar = avatarObj;
    offer.title = getRandomFromArr(TITLE_ARR);
    offer.address = ADDRESS_TITLE + ` x:` + getRandomCoordinates(ADDRESS_X, COORDINATES_ADDRESS) + ` y:` + getRandomCoordinates(ADDRESS_Y, COORDINATES_ADDRESS);
    offer.price = getRandomCoordinates(PRICE, PRICE_RANGE);
    offer.type = getRandomFromArr(TYPE_ARR);
    offer.rooms = getRandomNumber(ROOMS_RANGE);
    offer.guests = getRandomNumber(GUESTS_RANGE);
    offer.checkin = getRandomFromArr(CHECKIN);
    offer.checkout = getRandomFromArr(CHECKOUT);
    offer.features = FEATURES;
    offer.decription = DESCRIPTION;
    offer.photos = PHOTO;
    location.x = LOCATION_X + getRandomCoordinates(LOCATION_X_STEP, LOCATION_RANGE);
    location.y = LOCATION_Y + getRandomCoordinates(LOCATION_Y_STEP, LOCATION_RANGE);
    randomObj.author = author;
    randomObj.offer = offer;
    randomObj.location = location;
    objectAdArr.push(randomObj);
  }
  return objectAdArr;
};


let mapPinDiv = document.querySelector(`.map_pins`); // Находим блок, куда будем добавлять фрагмент.
let simelarMapPinTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`); // Находим div в шаблоне, которому будем менять свойства. Что-то идёт не так. Постоянно выходит ошибка!!!!!
let adArr = getRandomAdArr(QUANTITY_AD); // Получаем массив объектов для заполнения шаблона.

let fillMapPin = function (objectAd) {
  let mapPin = simelarMapPinTemplate.cloneNode(true); // Клонируем шаблон
  let locationPinX = objectAd[`x`] + 78; // Получаем координаты по X объекта с учётом размеров изображения указателя
  let locationPinY = objectAd[`y`] + 156; // Получаем координаты по Y объекта с учётом размеров изображения указателя
  mapPin.style.left = locationPinX; // Добавляем координаты в шаблон
  mapPin.style.top = locationPinY;
  mapPin.src = objectAd[`avatar`]; // Добавляем адрес изображения
  mapPin.alt = objectAd[`title`]; // Добавляем описание из генерированного случайного объекта
  return mapPin;
};

let fragmentMapPin = document.createDocumentFragment(); // Объявляем переменную для создания фрагмента

// Цикл добавления шаблона во фрагмент. Для создания шаблона используем массив сгенерированных объектов
for (let i = 0; i < adArr; i++) {
  fragmentMapPin.appendChild(fillMapPin(adArr[i]));
}

mapPinDiv.appendChild(fragmentMapPin); // Добавляем фрагмент в DOM
