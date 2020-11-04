'use strict';
// Блок в котором описаны функции работы с формой.

(function () {
  let adForm = document.querySelector(`.ad-form`); // Находим форму объявления.
  let addressInput = adForm.querySelector(`#address`); // Находим поле адреса.
  let fieldsetForm = adForm.querySelectorAll(`fieldset`); // Находим все fieldset формы.

  let addDisabled = function (elements) {
    for (let element of elements) {
      element.disabled = true;
    }
  };

  addDisabled(fieldsetForm);

  let removeDisabled = function (elements) {
    for (let element of elements) {
      element.disabled = false;
    }
  };

  // Функция активации формы объвления.
  window.activateAdForm = function () {
    adForm.classList.remove(`ad-form--disabled`);
    removeDisabled(fieldsetForm);
  };

  // Функция добавления значений в поле адреса.
  window.fillInputAddress = function (address) {
    let {x, y} = address;
    addressInput.value = `X : ` + x + ` , Y : ` + y;
  };

  let roomNumber = adForm.querySelector(`#room_number`); // Находим поле выбора количества комнат.
  let guestCapacity = adForm.querySelector(`#capacity`); // Находим поле выбора количества гостей.
  let typeOfLodging = adForm.querySelector(`#type`); // Находим поле выбора типа жилья.
  let price = adForm.querySelector(`#price`); // Находим поле ввода цены за жильё.
  let timeIn = adForm.querySelector(`#timein`); // Находим поле выбора времени заезда.
  let timeOut = adForm.querySelector(`#timeout`); // Находим поле выбора времени выезда.
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

  // Функция синхронизации времени заезда и выезда.
  let selectTime = function (elementOne, elementTwo) {
    if (elementOne.value === `12:00`) {
      elementTwo.value = `12:00`;
    } else if (elementOne.value === `13:00`) {
      elementTwo.value = `13:00`;
    } else {
      elementTwo.value = `14:00`;
    }
  };

  // Обработчик синхронизации времени въезда и выезда.
  timeIn.addEventListener(`input`, function () {
    selectTime(timeIn, timeOut);
  });

  // Обработчик синхронизации времени выезда и въезда.
  timeOut.addEventListener(`input`, function () {
    selectTime(timeOut, timeIn);
  });

  // Добавляем обработчик валидации на кнопку отправки формы.
  submitForm.addEventListener(`click`, function () {
    roomValidity();
  });
})();
