const audioInput = document.querySelector("#audio-file");
const fileNameOutput = document.querySelector("#file-name");
const audioPlayer = document.querySelector("#audio-player");
const timeDisplay = document.querySelector("#time-display");
const playButton = document.querySelector("#play-button");
const progressInput = document.querySelector("#progress");

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

audioInput.addEventListener("change", function () {
  const selectedFile = audioInput.files[0];

  if (selectedFile) {
    fileNameOutput.textContent = selectedFile.name;
    const audioUrl = URL.createObjectURL(selectedFile);
    audioPlayer.src = audioUrl;
  }
});

audioPlayer.addEventListener("loadedmetadata", function () {
  const duration = formatTime(audioPlayer.duration);
  timeDisplay.textContent = `0:00 / ${duration}`;
  playButton.disabled = false;
  progressInput.max = audioPlayer.duration;
  progressInput.value = 0;
  progressInput.disabled = false;
});

playButton.addEventListener("click", function () {
  if (audioPlayer.paused) {
    audioPlayer.play();
  } else {
    audioPlayer.pause();
  }
});

audioPlayer.addEventListener("play", function () {
  playButton.textContent = "Pause";
});

audioPlayer.addEventListener("pause", function () {
  playButton.textContent = "Play";
});

audioPlayer.addEventListener("ended", function () {
  playButton.textContent = "Play";
});

audioPlayer.addEventListener("timeupdate", function () {
  progressInput.value = audioPlayer.currentTime;
  const currentTime = formatTime(audioPlayer.currentTime);
  const duration = formatTime(audioPlayer.duration);
  timeDisplay.textContent = `${currentTime} / ${duration}`;
});

progressInput.addEventListener("input", function () {
  audioPlayer.currentTime = Number(progressInput.value);
});
