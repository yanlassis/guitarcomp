import { formatTime, isValidLoop, extractYouTubeVideoId } from "./utils.js";

const audioInput = document.querySelector("#audio-file");
const audioMessage = document.querySelector("#audio-message");
const audioPlayer = document.querySelector("#audio-player");
const timeDisplay = document.querySelector("#time-display");
const playButton = document.querySelector("#play-button");
const progressInput = document.querySelector("#progress");
const speedSelect = document.querySelector("#speed");
const setAButton = document.querySelector("#set-a");
const setBButton = document.querySelector("#set-b");
const loopDisplay = document.querySelector("#loop-display");
const loopMessage = document.querySelector("#loop-message");
const loopToggle = document.querySelector("#loop-toggle");
const clearLoopButton = document.querySelector("#clear-loop");
const youtubeForm = document.querySelector("#youtube-form");
const youtubeUrlInput = document.querySelector("#youtube-url");
const youtubeSubmit = document.querySelector("#youtube-submit");
const youtubeMessage = document.querySelector("#youtube-message");

//yt url loading/validation
youtubeUrlInput.addEventListener("input", function () {
  const hasText = youtubeUrlInput.value.trim() !== "";
  youtubeSubmit.disabled = !hasText;
  youtubeMessage.textContent = "";
});

youtubeForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const videoId = extractYouTubeVideoId(youtubeUrlInput.value.trim());

  if (videoId === null) {
    youtubeMessage.textContent = "Enter a supported YouTube video URL.";
    return;
  }

  youtubeMessage.textContent = `Recognized video ID: ${videoId}`;
});

//standart parameters 
const practiceState = {
  playbackSpeed: 1,
  loopStart: null,
  loopEnd: null,
  loopEnabled: false
};

//loop practice
function updateLoopDisplay() {
  let startText = "--:--";
  let endText = "--:--";

  if (practiceState.loopStart !== null) {
    startText = formatTime(practiceState.loopStart);
  }

  if (practiceState.loopEnd !== null) {
    endText = formatTime(practiceState.loopEnd);
  }

  loopDisplay.textContent = `A: ${startText} | B: ${endText}`;
}

function updateLoopAvailability() {
  const bothPointsSet = practiceState.loopStart !== null && practiceState.loopEnd !== null;
  const hasValidInterval = isValidLoop(practiceState.loopStart, practiceState.loopEnd);
  const hasAnyPoint = practiceState.loopStart !== null || practiceState.loopEnd !== null;

  loopToggle.disabled = !hasValidInterval;
  clearLoopButton.disabled = !hasAnyPoint;

  if (bothPointsSet && !hasValidInterval) {
    loopMessage.textContent = "Point B must be after point A.";
  } else {
    loopMessage.textContent = "";
  }
}

setAButton.addEventListener("click", function () {
  practiceState.loopStart = audioPlayer.currentTime;
  updateLoopDisplay();
  updateLoopAvailability();
});

setBButton.addEventListener("click", function () {
  practiceState.loopEnd = audioPlayer.currentTime;
  updateLoopDisplay();
  updateLoopAvailability();
});

loopToggle.addEventListener("change", function () {
  practiceState.loopEnabled = loopToggle.checked;

  if (practiceState.loopEnabled) {
    audioPlayer.currentTime = practiceState.loopStart;
  }
});

function resetLoop() {
  practiceState.loopStart = null;
  practiceState.loopEnd = null;
  practiceState.loopEnabled = false;
  loopToggle.checked = false;
  updateLoopDisplay();
  updateLoopAvailability();
}

function setAudioControlsDisabled(shouldDisable) {
  playButton.disabled = shouldDisable;
  progressInput.disabled = shouldDisable;
  speedSelect.disabled = shouldDisable;
  setAButton.disabled = shouldDisable;
  setBButton.disabled = shouldDisable;
}

clearLoopButton.addEventListener("click", function () {
  resetLoop();
});

//when an audio file is selected
audioInput.addEventListener("change", function () {
  const selectedFile = audioInput.files[0];

  audioPlayer.pause();
  playButton.textContent = "Play";
  progressInput.value = 0;
  timeDisplay.textContent = "0:00 / 0:00";
  audioMessage.textContent = "";
  resetLoop();
  setAudioControlsDisabled(true);

  if (!selectedFile) {
    audioMessage.textContent = "Choose an audio file.";
    return;
  }

  const audioUrl = URL.createObjectURL(selectedFile);
  audioPlayer.src = audioUrl;
});

audioPlayer.addEventListener("loadedmetadata", function () {
  const duration = formatTime(audioPlayer.duration);
  timeDisplay.textContent = `0:00 / ${duration}`;
  progressInput.max = audioPlayer.duration;
  progressInput.value = 0;
  setAudioControlsDisabled(false);
  audioPlayer.playbackRate = practiceState.playbackSpeed;
});

audioPlayer.addEventListener("error", function () {
  audioMessage.textContent = "This audio file could not be played. Try another audio file.";
  audioPlayer.pause();
  playButton.textContent = "Play";
  progressInput.value = 0;
  timeDisplay.textContent = "0:00 / 0:00";
  resetLoop();
  setAudioControlsDisabled(true);
});

//play button
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

//time / progressbar update
audioPlayer.addEventListener("timeupdate", function () {
  if (practiceState.loopEnabled && audioPlayer.currentTime >= practiceState.loopEnd) {
    audioPlayer.currentTime = practiceState.loopStart;
  }

  progressInput.value = audioPlayer.currentTime;
  const currentTime = formatTime(audioPlayer.currentTime);
  const duration = formatTime(audioPlayer.duration);
  timeDisplay.textContent = `${currentTime} / ${duration}`;
});

progressInput.addEventListener("input", function () {
  audioPlayer.currentTime = Number(progressInput.value);
});

//speed selector
speedSelect.addEventListener("change", function () {
  practiceState.playbackSpeed = Number(speedSelect.value);
  audioPlayer.playbackRate = practiceState.playbackSpeed;
});
