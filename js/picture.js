'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var showGalleryOverlay = document.querySelector('.gallery-overlay');
  var uploadFile = document.querySelector('#upload-file');
  var uploadFormCancel = document.querySelector('.upload-form-cancel');
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var pictureTemplate = document.querySelector('#picture-template').content;
  var filtersField = document.querySelector('.filters');
  var closeOverlayButton = document.querySelector('.gallery-overlay-close');
  var form = document.querySelector('#upload-select-image');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var photos = [];
  uploadFile.addEventListener('change', function () {
    window.showEditor();
  });
  uploadFormCancel.addEventListener('click', function () {
    window.closeEditor();
  });
  effectImagePreview.style.transform = ' ';
  var openOverlay = function () {
    showGalleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', closeOverlayOnEsc);
  };
  var createPictureTemplate = function (photoObjectsArray) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = photoObjectsArray.url;
    pictureElement.querySelector('.picture-likes').textContent = photoObjectsArray.likes;
    pictureElement.querySelector('.picture-comments').textContent = photoObjectsArray.comments.length;
    pictureElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      openOverlay();
      fillGallery(photoObjectsArray);
    });
    return pictureElement;
  };
  var renderPhotos = function (elements) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < elements.length; i++) {
      fragment.appendChild(createPictureTemplate(elements[i]));
    }
    document.querySelector('.pictures').appendChild(fragment);
  };
  var onPictureDownload = function (data) {
    photos = data;
    renderPhotos(photos);
    if (filtersField.classList.contains('filters-inactive')) {
      filtersField.classList.remove('filters-inactive');
    }
  };
  var activationEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };
  var deactivationEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };
  var closeOverlay = function () {
    showGalleryOverlay.classList.add('hidden');
    document.removeEventListener('keydown', closeOverlayOnEsc);
  };
  var closeOverlayOnEsc = function (evt) {
    deactivationEvent(evt, closeOverlay);
  };
  var closeForm = function () {
    uploadOverlay.classList.add('hidden');
    form.reset();
    uploadFile.value = '';

  };
  var fillGallery = function (photosArray) {
    showGalleryOverlay.querySelector('.gallery-overlay-image').src = photosArray[0].url;
    showGalleryOverlay.querySelector('.likes-count').textContent = photosArray[0].likes;
    showGalleryOverlay.querySelector('.comments-count').textContent = photosArray[0].comments.length;
    closeOverlayButton.addEventListener('click', function () {
      closeOverlay();
    });
    closeOverlayButton.addEventListener('keydown', function (evt) {
      activationEvent(evt, closeOverlay);
    });
  };
  window.backend.download(onPictureDownload, window.backend.error);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(form), closeForm, window.backend.error);
  });

})();
