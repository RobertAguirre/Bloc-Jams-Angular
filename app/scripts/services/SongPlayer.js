(function() {
    function SongPlayer($rootScope, Fixtures) {

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

          currentBuzzObject.bind('timeupdate', function() {
              $rootScope.$apply(function() {
                  SongPlayer.currentTime = currentBuzzObject.getTime();
              });
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
        *@function stopSong
        *@desc Stops a song (currentBuzzObject)
        *@param {Object} song
        */
        var stopSong = function(song){
          currentBuzzObject.stop();
          song.playing = null;
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

        //*****************************//
        //***** Public Attributes *****//
        //*****************************//

        /**
        * @desc Active song object from list of songs
        * @type {Object}
        */
        SongPlayer.currentSong = null;

        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;

        //*****************************//
        //***** Public Functions *****//
        //*****************************//

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
        */
        SongPlayer.previous = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex--;

          if (currentSongIndex < 0) {
              stopSong();
          } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
          }
        };

        /**
        *@function Player bar next button
        *@desc Sets song to next song in album
        */
        SongPlayer.next = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex++;

          var lastSongIndex = currentAlbum.songs.length - 1;

          if (currentSongIndex > lastSongIndex) {
              stopSong();
          } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
          }
        };

        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        /**
        * @function setVolume
        * @desc Set volume for songs
        * @param {Number} volume
        */
        SongPlayer.setVolume = function(volume) {
          if (currentBuzzObject) {
            currentBuzzObject.setVolume(volume);
          }
          SongPlayer.volume = volume;
        };


        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
  })();
