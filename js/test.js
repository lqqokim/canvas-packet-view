window.addEventListener('DOMContentLoaded', function () {
  initCanvas();
});

let canvas, ctx, canvasArea;
const fps = 30;

let i = 0;
const image = new Image();
image.src = "./images/SpeedSQ_Blue.png"

function initCanvas() {
  canvas = document.getElementById('canvas');
  canvasArea = document.getElementsByClassName('canvas-area');

  if (canvas.getContext) {
    ctx = canvas.getContext('2d');
    this.setCanvasSize();
    this.bindResizeEvent();
    loop();
  };
}

function requestAnimationFrame() {
  
}

function loop() {
  setTimeout(function () {
    i++;
    ctx.clearRect(0, 0, 500, 500);
    ctx.drawImage(image, i * 30, 100);

    loop(i);
  }, 1000 / fps);
}

function setCanvasSize() {
  const parentEl = canvas.parentNode;
  ctx.canvas.width = parentEl.offsetWidth;
  ctx.canvas.height = parentEl.offsetHeight;
}

function bindResizeEvent() {
  let timer;

  window.addEventListener('resize', () => {
    timer && clearTimeout(timer);
    timer = setTimeout(this.setCanvasSize, 500);
  });
}
