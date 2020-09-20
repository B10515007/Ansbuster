class Cake {
  constructor() {
    this.left = 8;
    this.carring = 0;
    this.x = edgeX-80;
    this.y = edgeY-80;
  }
  show(){
    push();
    stroke('white');
    fill(226, 228, 229);
    circle(this.x,this.y,130);
    fill(240, 241, 242);
    circle(this.x,this.y,100);
    fill('pink');
    arc(this.x, this.y, 100, 100, radians(-45), radians(-45+this.left*45), PIE);
    fill(246, 216, 218);
    arc(this.x, this.y, 80, 80, radians(-45), radians(-45+this.left*45), PIE);
    var d=45;
    var t = createVector(0,0);
    for(var i=0;i<this.left; i++){
      t.x = (this.x+12-this.x)*cos(radians(d)) - (this.y-30-this.y)*sin(radians(d)) + this.x;
      t.y = (this.x+12-this.x)*sin(radians(d)) + (this.y-30-this.y)*cos(radians(d)) + this.y;
      d += 45;
      stroke('black');
      strokeWeight(1);
      fill(236, 90, 91);
      circle(t.x,t.y,15);
    }
    noFill();
    stroke(240, 241, 242,100);
    circle(this.x,this.y,340);
    pop();
  }
}
class CakeFly {
  constructor(x,y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
  }
  back(){
    var d = dist(this.x,this.y,edgeX - 80,edgeY - 80);
    if(d < 40) return true;
    return false;
  }
  show(){
    push();
    this.x += (edgeX - 80 -this.x)/20;
    this.y += (edgeY - 80 -this.y)/20;
    translate(this.x,this.y);
    rotate(this.angle);
    stroke('white');
    fill('pink');
    arc(0+20, 0, 100, 100, radians(-202.5), radians(-157.5), PIE);
    fill(246, 216, 218);
    arc(0+20, 0, 80, 80, radians(-202.5), radians(-157.5), PIE);
    stroke('black');
    strokeWeight(1);
    fill(236, 90, 91);
    circle(0-12,0,15);
    pop();
  }
}
