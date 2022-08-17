# play-pause-videos-on-click

Playing and pausing videos (YouTube, Vimeo, Wistia) on click (modal open and close)

Clone an example site from Made in Webflow:

link goes here

## Vimeo

[Vimeo Player DSK](https://developer.vimeo.com/player/sdk/reference)

There are a few Vimeo examples in the cloneable above. To set up your Vimeo video, head on over to Vimeo and grab the embed code and then bring it into Webflow and add an `Embed` element to the page where you want the video to appear and paste the code in. Here, you'll want to add an id (we use `id="player1"`). Once you have that set up and you have a Webflow interaction created to open and close the modal, we'll need to add some [javascript](https://github.com/Webflow-Examples/play-pause-videos-on-click/blob/main/vimeo-play.js).

In this example, when users close the modal, the video pauses and if the open it back up the video starts where they left off.

First we need to set varibles for the buttons that open and close our modals:

```js
const playButton = document.querySelector("#btnPlay");
const pauseButton = document.querySelector("#btnPause");
```

These are buttons we have on our page. The `playButton` is the button in our hero to lauch the video and start playback. The `pausebutton` is our button that closes the modal and pauses our video.

We also set our iframe as a variable and then tell Vimeo it's a new player:

```js
const iframe = document.querySelector("#player1");
const player = new Vimeo.Player(iframe);
```

Now it's just JavaScript to execute the play and pause functions that Vimeo has in their API. You can do this many ways, but we added event listeners to the buttons and then used functions:

```js
playButton.addEventListener("click", playVideo);
pauseButton.addEventListener("click", pauseVideo);

function playVideo() {
  player.play();
}

function pauseVideo() {
  player.pause();
}
```

If you take the code from [vimeo-play.js](https://github.com/Webflow-Examples/play-pause-videos-on-click/blob/main/vimeo-play.js) and modify it for your site and add it to the before body section of your page you'll be up and running in no time.

See this working live here:

https://video-play-pause-on-modal.webflow.io/

### Vimeo - set playback to the start of the video on modal close

If you want the video to start from the beginning when the modal is closed you just need to modify that `pauseVideo()` function to include `player.setCurrentTime(0);`. You can use this to set video playback to the position of your choosing.

```js
function pauseVideo() {
  player.pause();
  player.setCurrentTime(0);
}
```

### Mutltiple Vimeo videos on the same page

To have multiple Vimeo videos on a page, you just need to add in a second set of elements to the page. Another `Embed` with your code from Vimeo (don't forget to give it a unique id) and buttons to open and close the modal that goes with it.

Then you'll just duplicate our earlier code. When we set our variables, we need to do it for four buttons:

```js
const playButton = document.querySelector("#btnPlay");
const pauseButton = document.querySelector("#btnPause");
const playButtonTwo = document.querySelector("#btnPlayTwo");
const pauseButtonTwo = document.querySelector("#btnPauseTwo");
```

And we'll need to add in two Vimeo elements:

```js
const iframe = document.querySelector("#player1");
const iframeTwo = document.querySelector("#player2");
const player = new Vimeo.Player(iframe);
const playerTwo = new Vimeo.Player(iframeTwo);
```

And we'll need new functions for our new buttons. I won't go into the full setup, but you can see it live here:

https://video-play-pause-on-modal.webflow.io/vimeo-multiple-videos-on-one-page

You can check out our [vimeo-multiple.js](https://github.com/Webflow-Examples/play-pause-videos-on-click/blob/main/vimeo-multiple.js) file to see all the code.

## YouTube

[YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference)

YouTube is a little different in that you don't need the embed code for a video, but you will need the ID for the video you want to use. Again, just like with Vimeo, you'll want to set up your modal and interaction in Webflow. Then, when you add the `Embed` element to the page instead of adding the embed code from YouTube you'll use something like this:

```html
<style>
  .embed-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    max-width: 100%;
  }
  .embed-container iframe,
  .embed-container object,
  .embed-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
<div class="embed-container"><div id="player"></div></div>
```

Style it to your liking, and YouTube will use the API to insert the video into the empty div at the bottom of the code.

In this example, when users close the modal, the video pauses and if the open it back up the video starts where they left off.

Now lets write the JavaScript:

```js
const playButton = document.querySelector("#btnPlay");
const pauseButton = document.querySelector("#btnPause");
const embedPlayer = document.querySelector("#player");
```

Just like with Vimeo, we need to make our buttons variable, and we'll also use the id of the div in our embed and make it a variable.

Next we add a script tag to the page:

```js
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
```

Next, we create our player as a variable and then use the YouTube API to update it:

```js
let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player(embedPlayer, {
    videoId: "-ChLT7b2Gj8",
    playerVars: {
      playsinline: 1,
    },
  });
}
```

We pass our `embedPlayer` through so it knows where the video should go and in the function we also pass through the `videoId`.

From there, now that we have a player we add our event listeners to our buttons and then our functions to play and pause the video. You'll see it looks very similar to the Vimeo setup:

```js
playButton.addEventListener("click", playVideo);
pauseButton.addEventListener("click", pauseVideo);

function playVideo() {
  player.playVideo();
}

function pauseVideo() {
  player.pauseVideo();
}
```

### YouTube - set playback to the start of the video on modal close

If you want the video to start over when they click play again, then we'll just modify the `pauseVideo()` function just like we did with Vimeo:

```js
function pauseVideo() {
  player.pauseVideo();
  player.seekTo(0, false);
}
```

Again, you can use this to seek to any point in the video. You can see the full example for this in our [youtube-reset-time.js](https://github.com/Webflow-Examples/play-pause-videos-on-click/blob/main/youtube-reset-time.js) file.

## Wistia

[Wistia JavaScript Player API](https://wistia.com/support/developers/player-api)

You'll notice that the Wistia setup is different from YouTube and Vimeo. For Wistia we're setting an event listener and using anonymous functions.

```js
document.querySelector("#btnPlay").addEventListener("click", function () {
  _wq.push({
    id: "o8x6mi9ahd",
    onReady: function (video) {
      video.play();
    },
  });
});
```

We're doing this for both the button play and pause. You can see we have the similar `video.play()` function that is called. To set the time on the video to move back to the beginning we can just add this to the event where we need it:

```js
video.time(0);
```
