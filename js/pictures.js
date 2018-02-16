'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var PHOTO_OBJECTS_NUMBER = 25;
var ESC_KEYCODE = 27;
var showGalleryOverlay = document.querySelector('.gallery-overlay');
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadFile = document.querySelector('#upload-file');
var uploadFormCancel = document.querySelector('.upload-form-cancel');
var uploadEffectLevelPin = document.querySelector('.upload-effect-level-pin');
/* var uploadEffectLevelValue = document.querySelector('.upload-effect-level-value');*/

var onEditorFormEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeEditor();
  }
};

var showEditor = function () {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onEditorFormEscPress);
};

var closeEditor = function () {
  uploadOverlay.classList.add('hidden');
  document.addEventListener('keydown', onEditorFormEscPress);
};

uploadFile.addEventListener('change', function () {
  showEditor();
});

uploadFormCancel.addEventListener('click', function () {
  closeEditor();
});

uploadEffectLevelPin.addEventListener('mouseup', function () {
  // расчитать положение пина слайдера
});

var getRandomRange = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomElement = function (arr) {
  return arr[getRandomRange(0, arr.length)];
};

var generatePhotoObjects = function (photosNumbers) {
  var photos = [];
  for (var i = 0; i < photosNumbers; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomRange(15, 200),
      comments: [getRandomElement(COMMENTS)]
    };
  }
  return photos;
};

// variable with object photos array
var photos = generatePhotoObjects(PHOTO_OBJECTS_NUMBER);
var pictureTemplate = document.querySelector('#picture-template').content;

var createPictureTemplate = function (photoObjectsArray) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('img').src = photoObjectsArray.url;
  pictureElement.querySelector('.picture-likes').textContent = photoObjectsArray.likes;
  pictureElement.querySelector('.picture-comments').textContent = photoObjectsArray.comments.length;
  return pictureElement;
};

var renderPhotos = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(createPictureTemplate(photos[i]));
  }
  document.querySelector('.pictures').appendChild(fragment);
};

var fillGallery = function (photosArray) {
  renderPhotos(photosArray);
  showGalleryOverlay.querySelector('.gallery-overlay-image').src = photosArray[0].url;
  showGalleryOverlay.querySelector('.likes-count').textContent = photosArray[0].likes;
  showGalleryOverlay.querySelector('.comments-count').textContent = photosArray[0].comments.length;
};

fillGallery(photos);
