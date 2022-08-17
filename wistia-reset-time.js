document.querySelector("#btnPlay").addEventListener("click", function () {
  _wq.push({
    id: "o8x6mi9ahd",
    onReady: function (video) {
      video.time(0);
      video.play();
    },
  });
});

document.querySelector("#btnPause").addEventListener("click", function () {
  window._wq.push({
    id: "o8x6mi9ahd",
    onReady: function (video) {
      video.pause();
    },
  });
});
