

export class LoadingScreen {

  constructor(){
    this.logo = new Image();
    this.logo.src = "./logo/clean.png";

    this.progress = 0;
    this.fade = 0;
  }

  update(dt){
    // fake loading
    this.progress += dt * 0.4;
    if(this.progress > 1) this.progress = 1;

    // fade in
    this.fade += dt;
    if(this.fade > 1) this.fade = 1;
  }

  draw(ctx, width, height){

    // fondo negro
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.globalAlpha = this.fade;

    // ---------------- LOGO ----------------
    const logoSize = 200;
    ctx.drawImage(
      this.logo,
      width/2 - logoSize/2,
      height/2 - 150,
      logoSize,
      logoSize
    );

    // ---------------- TEXTO ----------------
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Loading...", width/2 - 50, height/2 + 80);

    // ---------------- BARRA ----------------
    const barWidth = 300;
    const barHeight = 20;

    const x = width/2 - barWidth/2;
    const y = height/2 + 100;

    // fondo barra
    ctx.fillStyle = "#222";
    ctx.fillRect(x, y, barWidth, barHeight);

    // progreso
    ctx.fillStyle = "#00ffcc";
    ctx.fillRect(x, y, barWidth * this.progress, barHeight);

    ctx.restore();
  }

  isDone(){
    return this.progress >= 1;
  }
}