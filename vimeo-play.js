const playButton = document.querySelector("#btnPlay");
const pauseButton = document.querySelector("#btnPause");
const iframe = document.querySelector("#player1");
const player = new Vimeo.Player(iframe);

playButton.addEventListener("click", playVideo);
pauseButton.addEventListener("click", pauseVideo);

function playVideo() {
  player.play();
}

function pauseVideo() {
  player.pause();
}
