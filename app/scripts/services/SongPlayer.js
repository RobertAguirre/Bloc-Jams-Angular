(function() {
    function SongPlayer(Fixtures) {

        //*** Private Attributes *** //

        var SongPlayer = {};

        /**
        *@desc Information from current album
        *@type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();

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
              SongPlayer.currentSong.playing = null;
          }
          currentBuzzObject = new buzz.sound(song.audioUrl, {
              formats: ['mp3'],
              preload: true,
              volume: 10
          });

          SongPlayer.currentSong = song;
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

        /**
        * @function getSongIndex
        * @desc Get index of song in the songs array
        * @param {Object} song
        * @returns {Number}
        */
        var getSongIndex = function(song){
            return currentAlbum.songs.indexOf(song);
        };

        //***** Public Attributes *****//

        /**
        * @desc Active song object from list of songs
        * @type {Object}
        */
        SongPlayer.currentSong = null;

        //***** Public Functions *****//

        /**
        * @function play
        * @desc Play current or new song
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
          song = song || SongPlayer.currentSong;
          if (SongPlayer.currentSong !== song) { //currently playing song is not equal to song clicked on
            setSong(song);
            playSong(song);
          } else if (SongPlayer.currentSong === song) {
            if (currentBuzzObject.isPaused()) {
            playSong(song);
            }
          }
        };

        /**
        * @function pause
        * @desc Pause current song
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
          song = song || SongPlayer.currentSong;
          currentBuzzObject.pause();
          song.playing = false;
        };

        /**
        *@function Player bar previous button
        *@desc Sets song to previous song in album
        *
        */
        SongPlayer.previous = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex--;

          if (currentSongIndex < 0) {
              currentBuzzObject.stop();
              SongPlayer.currentSong.playing = null;
          } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
          }
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
  })();
