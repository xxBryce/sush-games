/** @file Main bullet class */
class Bullet {
  /**
   * @param {position} position x and y.
   * @param {HTMLImageElement} image Image for bullet.
   * @param {number} speed Bullet speed.
   * @param {CanvasRenderingContext2D} ctx Canvas context.
   * @param {canvasSize} canvasSize Canvas width and height.
   * @param {number} [damage=1] Bullet damage to collided object.
   * @param {boolean} [isPlayer=false] Does the bullet belong to player?
   */
  constructor(
      position,
      image,
      speed,
      ctx,
      canvasSize,
      damage = 1,
      isPlayer = false
  ) {
    this.position = position;
    this.image = image;
    this.speed = speed;
    this.ctx = ctx;
    this.canvasSize = canvasSize;
    this.damage = damage;
    this.isPlayer = isPlayer;
    this.destroy = false;
    this.size = 5;
    this.scale = 5;
  }

  /** Draw function for bullets. */
  draw() {
    if (!this.destroy && this._isInsideCanvas()) {
      if (!this.isPlayer) {
        this.position.x -= this.speed;
      } else {
        this.position.x += this.speed;
      }
      this.ctx.drawImage(
          this.image,
          0,
          0,
          this.size,
          this.size,
          this.position.x,
          this.position.y,
          this.size * this.scale,
          this.size * this.scale
      );
    } else if (!this.destroy) {
      this._destroy();
    }
  }

  /**
   * Check if player is inside canvas.
   * @return {boolean}
   */
  _isInsideCanvas() {
    const EXTRA = 20;
    const B = {
      x1: 0 - EXTRA,
      y1: 0 - EXTRA,
      x2: this.canvasSize.width + EXTRA,
      y2: this.canvasSize.height + EXTRA,
    };
    const P = {
      x: this.position.x,
      y: this.position.y,
    };
    if (P.x > B.x1 && P.y > B.y1 && P.x < B.x2 && P.y < B.y2) {
      return true;
    } else {
      return false;
    }
  }

  /** Called when bullet is out of canvas. */
  _destroy() {
    this.position = null;
    this.image = null;
    this.speed = null;
    this.isPlayer = null;
    this.ctx = null;
    this.destroy = true;
  }
}
