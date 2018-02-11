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
var photos = [];
var pictureTemplate = document.querySelector('#picture-template').content;
var picturesBlock = document.querySelector('.pictures');

var generatePhotoObjects = function (photosNumbers) {
  for (var i = 0; i < photosNumbers; i++) {
    photos[i] = {
      url: 'photos/{{' + i + '}}.jpg',
      likes: Math.round(Math.random() * (200 - 15) + 15),
      comments: COMMENTS[Math.round(Math.random() * COMMENTS.length)]
    };
  }
};

// fill with object photos array
photos = generatePhotoObjects(PHOTO_OBJECTS_NUMBER);

var createPictureTemplate = function () {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('img').src = photos.url;
  pictureElement.querySelector('.picture-likes').textContent = photos.likes;
  pictureElement.querySelector('.picture-comments').textContent = photos.comments;
  return pictureElement;
};

var renderPhotos = function (elementsNumber) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < elementsNumber; i++) {
    fragment.appendChild(createPictureTemplate(photos[i]));
  }
  picturesBlock.appendChild(fragment);
};

renderPhotos(PHOTO_OBJECTS_NUMBER);

var showGalleryOverlay = document.querySelector('.gallery-overlay');
showGalleryOverlay.classList.remove('hidden');

var fillGallery = function (photosArray) {
  showGalleryOverlay.querySelector('img').src = photosArray[0].url;
  showGalleryOverlay.querySelector('.picture-likes').textContent = photosArray[0].likes;
  showGalleryOverlay.querySelector('.picture-comments').textContent = photosArray[0].comments;
};

fillGallery(photos);

