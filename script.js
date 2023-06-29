const player = document.querySelector('.player');
const videoElem = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const playButton = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skipre]');
const ranges = player.querySelectorAll('.player__slider');


playButton.addEventListener("click", handlePlayButton);
videoElem.addEventListener("timeupdate", handleProgress);
progress.addEventListener("click", scrub);
ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));
skipButtons.forEach(button => button.addEventListener("click", skipsec));


async function playVideo() {
  try {
    await videoElem.play();
    playButton.classList.add("playing");
    playButton.innerText=' ❚ ❚ '
  } catch (err) {
    playButton.classList.remove("playing");
  }
}

function handlePlayButton() {
  if (videoElem.paused) {
    playVideo();
  } else {
    videoElem.pause();
    playButton.innerText='►'
    playButton.classList.remove("playing");
  }
}

function handleProgress() {
  const percent = (videoElem.currentTime / videoElem.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * videoElem.duration;
  videoElem.currentTime = scrubTime;
}

function handleRangeUpdate() {
  videoElem[this.name] = this.value;
  console.log(this,this.name,this.value);
}

function skipsec () {
  videoElem.currentTime += parseFloat(this.dataset.skipre);
}

