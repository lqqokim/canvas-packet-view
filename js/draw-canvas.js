import Bullet from './bullet.js';

export default {
  init() {
    this.canvasEl = document.getElementById('canvas');
    this.setCanvasSize = this.setCanvasSize.bind(this);
    if (this.canvasEl.getContext) {
      this.ctx = this.canvasEl.getContext('2d');

      Bullet.setup(this.ctx);
      this.setCanvasSize();
      this.bindEvents();
      this.drawBullet();
    }
  },

  setCanvasSize() {
    const parentEl = this.canvasEl.parentNode;
    this.ctx.canvas.width = parentEl.offsetWidth;
    this.ctx.canvas.height = parentEl.offsetHeight;
    // this.drawBullet();
  },

  bindEvents() {
    let timer;

    window.addEventListener('resize', () => {
      timer && clearTimeout(timer);
      timer = setTimeout(this.setCanvasSize, 500);
    });
  },


  drawBullet() {
    const ctx = this.canvasEl.getContext('2d');
    ctx.strokeStyle = "#426C9D";
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.fillStyle = `rgb(66,108,157,${0.3 * i})`
      ctx.arc(150, 260, 5 * i, 0, Math.PI * 2, true);
      ctx.fill();
    }

    ctx.beginPath();
    ctx.moveTo(50, 260);
    ctx.fillStyle = "rgb(66,108,157, 0.3)"
    ctx.lineTo(150, 240);
    ctx.lineTo(150, 280);
    ctx.fill();
  }
}