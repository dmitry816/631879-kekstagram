'use strict';

(function () {
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var uploadEffectLevelPin = document.querySelector('.upload-effect-level-pin');
  var uploadEffectLevelValue = document.querySelector('.upload-effect-level-value');
  var isPinDragged = false;
  var currentAppliedFilterFunction;
  var uploadEffectControls = document.querySelector('.upload-effect-level');
  var onPinPositionMousemoveHandler = function (moveEvt) {
    moveEvt.preventDefault();
    window.sliderWidth = document.querySelector('.upload-effect-level-line').offsetWidth;
    var shift = window.startCoordsX - moveEvt.clientX;
    window.startCoordsX = moveEvt.clientX;
    uploadEffectLevelPin.style.left = (uploadEffectLevelPin.offsetLeft - shift) + 'px';
    if (parseInt(uploadEffectLevelPin.style.left, 10) <= 0) {
      uploadEffectLevelPin.style.left = 0 + 'px';
    }
    if (parseInt(uploadEffectLevelPin.style.left, 10) >= window.sliderWidth) {
      uploadEffectLevelPin.style.left = window.sliderWidth + 'px';
    }
  };

  var onPinPositionMouseupHandler = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onPinPositionMousemoveHandler);
    document.removeEventListener('mouseup', onPinPositionMouseupHandler);

    var windowWidth = window.innerWidth;
    var pinPosition = window.startCoordsX - ((windowWidth - window.sliderWidth) / 2);
    isPinDragged = true;
    uploadEffectLevelValue.value = (pinPosition / window.sliderWidth).toFixed(2);
    filterFunctions[currentAppliedFilterFunction]();
  };

  uploadEffectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    window.startCoordsX = evt.clientX;
    document.addEventListener('mousemove', onPinPositionMousemoveHandler);
    document.addEventListener('mouseup', onPinPositionMouseupHandler);
  });

  var updateEffectLevelValue = function () {
    if (!isPinDragged) {
      uploadEffectLevelValue.value = 1;
      uploadEffectLevelPin.style.left = '455px';
    }
    isPinDragged = false;
  };

  var effectButtons = document.querySelectorAll('.upload-effect-preview');
  var effectNoneButton = effectButtons[0];
  var effectChromeButton = effectButtons[1];
  var effectSepiaButton = effectButtons[2];
  var effectMarvinButton = effectButtons[3];
  var effectFobosButton = effectButtons[4];
  var effectHeatButton = effectButtons[5];

  var hideUploadEffectControls = function () {
    uploadEffectControls.classList.add('hidden');

  };
  hideUploadEffectControls();

  var showUploadEffectControls = function () {
    uploadEffectControls.classList.remove('hidden');
  };
  var filterFunctions = {
    clearLastEffect: function () {
      effectImagePreview.classList.remove(
          'upload-effect-chrome',
          'upload-effect-sepia',
          'upload-effect-marvin',
          'upload-effect-fobos',
          'upload-effect-heat'
      );
    },
    onEffectNoneButtonClick: function () {
      filterFunctions.clearLastEffect();
      hideUploadEffectControls();
      updateEffectLevelValue();

      currentAppliedFilterFunction = 'onEffectNoneButtonClick';
      effectImagePreview.style.filter = '';
    },
    onEffectChromeButtonClick: function () {
      filterFunctions.clearLastEffect();
      showUploadEffectControls();
      updateEffectLevelValue();

      currentAppliedFilterFunction = 'onEffectChromeButtonClick';
      effectImagePreview.classList.add('upload-effect-chrome');
      document.querySelector('.upload-effect-chrome').style.filter = 'grayscale(' + uploadEffectLevelValue.value + ')';
    },
    onEffectSepiaButtonClick: function () {
      filterFunctions.clearLastEffect();
      showUploadEffectControls();
      updateEffectLevelValue();

      currentAppliedFilterFunction = 'onEffectSepiaButtonClick';
      effectImagePreview.classList.add('upload-effect-sepia');
      document.querySelector('.upload-effect-sepia').style.filter = 'sepia(' + uploadEffectLevelValue.value + ')';
    },
    onEffectMarvinButtonClick: function () {
      filterFunctions.clearLastEffect();
      showUploadEffectControls();
      updateEffectLevelValue();

      currentAppliedFilterFunction = 'onEffectMarvinButtonClick';
      effectImagePreview.classList.add('upload-effect-marvin');
      document.querySelector('.upload-effect-marvin').style.filter = 'invert(' + ((uploadEffectLevelValue.value * 10) + '%') + ')';
    },
    onEffectFobosButtonClick: function () {
      filterFunctions.clearLastEffect();
      showUploadEffectControls();
      updateEffectLevelValue();

      currentAppliedFilterFunction = 'onEffectFobosButtonClick';
      effectImagePreview.classList.add('upload-effect-fobos');
      document.querySelector('.upload-effect-fobos').style.filter = 'blur(' + ((uploadEffectLevelValue.value * 3) + 'px') + ')';
    },
    onEffectHeatButtonClick: function () {
      filterFunctions.clearLastEffect();
      showUploadEffectControls();
      updateEffectLevelValue();

      currentAppliedFilterFunction = 'onEffectHeatButtonClick';
      effectImagePreview.classList.add('upload-effect-heat');
      document.querySelector('.upload-effect-heat').style.filter = 'brightness(' + (uploadEffectLevelValue.value * 3) + ')';
    }
  };
  effectNoneButton.addEventListener('click', filterFunctions.onEffectNoneButtonClick);
  effectChromeButton.addEventListener('click', filterFunctions.onEffectChromeButtonClick);
  effectSepiaButton.addEventListener('click', filterFunctions.onEffectSepiaButtonClick);
  effectMarvinButton.addEventListener('click', filterFunctions.onEffectMarvinButtonClick);
  effectFobosButton.addEventListener('click', filterFunctions.onEffectFobosButtonClick);
  effectHeatButton.addEventListener('click', filterFunctions.onEffectHeatButtonClick);
})();
