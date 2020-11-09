'use strict';

(function () {
/*   let createFragment = function (listAD, filledTemplate) {
    let createdFragment = document.createDocumentFragment(); // Объявляем пременную в которой сохраняме фрагмент.
    let generatePin;
    for (let i = 0; i < listAD.length; i++) { // Запускаем цикл добавления сгенерированных меток во фрагмент.
      generatePin = filledTemplate(listAD[i]);
      createdFragment.appendChild(generatePin);
    }
    return createdFragment;
  }; */

  let addDisabled = function (elements) {
    for (let element of elements) {
      element.disabled = true;
    }
  };

  window.util = {
    // fragment: createFragment,
    disabled: addDisabled
  };
}());
