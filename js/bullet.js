import View from './view.js';

const Bullet = Object.create(View);

Bullet.setup = function (ctx) {
  this.init(ctx)
  // this.draw(ctx);
  return this;
}

Bullet.draw = function (ctx) {
  // const ctx = this.ctx;

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

  console.log('d')
}

export default Bullet;