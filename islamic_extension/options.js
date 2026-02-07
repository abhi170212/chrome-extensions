document.addEventListener('DOMContentLoaded', function() {
  const audioPlayer = document.getElementById('nasheedAudio');
  const playBtn = document.getElementById('playBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const stopBtn = document.getElementById('stopBtn');
  const volumeSlider = document.getElementById('volumeSlider');
  const nasheedItems = document.querySelectorAll('.nasheed-item');
  
  audioPlayer.volume = volumeSlider.value;
  
  volumeSlider.addEventListener('input', function() {
    audioPlayer.volume = this.value;
  });
  
  playBtn.addEventListener('click', function() {
    if (audioPlayer.src) {
      audioPlayer.play();
    } else {
      alert('Please select a nasheed first');
    }
  });
  
  pauseBtn.addEventListener('click', function() {
    audioPlayer.pause();
  });
  
  stopBtn.addEventListener('click', function() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  });
  
  nasheedItems.forEach(item => {
    item.addEventListener('click', function() {
      nasheedItems.forEach(i => i.classList.remove('active'));
      
      this.classList.add('active');
      
      const src = this.getAttribute('data-src');
      audioPlayer.src = src;
      
      document.title = `Playing: ${chrome.i18n.getMessage(this.getAttribute('data-i18n')) || this.textContent || 'Nasheed'}`;
    });
  });
  
  audioPlayer.addEventListener('ended', function() {
    const activeItem = document.querySelector('.nasheed-item.active');
    if (activeItem) {
      const nextItem = activeItem.nextElementSibling;
      if (nextItem && nextItem.classList.contains('nasheed-item')) {
        nextItem.click();
        setTimeout(() => {
          audioPlayer.play();
        }, 500);
      }
    }
  });
});