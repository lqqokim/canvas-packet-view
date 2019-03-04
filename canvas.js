window.addEventListener('resize', function () {
  const canvasEl = document.getElementById('canvas');
  console.log(window)
  console.log(window.innerWidth, canvasEl.offsetWidth);
  // window.offsetWidth = canvasEl.offsetWidth ;
});


const canvas = document.getElementById('canvas');
if (canvas.getContext) {
  const ctx = canvas.getContext('2d');

  //circle
  drawCircle(ctx);
  drawLines(ctx);
}

function drawCircle(ctx) {
  // ctx.beginPath();
  ctx.strokeStyle = "#426C9D";
  ctx.fillStyle = "#426C9D";
  // ctx.globalAlpha = 0.2;

  for (var i = 0; i < 7; i++) {
    ctx.beginPath();
    ctx.arc(50, 50, 10 + 0.3 * i, 0, Math.PI * 2, true);
    ctx.fill();
  }
}

function drawLines(ctx) {
  ctx.beginPath();
  ctx.moveTo(60, 48);
  ctx.lineTo(400, 48);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(60, 52);
  ctx.lineTo(400, 52);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.stroke();

  
  ctx.beginPath();
  ctx.moveTo(400, 0);
  ctx.lineTo(400, 100)
  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;
  ctx.stroke();
}