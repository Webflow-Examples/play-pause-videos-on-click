const playButton = document.querySelector("#btnPlay");
const pauseButton = document.querySelector("#btnPause");
const embedPlayer = document.querySelector("#player");

const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player(embedPlayer, {
    videoId: "-ChLT7b2Gj8",
    playerVars: {
      playsinline: 1,
    },
  });
}

playButton.addEventListener("click", playVideo);
pauseButton.addEventListener("click", pauseVideo);

function playVideo() {
  player.playVideo();
}

function pauseVideo() {
  player.pauseVideo();
}
