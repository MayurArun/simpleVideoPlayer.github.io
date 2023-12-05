document.addEventListener("DOMContentLoaded", function () {
    const player = document.getElementById("customPlayer");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const speedDownBtn = document.getElementById("speedDownBtn");
    const speedUpBtn = document.getElementById("speedUpBtn");
    const speedDisplay = document.getElementById("speedDisplay");
    const volumeSlider = document.getElementById("volumeSlider");
    const progressBar = document.getElementById("progressBar");

    let isPlaying = false;

    playPauseBtn.addEventListener("click", togglePlayPause);
    speedDownBtn.addEventListener("click", decreaseSpeed);
    speedUpBtn.addEventListener("click", increaseSpeed);
    volumeSlider.addEventListener("input", setVolume);

    player.addEventListener("timeupdate", updateProgressBar);
    progressBar.addEventListener("click", setProgressBar);

    function togglePlayPause() {
        if (isPlaying) {
            player.pause();
            playPauseBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
        } else {
            player.play();
            playPauseBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause"><rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/></svg>';
        }
        isPlaying = !isPlaying;
    }

    function decreaseSpeed() {
        player.playbackRate -= 0.5;
        updateSpeedDisplay();
    }

    function increaseSpeed() {
        player.playbackRate += 0.5;
        updateSpeedDisplay();
    }

    function updateSpeedDisplay() {
        speedDisplay.textContent = `Speed: ${player.playbackRate.toFixed(1)}x`;
    }

    function setVolume() {
        player.volume = volumeSlider.value;
    }

    function updateProgressBar() {
        const percentage = (player.currentTime / player.duration) * 100;
        progressBar.style.width = `${percentage}%`;
    }

    function setProgressBar(e) {
        const totalWidth = progressBar.clientWidth;
        const clickX = e.offsetX;
        const newTime = (clickX / totalWidth) * player.duration;
        player.currentTime = newTime;
    }
});
