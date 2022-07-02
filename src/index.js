import imgUrl from './tablu1.jpg'
import { AsciiEffect } from './ascii';

// creating canvas
const canvas = document.createElement('canvas');
canvas.id = "Screen";
canvas.style.zIndex = 8;
canvas.style.position = "absolute";
canvas.style.border = "1px solid";
canvas.style.background = "black";
const body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);

const ctx = canvas.getContext('2d');

// creating image
const img = new Image();
img.src = imgUrl;
const ratio = img.height/img.width;
img.width = 1500;
img.height = ratio * 1500;

let size = 15;
let effect;
ctx.font = size + 'px Verdana';

// drawing image
// img.onload = function init() {
//   canvas.width = img.width;
//   canvas.height = img.height;
//   effect = new AsciiEffect(ctx, img, img.width, img.height);
//   ctx.font = size + 'px Verdana';
//   effect.draw(size);
//   console.log(effect)
// };



// creating video
const video = document.createElement("video");
video.setAttribute("playsinline", "");
video.setAttribute("autoplay", "");
video.setAttribute("muted", "");
video.style.width = "1500px";
video.style.height = "1500px";

const facingMode = "user";
const constraints = {
  audio: false,
  video: {
    facingMode
  }
};

function draw(video, context, width, height) {

  effect = new AsciiEffect(ctx, video, width, height);
  effect.draw(size);
//   console.log(effect)


  // context.clearRect (0, 0, width, height);
  // context.drawImage(video, 0, 0, width, height);
  setTimeout(draw, 10, video, context, width, height);
}

navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
  video.srcObject = stream;
});

canvas.width = 1600;
canvas.height = 900;
video.addEventListener('play', function () {
  draw(this, ctx, canvas.width, canvas.height);
}, false);