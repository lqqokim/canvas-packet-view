window.addEventListener('DOMContentLoaded', function () {
  initCanvas();
});

//global variables
let canvas_first, canvas_second, ctx_first, ctx_second, canvasArea, handle;
let WIDTH, HEIGHT;

let nextTime = 0;
let duration = 1000;

const image = new Image();

function initCanvas() {
  canvas_first = document.getElementById('canvas_first');
  canvas_second = document.getElementById('canvas_second');
  canvasParentEl = document.getElementsByClassName('canvas-area');

  if (canvas_first.getContext && canvas_second.getContext) {
    ctx_first = canvas_first.getContext('2d');
    ctx_second = canvas_second.getContext('2d');

    image.src = "./images/SpeedSQ_Blue.png";
    setCanvasSize();
    bindResizeEvent();

  };
}

function getElement() {

}

let start, progress;

function step(timestamp) {
  if (!start || progress > 3000) {
    start = timestamp;
  }
  progress = (timestamp - start) / 10 * 50;

  moveBullet(progress);
  handle = window.requestAnimationFrame(step);
}

function moveBullet(progress) {
  ctx_first.clearRect(0, 0, ctx_first.canvas.width, ctx_first.canvas.height);
  ctx_first.drawImage(image, progress, 390);
}

function setCanvasSize() {
  const parentEl = canvas_first.parentNode;

  HEIGHT = parentEl.offsetWidth;
  WIDTH = parentEl.offsetHeight;

  ctx_first.canvas.width = parentEl.offsetWidth;
  ctx_first.canvas.height = parentEl.offsetHeight;

  ctx_second.canvas.width = parentEl.offsetWidth;
  ctx_second.canvas.height = parentEl.offsetHeight;

  drawLines();
  step();
}

function bindResizeEvent() {
  let timer;

  window.addEventListener('resize', () => {
    timer && clearTimeout(timer);
    timer = setTimeout(this.setCanvasSize, 500);
  });
}

function drawLines() {
  ctx_second.beginPath();
  ctx_second.moveTo(50, 400);
  ctx_second.lineTo(500, 400);
  ctx_second.strokeStyle = "rgb(255, 255, 255, 0.1)";
  ctx_second.lineWidth = 2;
  ctx_second.stroke();

  ctx_second.beginPath();
  ctx_second.moveTo(500, 350);
  ctx_second.lineTo(500, 450)
  ctx_second.strokeStyle = "rgb(255, 255, 255, 0.5)";
  ctx_second.lineWidth = 3;
  ctx_second.stroke();

  ctx_second.beginPath();
  ctx_second.moveTo(800, 350);
  ctx_second.lineTo(800, 450)
  ctx_second.strokeStyle = "rgb(255, 255, 255, 0.5)";
  ctx_second.lineWidth = 3;
  ctx_second.stroke();

  ctx_second.beginPath();
  ctx_second.moveTo(800, 400);
  ctx_second.lineTo(1250, 400);
  ctx_second.strokeStyle = "rgb(255, 255, 255, 0.1)";
  ctx_second.lineWidth = 2;
  ctx_second.stroke();


  ctx_second.fillStyle = "rgb(182, 183, 187)"

  ctx_second.font = '20px MS';
  ctx_second.fillText('54', 20, 300);

  ctx_second.font = '22px MS';
  ctx_second.fillStyle = "rgb(182, 183, 187)"
  ctx_second.fillText('현재 전체 건수', 50, 300);
  ctx_second.fillText('요청/초', 70, 350);
  ctx_second.fillText('정상', 500, 300);
  ctx_second.fillText('경고', 650, 300);
  ctx_second.fillText('심각', 800, 300);
  ctx_second.fillText('응답/초', 1200, 350);

  // ctx_second.font = '16px MS';
  ctx_second.fillText('3', 50, 350);
  ctx_second.fillText('3', 1280, 350);

  ctx_second.font = '20px MS';
  ctx_second.fillStyle = "blue";
  ctx_second.fillText('10', 480, 300);
  ctx_second.fillStyle = "yellow";
  ctx_second.fillText('15', 630, 300);
  ctx_second.fillStyle = "red";
  ctx_second.fillText('16', 780, 300);
}
