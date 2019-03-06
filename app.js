window.addEventListener('DOMContentLoaded', function () {
  initCanvas();
});

let canvasBullet; // 패킷 날아가는 것 관련 canvas
let canvasLayout; // 라인과 텍스트관련 레이아웃 canvas
let ctxBullet, ctxLayout; // canvas context
let parentEl;
let start, progress; // requestAnimationFrame animation에서 사용
const image = new Image(); // 패킷 image 객체

let parentWidth, parentHeight;
const IMAGE_PATH = { // 색상별 패킷 이미지 경로
  BLUE: "./images/SpeedSQ_Blue.png",
  RED: "./images/SpeedSQ_Red.png",
  YELLOW: "./images/SpeedSQ_Yellow.png"
};

function initCanvas() {
  canvasBullet = document.getElementById('canvasBullet');
  canvasLayout = document.getElementById('canvasLayout');

  parentEl = canvasBullet.parentNode;
  parentWidth = parentEl.offsetWidth;
  parentHeight = parentEl.offsetHeight;

  if (canvasBullet.getContext && canvasLayout.getContext) {
    ctxBullet = canvasBullet.getContext('2d');
    ctxLayout = canvasLayout.getContext('2d');

    image.src = IMAGE_PATH.BLUE;
    initCanvasBullet();
    initCanvasLayout();
    bindResizeEvent();
  };
}

// bullet canvas 사이즈 설정
function initCanvasBullet() {
  ctxBullet.canvas.width = parentEl.offsetWidth;
  ctxBullet.canvas.height = parentEl.offsetHeight;
  drawBullet();
}

// layout canvas 사이즈 설정
function initCanvasLayout() {
  ctxLayout.canvas.width = parentEl.offsetWidth;
  ctxLayout.canvas.height = parentEl.offsetHeight;
  drawLinesAndText();
}

// start animation
function drawBullet(timestamp) {
  if (!start || progress > 5000) {
    start = timestamp;
  }
  progress = (timestamp - start) / 10 * 50;

  moveBullet(progress);
  window.requestAnimationFrame(drawBullet);
}

function moveBullet(progress) {
  ctxBullet.clearRect(0, 0, ctxBullet.canvas.width, ctxBullet.canvas.height);
  ctxBullet.drawImage(image, progress, 390);
}
// end animation

//브라우저 리사이즈 되면 각각의 캔버스 사이즈 다시 잡아준다
function bindResizeEvent() {
  let timer;

  window.addEventListener('resize', () => {
    timer && clearTimeout(timer);
    timer = setTimeout(this.changeCanvasSize, 500);
  });
}

function changeCanvasSize() {
  initCanvasBullet();
  initCanvasLayout();
}

function drawLinesAndText() {
  // 들어가는 경로
  ctxLayout.beginPath();
  ctxLayout.moveTo(50, 400);
  ctxLayout.lineTo(500, 400);
  ctxLayout.strokeStyle = "rgb(255, 255, 255, 0.1)";
  ctxLayout.lineWidth = 2;
  ctxLayout.stroke();

  //중간 영역 시작
  ctxLayout.beginPath();
  ctxLayout.moveTo(500, 350);
  ctxLayout.lineTo(500, 450)
  ctxLayout.strokeStyle = "rgb(255, 255, 255, 0.5)";
  ctxLayout.lineWidth = 3;
  ctxLayout.stroke();

  ctxLayout.beginPath();
  ctxLayout.moveTo(800, 350);
  ctxLayout.lineTo(800, 450)
  ctxLayout.strokeStyle = "rgb(255, 255, 255, 0.5)";
  ctxLayout.lineWidth = 3;
  ctxLayout.stroke();
  // 중간 영역 끝

  // 나가는 경로
  ctxLayout.beginPath();
  ctxLayout.moveTo(800, 400);
  ctxLayout.lineTo(1250, 400);
  ctxLayout.strokeStyle = "rgb(255, 255, 255, 0.1)";
  ctxLayout.lineWidth = 2;
  ctxLayout.stroke();

  // 텍스트들
  ctxLayout.fillStyle = "rgb(182, 183, 187)"
  ctxLayout.font = '20px MS';
  ctxLayout.fillText('54', 20, 300);
  ctxLayout.font = '22px MS';
  ctxLayout.fillStyle = "rgb(182, 183, 187)"
  ctxLayout.fillText('현재 전체 건수', 50, 300);
  ctxLayout.fillText('요청/초', 70, 350);
  ctxLayout.fillText('정상', 500, 300);
  ctxLayout.fillText('경고', 650, 300);
  ctxLayout.fillText('심각', 800, 300);
  ctxLayout.fillText('응답/초', 1200, 350);
  ctxLayout.fillText('3', 50, 350);
  ctxLayout.fillText('3', 1280, 350);
  ctxLayout.font = '20px MS';
  ctxLayout.fillStyle = "blue";
  ctxLayout.fillText('10', 480, 300);
  ctxLayout.fillStyle = "yellow";
  ctxLayout.fillText('15', 630, 300);
  ctxLayout.fillStyle = "red";
  ctxLayout.fillText('16', 780, 300);
}