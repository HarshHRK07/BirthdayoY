// Audio functionality
document.addEventListener('DOMContentLoaded', function() {
  const backgroundAudio = document.getElementById('background-audio');

  function playBackgroundSong() {
    if (backgroundAudio) {
      backgroundAudio.play();
    }
  }

  function pauseBackgroundSong() {
    if (backgroundAudio) {
      backgroundAudio.pause();
      backgroundAudio.currentTime = 0;
    }
  }

  // Play background music when page loads
  playBackgroundSong();
});