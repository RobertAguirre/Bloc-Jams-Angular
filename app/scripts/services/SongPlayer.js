(function() {
    function SongPlayer() {

        //*** Private Attributes *** //

        var SongPlayer = {};

        var currentSong = null;

        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;

        //*** Private Functions ***//

        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
          if (currentBuzzObject) {
              currentBuzzObject.stop();
              currentSong.playing = null;
          }
          currentBuzzObject = new buzz.sound(song.audioUrl, {
              formats: ['mp3'],
              preload: true,
              volume: 10
          });

          currentSong = song;
        };

        /**
        *@function playSong
        *@desc Plays a song (currentBuzzObject)
        *@param {Object} song
        */
        var playSong = function(song){
          currentBuzzObject.play();
          song.playing = true;
        };



         SongPlayer.play = function(song) {
            if (currentSong !== song) { //currently playing song is not equal to song clicked on
              setSong(song);
              playSong(song);
            } else if (currentSong === song) {
              if (currentBuzzObject.isPaused()) {
              playSong(song);
              }
            }
          };

         SongPlayer.pause = function(song) {
           currentBuzzObject.pause();
           song.playing = false;
         };

         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
