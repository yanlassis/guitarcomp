const audioInput = document.querySelector("#audio-file");
const fileNameOutput = document.querySelector("#file-name");

audioInput.addEventListener("change", function () {
  const selectedFile = audioInput.files[0];

  if (selectedFile) {
    fileNameOutput.textContent = selectedFile.name;
  }
});
