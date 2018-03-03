'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var MAX_IMAGE_SIZE = 100;
  var MIN_IMAGE_SIZE = 25;
  var SIZE_STEP = 25;
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadResizeControlsButtonDec = document.querySelector('.upload-resize-controls-button-dec');
  var uploadResizeControlsButtonInc = document.querySelector('.upload-resize-controls-button-inc');
  var uploadResizeControlsValue = document.querySelector('.upload-resize-controls-value');
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var uploadFile = document.querySelector('#upload-file');
  var decreaseImage = function () {
    var currentSize = parseInt(uploadResizeControlsValue.value, 10);
    var decreasedSize = currentSize - SIZE_STEP;

    if (decreasedSize < MIN_IMAGE_SIZE) {
      return;
    }
    calculateImageSize(decreasedSize);
  };

  var increaseImage = function () {
    var currentSize = parseInt(uploadResizeControlsValue.value, 10);
    var increasedSize = currentSize + SIZE_STEP;
    if (increasedSize > MAX_IMAGE_SIZE) {
      return;
    }
    calculateImageSize(increasedSize);
  };

  var calculateImageSize = function (size) {
    uploadResizeControlsValue.setAttribute('value', size + '%');
    effectImagePreview.style.transform = 'scale(' + size / 100 + ')';
  };

  window.onEditorFormEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.closeEditor();
    }
  };

  window.showEditor = function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', window.onEditorFormEscPress);
  };

  window.closeEditor = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', window.onEditorFormEscPress);
    uploadFile.value = '';
  };

  uploadResizeControlsButtonDec.addEventListener('click', decreaseImage);
  uploadResizeControlsButtonInc.addEventListener('click', increaseImage);
})();
