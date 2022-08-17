const playButton = document.querySelector("#btnPlay");
const pauseButton = document.querySelector("#btnPause");
const iframe = document.querySelector("#player1");
const playButtonTwo = document.querySelector("#btnPlayTwo");
const pauseButtonTwo = document.querySelector("#btnPauseTwo");
const iframeTwo = document.querySelector("#player2");
const player = new Vimeo.Player(iframe);
const playerTwo = new Vimeo.Player(iframeTwo);

playButton.addEventListener("click", playVideo);
pauseButton.addEventListener("click", pauseVideo);
playButtonTwo.addEventListener("click", playVideoTwo);
pauseButtonTwo.addEventListener("click", pauseVideoTwo);

function playVideo() {
  player.play();
}

function pauseVideo() {
  player.pause();
}

function playVideoTwo() {
  playerTwo.play();
}

function pauseVideoTwo() {
  playerTwo.pause();
}
