$(document).ready(function () {
  var words = [];
  var $listElement = $('aside ul').empty();
  var $articleElement = $('article');

  $.getJSON( "http://localhost:8000/assets/js/data.json", function(data) {
    words = data;

    $.each(Object.keys(data), function (index, incorrectWord) {
      var items = [];

      items.push('<li>' + incorrectWord + '</li>');
      $listElement.append(items);
    });

    $('aside ul').find('li').first().trigger('click');
  })

  $listElement.on('click', function (e) {
    var target = e.target;
    var word_data = words[$(target).text()];
    var $articleTemplate = $('<div></div>');

    $(target).addClass('active').siblings().removeClass('active');

    if (word_data.word) {
      $articleTemplate.append('<h2>' + word_data.word + '</h2>');
    }

    if (word_data.definition) {
      $articleTemplate.append(word_data.definition);
    }

    if (word_data.picture) {
      $articleTemplate.append('<img src="' + word_data.picture + '" alt="" />');
    }

    $articleElement.empty().append($articleTemplate);

    if (word_data.video) {
      var video_id = word_data.video.replace('https://youtu.be/', '');
      video_id = video_id.split('?')[0];

      $articleTemplate.append('<div id="player"></div>');

      var player = new YT.Player('player', {
        height: 320,
        width: 400,
        videoId : video_id
      });
    }

  });
});
