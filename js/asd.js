window.addEventListener('resize', function () {
  const canvasEl = document.getElementById('canvas');
  console.log(window)
  console.log(window.innerWidth, canvasEl.offsetWidth);
  // window.offsetWidth = canvasEl.offsetWidth ;
});

// import MainController from './controllers/MainController.js'

// document.addEventListener('DOMContentLoaded', () => {
//     MainController.init()
// })


const canvas = document.getElementById('canvas');
const canvasArea = document.getElementsByClassName('canvas-area');
if (canvas.getContext) {
  const ctx = canvas.getContext('2d');
  const WIDTH = canvasArea[0].offsetWidth;
  const HEIGHT = canvasArea[0].offsetHeight;

  // const WIDTH = canvasArea.offsetWidth;
  // const HEIGHT = canvasArea.offsetHeight;
  console.log(WIDTH, HEIGHT);

  document.getElementById('canvas').addEventListener('click', () => {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
  });
  
  //circle
  circle(ctx);
  lines(ctx);

  // for (let i = 0; i < 1200; i++) {
  //   move(i);
  // }

  // function move(x) {
  //   setTimeout(function () {
  //     ctx.clearRect(0, 0, 300, 600)
  //     ctx.beginPath();
  //     x = x % 300;
  //     ctx.fillRect(x, 550, 50, 30);
  //   }, 3 * x);
  // }
}

function circle(ctx) {

  ctx.strokeStyle = "#426C9D";
  // ctx.fillStyle = "rgb(66,108,157, 0.9)"

  // ctx.beginPath();
  // ctx.arc(200, 60, 10, 30 * Math.PI / 180, 120 * Math.PI / 180, true);
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.fillStyle = `rgb(66,108,157,${0.3 * i})`
    ctx.arc(150, 260, 5 * i, 0, Math.PI * 2, true);
    ctx.fill();
  }
  // ctx.arc(150, 60, 20, 0, Math.PI * 2, true);
  // ctx.fill();

  ctx.beginPath();
  ctx.moveTo(50, 260);
  ctx.fillStyle = "rgb(66,108,157, 0.3)"
  ctx.lineTo(150, 240);
  ctx.lineTo(150, 280);
  ctx.fill();
}

function lines(ctx) {
  ctx.beginPath();
  ctx.moveTo(50, 260);
  ctx.lineTo(500, 260);
  ctx.strokeStyle = "rgb(255, 255, 255, 0.1)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // ctx.beginPath();
  // ctx.moveTo(60, 52);
  // ctx.lineTo(400, 52);
  // ctx.strokeStyle = "white";
  // ctx.lineWidth = 1;
  // ctx.stroke();


  // ctx.beginPath();
  // ctx.moveTo(400, 0);
  // ctx.lineTo(400, 100)
  // ctx.strokeStyle = "white";
  // ctx.lineWidth = 3;
  // ctx.stroke();
}