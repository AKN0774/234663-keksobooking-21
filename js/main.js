'use strict';

const AD_DISCRIPTION = {
  title: [`Уютное местечко для молодожёнов`, `Тихий уголок`, `Место для созерцания природы`, `Идеальное место для детей и их уставших родителей`], // Выбирается случайным образом
  type: [`palace`, `flat`, `house`, `bungalow`], // Выбирается случайным образом
  features: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`], // Выбирается случайным образом
  photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`], // Выбирается случайным образом
  description: `Всё расскажут на месте`,
};

const MARKER_SIZE_X = 50; // Размеры маркера по оси X.
const MARKER_SIZE_Y = 70; // Размеры маркера по оси Y.
const MAP_SIZE_X = [0, 1200]; // Размеры карты по оси X с учётом размера маркера по оси x.
const MAP_SIZE_Y = [130, 650]; // Размеры карты по оси Y.
const IMG_URL = `img/avatars/user0`;
const IMG_TYPE = `.png`;
const PRICE_RANGE = [1000, 8000]; // Диапазон цен.
const ROOMS_RANGE = [1, 4]; // Диапазон числа комнат.
const GUESTS_RANGE = [1, 5]; // Диапазон числа гостей.
const CHECKIN = [`12:00`, `13:00`, `14:00`]; // Выбирается случайным образом
const CHECKOUT = [`12:00`, `13:00`, `14:00`]; // Выбирается случайным образом
const AD_COUNTER = 8; // Колличество объявлений.

const MAIN_PIN_X = 64; // Размеры главного маркера по оси X.
const MAIN_PIN_Y_NOACTIVE = 64; // Размеры главного маркера по оси Y в не активном состоянии.
const MAIN_PIN_Y_ACTIVE = 86; // Размеры главного маркера по оси Y в активном состоянии.
let map = document.querySelector(`.map`); // Находим карту.
let adForm = document.querySelector(`.ad-form`); // Находим форму объявления.
let addressInput = adForm.querySelector(`#address`); // Находим поле адреса.
let fieldsetForm = adForm.querySelectorAll(`fieldset`);
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
  fillAddress(getAddress()); // Заполняем поле адреса уже после активации.
  addFramentOfPins();
};

// Функция получения адреса из координат пина.
let getAddress = function () {
  let locX = mainMapPin.style.left;
  let locY = mainMapPin.style.top;
  if (map.classList.contains(`map--faded`)) {
    locX = parseInt(locX, 10) + (MAIN_PIN_X / 2);
    locY = parseInt(locY, 10) + (MAIN_PIN_Y_NOACTIVE / 2);
  } else {
    locX = parseInt(locX, 10) + (MAIN_PIN_X / 2);
    locY = parseInt(locY, 10) + (MAIN_PIN_Y_ACTIVE);
  }
  return {
    x: locX,
    y: locY,
  };
};

// Функция добавления значений в поле адреса.
let fillAddress = function (locationAddress) {
  let locX = locationAddress.x;
  let locY = locationAddress.y;
  addressInput.value = `X : ` + locX + ` , Y : ` + locY;
};

fillAddress(getAddress()); // Вызываем функцию заполнения поля адреса ещё до активации страницы.

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

let roomNumber = adForm.querySelector(`#room_number`); // Находим поле выбора количества комнат.
let guestCapacity = adForm.querySelector(`#capacity`); // Находим поле выбора количества гостей.
let typeOfLodging = adForm.querySelector(`#type`); // Находим поле выбора типа жилья.
let price = adForm.querySelector(`#price`); // Находим поле ввода цены за жильё.
let submitForm = adForm.querySelector(`.ad-form__submit`); // Находим кнопку отсылки формы.

// Функция валидации поля количества комнат.
let roomValidity = function () {
  let rooms = parseInt(roomNumber.value, 10); // Объявляем переменную для хранения данных введённых в поле выбора количества комнат.
  let guests = parseInt(guestCapacity.value, 10); // Объявляем переменную для хранения данных введённых в поле выбора количества гостей.
  if (rooms === 1 && guests === 1 || rooms === 2 && guests > 0 && guests < 3 || rooms === 3 && guests > 0 || rooms === 100 && guests === 0) {
    guestCapacity.setCustomValidity(``);
  } else if (rooms === 1 && guests === 0 || rooms === 2 && guests === 0 || rooms === 3 && guests === 0) {
    guestCapacity.setCustomValidity(`Добавте гостей.`);
  } else if (rooms === 1 && guests > 1 || rooms === 2 && guests > 2 || rooms === 100 && guests > 0) {
    guestCapacity.setCustomValidity(`Слишком много гостей.`);
  }
  guestCapacity.reportValidity();
};

// Функция зависимости минимальной цены от типа жилья.
let setPrice = function () {
  let type = typeOfLodging.value;
  if (type === `bungalow`) {
    price.min = `0`;
    price.placeholder = `0`;
  } else if (type === `flat`) {
    price.min = `1000`;
    price.placeholder = `1000`;
  } else if (type === `house`) {
    price.min = `5000`;
    price.placeholder = `5000`;
  } else {
    price.min = `10000`;
    price.placeholder = `10000`;
  }
};

setPrice(); // Вызываем функцию установки минимальной цены.

// Добавляем обработчик валидации цены на поле выбора типа жилья.
typeOfLodging.addEventListener(`input`, function () {
  setPrice();
});

// Добавляем обработчик проверки цены на поле ввода цены.
price.addEventListener(`input`, function () {
});

// Добавляем обработчик валидации на кнопку отправки формы.
submitForm.addEventListener(`click`, function () {
  roomValidity();
});

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

let createRandomAD = function (counter) { // Создаём случайное объявление.
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

// Функция создания массива из случайно сгенерированных объявлений.
let createListAd = function (counter) {
  let listAd = [];
  for (let i = 0; i < counter; i++) {
    listAd.push(createRandomAD(i));
  }
  return listAd;
};

let randomListAD = createListAd(AD_COUNTER); // Создаём переменную в которую сохраням массив сгенерированных случайных объявлений.

// Функция создания метки на карте из случайного объявления.
let createMapPin = function (randomAd) { // Создаём метку на карте по шаблону.
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

// Функция создания фрагмента с добавлением в него сгенерированных объявлений.
let createFragmentOfPins = function (listAD) {
  let createdFragment = document.createDocumentFragment(); // Объявляем пременную в которой сохраняме фрагмент.
  let generatePin;
  for (let i = 0; i < listAD.length; i++) { // Запускаем цикл добавления сгенерированных меток во фрагмент.
    generatePin = createMapPin(listAD[i]);
    createdFragment.appendChild(generatePin);
  }
  return createdFragment;
};

let mapPinDiv = document.querySelector(`.map__pins`); // Находим блок, куда будем добавлять фрагмент.
let addFramentOfPins = function () {
  mapPinDiv.appendChild(createFragmentOfPins(randomListAD)); // Добавляем фрагмент в DOM
};
