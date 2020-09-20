class Bullet {
  constructor(x, y, x1,y1,speed,range,damage,tank,buff){
    this.tankX = x;
    this.tankY = y;

    this.x = x;
    this.y = y;

    this.tank = tank;
    this.damage = damage;
    this.buff = buff;

    this.targetX = x1;
    this.targetY = y1;
    var d = dist(this.targetX, this.targetY,this.x, this.y);
    this.speedY = ((this.targetY-this.y)*speed)/d;
    if(this.targetX < this.x){
      this.speedX = -1 * sqrt(speed*speed - this.speedY*this.speedY);
    }
    else{
      this.speedX = sqrt(speed*speed - this.speedY*this.speedY);
    }
    // this.speedX -= this.x;
    // this.speedY -= this.y;
    this.speed = speed;
    this.flying = true;
    this.range = range;
  }
  update(){
    var d = dist(this.tankX, this.tankY, this.x, this.y);
    // var d2 = dist(this.targetX, this.targetY, this.x, this.y);
    if(d > this.range - 1){ //bullet out of range
      this.flying = false;
      return;
    }
    // if(d2 < this.speed){
    //   this.flying = false;
    //   return;
    // }

    this.x += this.speedX;
    this.y += this.speedY;


  }
  hit(){
    for(var i=0;i<ants.length;i++){
      if(dist(ants[i].x,ants[i].y, this.x, this.y)-17 <= 10){
        if(this.buff == "ice" || this.buff == "ice2"){
          if(random(0,1) >= 0.9) ice.play();
        }
        ants[i].life -= this.damage;
        if(ants[i].life <= 0) ants[i].life = 0;

        ants[i].buff = this.buff; //bullet buff


        this.flying = false;

        return;
      }
    }

  }
  show(){
    this.update();
    this.hit();
    // fill(0, 102, 153);
    // textSize(32);
    // text(this.speedX, this.x,this.y-10);
    if(this.tank == "ice"){
      push();
      fill(255,255,255,200);
      stroke(255,255,255,200);
      circle(this.x,this.y,8);
      pop();
    }
    else if(this.tank == "ice2"){
      push();
      fill(255,255,255,200);
      stroke(255,255,255,200);
      circle(this.x,this.y,8);
      pop();
    }
    else if (this.tank == "poison" || this.tank == "poison2") {
      push();
      fill(0,255,0,150);
      noStroke();
      // stroke(0,255,0,200);
      circle(this.x,this.y,10);
      pop();
    }
    else{
      circle(this.x,this.y,5);
    }

  }
}
