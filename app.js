window.addEventListener('DOMContentLoaded', function () {
  init();
});

let canvasBullet; // 패킷 날아가는 것 관련 canvas
let canvasLayout; // 라인과 텍스트관련 레이아웃 canvas
let ctxBullet, ctxLayout; // canvas context
let start, progress; // requestAnimationFrame animation에서 사용
const image = new Image(); // 패킷 image 객체
const packets = []; // 패킷들 저장 공간

let parentWidth, parentHeight;
const IMAGE_PATH = { // 색상별 패킷 이미지 경로
  BLUE: "./images/SpeedSQ_Blue.png",
  RED: "./images/SpeedSQ_Red.png",
  YELLOW: "./images/SpeedSQ_Yellow.png"
};

let xPos; // 최초 layout canvas 시작포인트
let ratioWidth, ratioHeight; // resize를 위한 width, height 비율값 

function init() {
  canvasBullet = document.getElementById('canvasBullet');
  canvasLayout = document.getElementById('canvasLayout');

  if (canvasBullet.getContext && canvasLayout.getContext) {
    ctxBullet = canvasBullet.getContext('2d');
    ctxLayout = canvasLayout.getContext('2d');

    image.src = IMAGE_PATH.BLUE;
    initCanvasSize();
    bindResizeEvent();
  };
}

// canvas의 parent element 사이즈를 계산
function parentSize() {
  const parentEl = canvasBullet.parentNode;
  ratioWidth = parentEl.offsetWidth * 1 / 5;
  ratioHeight = parentEl.offsetHeight * 1 / 2;
  xPos = ratioWidth * 0.1;

  return {
    width: parentEl.offsetWidth,
    height: parentEl.offsetHeight
  }
}

// bullet canvas 사이즈 설정
function initCanvasBullet() {
  canvasBullet.width = parentSize().width;
  canvasBullet.height = parentSize().height;
  drawBullet();
}

// layout canvas 사이즈 설정
function initCanvasLayout() {
  let textFont;

  canvasLayout.width = parentSize().width;
  canvasLayout.height = parentSize().height;

  if (canvasLayout.width >= 1000) {
    textFont = '22px MS';
  } else if (canvasLayout.width < 1000 && canvasLayout.width >= 600) {
    textFont = '18px MS';
  } else {
    textFont = '13px MS';
  }

  drawLayoutLines();
  drawLayoutText(textFont);
}

// start animation
function drawBullet(timestamp) {
  if (!start || progress > 5000) {
    start = timestamp;
  }
  progress = (timestamp - start) / 10 * 50;

  moveBullet(progress);
  window.requestAnimationFrame(drawBullet); // requestAnimationFrame api
}

function moveBullet(progress) {
  ctxBullet.clearRect(0, 0, ctxBullet.canvas.width, ctxBullet.canvas.height); // 기존것 삭제
  ctxBullet.drawImage(image, progress, ratioHeight - 10); // 다시 그린다
}
// end animation

//resize 되면 각각의 캔버스 사이즈 다시 잡아준다
function bindResizeEvent() {
  let timer;

  window.addEventListener('resize', () => {
    timer && clearTimeout(timer);
    timer = setTimeout(this.initCanvasSize, 500);
  });
}

// resize 되었을때 canvas 사이즈를 다시 설정해준다.
function initCanvasSize() {
  initCanvasBullet();
  initCanvasLayout();
}

function drawLayoutLines() {
  // 들어가는 경로
  const inputPath = ctxLayout;
  inputPath.beginPath();
  inputPath.strokeStyle = "rgb(255, 255, 255, 0.1)";
  inputPath.lineWidth = 2;
  inputPath.moveTo(xPos, ratioHeight);
  inputPath.lineTo(ratioWidth * 2 - xPos, ratioHeight);
  inputPath.stroke();

  // 나가는 경로
  const outputPath = ctxLayout;
  outputPath.beginPath();
  outputPath.moveTo(ratioWidth * 3, ratioHeight);
  outputPath.lineTo(ratioWidth * 5 - xPos, ratioHeight);
  outputPath.stroke();

  //중간 영역 시작
  const centerBegin = ctxLayout;
  centerBegin.beginPath();
  inputPath.strokeStyle = "rgb(255, 255, 255, 0.3)";
  inputPath.lineWidth = 2;
  centerBegin.moveTo(ratioWidth * 2 - xPos, ratioHeight - 50);
  centerBegin.lineTo(ratioWidth * 2 - xPos, ratioHeight + 50)
  centerBegin.stroke();

  // 중간 영역 끝
  const centerEnd = ctxLayout;
  centerEnd.beginPath();
  centerEnd.moveTo(ratioWidth * 3, ratioHeight - 50);
  centerEnd.lineTo(ratioWidth * 3, ratioHeight + 50)
  centerEnd.stroke();
}

function drawLayoutText(textFont) {
  const currentAllCount = ctxLayout;
  currentAllCount.font = textFont;
  currentAllCount.fillStyle = "rgb(182, 183, 187)";
  currentAllCount.fillText('54', 20, ratioHeight - 100);

  const currentAllCountText = ctxLayout;
  currentAllCountText.fillText('현재 전체 건수', 50, ratioHeight - 100);

  const requestsPerSecond = ctxLayout;
  requestsPerSecond.fillText('3', 50, ratioHeight - 50);

  const requestsPerSecondText = ctxLayout;
  requestsPerSecondText.fillText('요청/초', 70, ratioHeight - 50);

  const responsesPerSecond = ctxLayout;
  responsesPerSecond.fillText('응답/초', (ratioWidth * 5 - xPos) - 100, ratioHeight - 50);

  const responsesPerSecondText = ctxLayout;
  responsesPerSecondText.fillText('3', (ratioWidth * 5 - xPos) - 20, ratioHeight - 50);

  const normalText = ctxLayout;
  normalText.fillText('정상', (ratioWidth * 2 - xPos) - 10, ratioHeight - 70);

  const warningText = ctxLayout;
  warningText.fillText('경고', (ratioWidth * 3 - xPos) * 5 / 6, ratioHeight - 70);

  const alarmText = ctxLayout;
  alarmText.fillText('심각', (ratioWidth * 3 - xPos) + 10, ratioHeight - 70);

  const normalCount = ctxLayout;
  normalCount.fillStyle = "blue";
  normalCount.fillText('10', ratioWidth * 2 - xPos - 40, ratioHeight - 70);

  const warningCount = ctxLayout;
  warningCount.fillStyle = "yellow";
  warningCount.fillText('15', (ratioWidth * 3 - xPos) * 5 / 6 - 30, ratioHeight - 70);

  const alarmCount = ctxLayout;
  alarmCount.fillStyle = "red";
  alarmCount.fillText('16', (ratioWidth * 3 - xPos) - 20, ratioHeight - 70);
}