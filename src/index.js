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

const img = new Image();
img.src = imgUrl;
const ratio = img.height/img.width;
img.width = 1500;
img.height = ratio * 1500;

let size = 15;
let effect;
img.onload = function init() {
  canvas.width = img.width;
  canvas.height = img.height;
  effect = new AsciiEffect(ctx, img, img.width, img.height);
  ctx.font = size + 'px Verdana';
  effect.draw(size);
  console.log(effect)
}