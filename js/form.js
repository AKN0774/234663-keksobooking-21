'use strict';
// Блок в котором описаны функции работы с формой.

(function () {
  let adForm = document.querySelector(`.ad-form`); // Находим форму объявления.
  let addressInput = adForm.querySelector(`#address`); // Находим поле адреса.

  // Функция добавления значений в поле адреса.
  window.fillAddress = function (locationAddress) {
    let locX = locationAddress.x;
    let locY = locationAddress.y;
    addressInput.value = `X : ` + locX + ` , Y : ` + locY;
  };
  let roomNumber = adForm.querySelector(`#room_number`); // Находим поле выбора количества комнат.
  let guestCapacity = adForm.querySelector(`#capacity`); // Находим поле выбора количества гостей.
  let typeOfLodging = adForm.querySelector(`#type`); // Находим поле выбора типа жилья.
  let price = adForm.querySelector(`#price`); // Находим поле ввода цены за жильё.
  let submitForm = adForm.querySelector(`.ad-form__submit`); // Находим кнопку отсылки формы.

  window.fillAddress(window.mapAddress); // Вызываем функцию заполнения поля адреса ещё до активации страницы.

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

  // Добавляем обработчик валидации на кнопку отправки формы.
  submitForm.addEventListener(`click`, function () {
    roomValidity();
  });
})();
