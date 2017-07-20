(function(){
  function Fixtures(){
    var Fixtures = {};

    //Example Data Albums
    var albumPicasso = {
      title: 'The Colors',
      artist: 'Pablo Picasso',
      label: 'Cubism',
      year: '1881',
      albumArtUrl: '/assets/images/album_covers/01.png',
      songs: [
        { title: 'Blue', duration: 161.71, audioUrl: 'assets/music/blue' },
        { title: 'Green', duration: 103.96, audioUrl: 'assets/music/green' },
        { title: 'Red', duration: 268.45, audioUrl: 'assets/music/red' },
        { title: 'Pink', duration: 153.14, audioUrl: 'assets/music/pink' },
        { title: 'Magenta', duration: 374.22, audioUrl: 'assets/music/magenta' }
      ]
    };

    var albumMarconi = {
      title: 'The Telephone',
      artist: 'Guglielmo Marconi',
      label: 'EM',
      year: '1909',
      albumArtUrl: '/assets/images/album_covers/20.png',
      songs: [
        { title: 'Hello, Operator?', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21'},
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15' }
      ]
    };

    var albumSheeran = {
      title: 'Divide',
      artist: 'Ed Sheeran',
      label: 'Atlanic Reocrds UK',
      year: '2017',
      albumArtUrl: '/assets/images/album_covers/Divide_cover.png',
      songs: [
        { title: 'Eraser', duration: '3:48' },
        { title: 'Castle on the Hill', duration: '4:21' },
        { title: 'Dive', duration: '3:59' },
        { title: 'Shape of You', duration: '3:54' },
        { title: 'Perfect', duration: '4:23' },
        { title: 'Galway Girl', duration: '2:51' },
        { title: 'Happier', duration: '3:28' },
        { title: 'New Man', duration: '3:09' },
        { title: 'Hearts Dont Break Around here', duration: '4:09' },
        { title: 'What Do I know?', duration: '3:57' },
        { title: 'How Would You Feel', duration: '4:41' },
        { title: 'Supermarket Flowers', duration: '3:41' },
        { title: 'Barcelona', duration: '3:11' },
        { title: 'Bibia Be Ye Ye', duration: '2:57' },
        { title: 'Nancy Mulligan', duration: '3:00' },
        { title: 'Save Myself', duration: '4:07' }
      ]
    };

    Fixtures.getAlbum = function() {
      return albumPicasso;
    };

    Fixtures.getCollection = function() {
      var resultArray = [];
      for (var i = 1; i<11;i++) {
        resultArray.push(angular.copy(albumPicasso));
      }
      return resultArray;
    };

    return Fixtures;
  }

  angular
    .module('blocJams')
    .factory('Fixtures', Fixtures);
})();
