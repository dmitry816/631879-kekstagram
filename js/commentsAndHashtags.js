'use strict';

(function () {
  var MAX_HASHTAG_LENGTH = 21;
  var MAX_HASHTAGS = 5;
  var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
  function hashtagsInputHandler(evt) {
    var hashtags = evt.target.value.toLowerCase().split(' ');
    var tmp = {};
    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];
      if (hashtag.indexOf('#', 0) !== 0) {
        evt.target.setCustomValidity('Неправильный формат хэштега. Начните с #.');
        return;
      }
      if (hashtag.lastIndexOf('#') !== 0) {
        evt.target.setCustomValidity('Хештеги должны разделяться пробелами.');
      }
      if (hashtag in tmp) {
        evt.target.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды.');
        return;
      }
      if (hashtags.length > MAX_HASHTAGS) {
        evt.target.setCustomValidity('Нельзя указать больше 5 хэш-тегов');
      }
      if (hashtag.length > MAX_HASHTAG_LENGTH) {
        evt.target.setCustomValidity('Максимальная длина одного хэш-тега 20 символов.');
        return;
      }
      tmp[hashtag] = true;
      evt.target.setCustomValidity('');
    }
  }
  uploadFormHashtags.addEventListener('input', hashtagsInputHandler);
  var comments = document.querySelector('.upload-form-description');
  comments.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.onEditorFormEscPress);
    comments.addEventListener('blur', function () {
      document.addEventListener('keydown', window.onEditorFormEscPress);
    });
  });
})();
