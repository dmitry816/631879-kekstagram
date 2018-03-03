'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var PHOTO_OBJECTS_NUMBER = 25;

var showGalleryOverlay = document.querySelector('.gallery-overlay');

var uploadFile = document.querySelector('#upload-file');
var uploadFormCancel = document.querySelector('.upload-form-cancel');
var effectImagePreview = document.querySelector('.effect-image-preview');


uploadFile.addEventListener('change', function () {
  window.showEditor();
});

uploadFormCancel.addEventListener('click', function () {
  window.closeEditor();
});

effectImagePreview.style.transform = ' ';

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
      likes: getRandomRange(MIN_LIKES, MAX_LIKES),
      comments: [getRandomElement(COMMENTS)]
    };
  }
  return photos;
};

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
