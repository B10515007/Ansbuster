class Tank {
  constructor(x,y,move) {
    this.type = tankInfo["tank"]["type"];
    this.x = x;// XXX:
    this.y = y;//;
    this.out = false;
    this.range = tankInfo["tank"]["range"];
    this.centerX = this.x;
    this.centerY = this.y;
    this.bullets = [];
    this.speed = tankInfo["tank"]["speed"];;
    this.rate = tankInfo["tank"]["rate"];;
    this.moving = move;
    this.damage = tankInfo["tank"]["damage"];;
    this.selected = true;
    this.multiTarget = false;
    this.angleDegree = 0;
    this.vabrate = 0;
    this.shoot = 0;
    this.async = getRandom(this.rate);//this function is in sketch
  }

  updateLocate(x, y){
    this.x = x;
    this.y = y;
    this.centerX = x;
    this.centerY = y;
    noFill();
    push();
    if(this.out == true){
      fill(255, 0, 0, 100);
    }else{
      fill(0, 102, 153, 10);
    }
    stroke(0,0,0, 51);
    circle(this.centerX,this.centerY,this.range*2);
    pop();
  }

  isInrange(x,y){
    if(dist(x,y, this.centerX, this.centerY)-17 <= this.range){
      return true;
    }
    return false;
  }
  detect(){
    if(this.moving) return;
    var t = createVector(-1,-1);
    var target = false;
    var lock = false;
    var antlist = [];
    for(var i=0; i< ants.length;i++){
      if(this.isInrange(ants[i].x,ants[i].y)){
        target = true;
        antlist.push(ants[i]);
      }
    }
    if(!target)return;  //no target in range

    if(this.multiTarget == true){ //multitarget On
      for(var i=0; i< antlist.length;i++){
        this.bullets.push(new Bullet(this.centerX, this.centerY,antlist[i].x, antlist[i].y,this.speed,
          this.range, this.damage,this.type, "none"));
      }
    }else{    //no multitarget
      for(var i=0; i< antlist.length;i++){
        if(antlist[i].selected == true){
          t.x = antlist[i].x;
          t.y = antlist[i].y;
          lock = true;
          break;
        }
      }
      if(!lock){ //no one locked, hit first one
        t.x = antlist[0].x;
        t.y = antlist[0].y;
      }
    this.bullets.push(new Bullet(this.centerX, this.centerY,t.x, t.y,this.speed,
       this.range, this.damage,this.type, "none"));
       this.shoot = 2;
    }
    this.angleDegree = this.calangle(createVector(this.centerX, this.centerY), createVector(this.centerX+5, this.centerY),t);

  }
  calangle(o,h,t){
    //calculate angle o
    var ot = dist(o.x,o.y,t.x,t.y);
    var oh = dist(o.x,o.y,h.x,h.y);
    var ht = dist(h.x,h.y,t.x,t.y);
    var angle = acos((ht*ht-ot*ot-oh*oh) / (-2*oh*ot));
    //calculate counterclockwise or clockwise
    // note: oh is a horizontal line
    if(t.y < o.y){
      angle *= -1;
    }
    return angle;

  }
  draw(){
    push();
    fill(155); //gray
    stroke(255,255,255,100); //white
    square(this.x-10,this.y-10,20, radians(120));
    square(this.x-7.5,this.y-7.5,15,radians(120));

    push();
    fill(103, 106, 107);
    translate(this.centerX,this.centerY);
    rotate(this.angleDegree);

    if(this.shoot != 0){
      this.vabrate = 5;
      this.shoot -= 1;
    }
    else if(this.shoot == 0){
      this.vabrate = 0;
    }

    rect(0-5-this.vabrate,0 -4,20,8);
    pop();
    noFill();
    pop();
    if(this.selected){
      push();
      stroke(0,0,0, 51)
      fill(0, 102, 153, 20);
      circle(this.centerX,this.centerY,this.range*2);
      pop();
    }
  }
  show(){
    this.draw();
    if(frameCount%Math.ceil(60/this.rate) == this.async){
      this.detect();
    }
    for(var i = 0;i< this.bullets.length;i++){
      if(this.bullets[i].flying == false){
        this.bullets.splice(i,1);
        continue;
      }
      this.bullets[i].show();
    }
  }
}

class Attack extends Tank {
  constructor(x,y,move) {
    super(x,y,move);
    this.type = tankInfo["attack"]["type"];
    this.damage = tankInfo["attack"]["damage"];
    this.rate = tankInfo["attack"]["rate"];
    this.speed = tankInfo["attack"]["speed"];
    this.range = tankInfo["attack"]["range"];
    this.async = getRandom(this.rate);
  }

  draw(){
    push();
    fill(100); //gray
    stroke(255,255,255,100); //white
    square(this.x-12.5,this.y-12.5,25, radians(120));
    fill(120, 21, 23);
    square(this.x-9.5,this.y-9.5,19,radians(120));

    push();
    fill(172, 121, 80);
    translate(this.centerX,this.centerY);
    rotate(this.angleDegree);

    if(this.shoot != 0){
      this.vabrate = 5;
      this.shoot -= 1;
    }
    else if(this.shoot == 0){
      this.vabrate = 0;
    }
    noStroke();
    rect(0-4-this.vabrate,0 -5,25,10,radians(720));
    pop();
    noFill();
    pop();
    if(this.selected){
      push();
      stroke(0,0,0, 51)
      fill(0, 102, 153, 20);
      circle(this.centerX,this.centerY,this.range*2);
      pop();
    }
  }
}

class Support extends Tank {
  constructor(x,y,move) {
    super(x,y,move);
    this.type = tankInfo["support"]["type"];
    this.damage = tankInfo["support"]["damage"];
    this.rate = tankInfo["support"]["rate"];
    this.speed = tankInfo["support"]["speed"];
    this.range = tankInfo["support"]["range"];
    this.async = getRandom(this.rate);
  }
  draw(){
    push();
    fill(100); //gray
    stroke(255,255,255,100); //white
    square(this.x-12.5,this.y-12.5,25, radians(360));
    fill(112, 160, 187);
    square(this.x-8.5,this.y-8.5,17,radians(120));

    push();
    fill(222, 224, 223);
    translate(this.centerX,this.centerY);
    rotate(this.angleDegree);

    if(this.shoot != 0){
      this.vabrate = 5;
      this.shoot -= 1;
    }
    else if(this.shoot == 0){
      this.vabrate = 0;
    }
    noStroke();
    rect(0-4-this.vabrate,0 -4,20,8,radians(360));
    pop();
    noFill();
    pop();
    if(this.selected){
      push();
      stroke(0,0,0, 51)
      fill(0, 102, 153, 20);
      circle(this.centerX,this.centerY,this.range*2);
      pop();
    }
  }
}

class Single extends Attack{
  constructor(x,y,move) {
    super(x,y,move);
    this.type = tankInfo["single"]["type"];
    this.damage = tankInfo["single"]["damage"];
    this.rate = tankInfo["single"]["rate"];
    this.speed = tankInfo["single"]["speed"];
    this.range = tankInfo["single"]["range"];
    this.async = getRandom(this.rate);
  }
  draw(){
    push();
    fill(100); //gray
    stroke(255,255,255,100); //white
    quad(this.x-20,this.y,this.x,this.y-20,this.x+20,this.y,this.x,this.y+20);
    square(this.x-12.5,this.y-12.5,25, radians(120));
    fill(228, 68, 49);
    square(this.x-9.5,this.y-9.5,19,radians(120));


    push();
    fill(69, 68, 185);
    translate(this.centerX,this.centerY);
    rotate(this.angleDegree);

    if(this.shoot != 0){
      this.vabrate = 5;
      this.shoot -= 1;
    }
    else if(this.shoot == 0){
      this.vabrate = 0;
    }
    noStroke();
    circle(0,0,15);
    rect(0-4-this.vabrate,0 -5,28,10,radians(200));
    pop();
    noFill();
    pop();
    if(this.selected){
      push();
      stroke(0,0,0, 51)
      fill(0, 102, 153, 20);
      circle(this.centerX,this.centerY,this.range*2);
      pop();
    }
  }
}
class Rocket extends Single {
  constructor(x,y,move) {
    super(x,y,move);
    this.type = tankInfo["rocket"]["type"];
    this.damage = tankInfo["rocket"]["damage"];
    this.rate = tankInfo["rocket"]["rate"];
    this.speed = tankInfo["rocket"]["speed"];
    this.range = tankInfo["rocket"]["range"];
    this.async = getRandom(this.rate);
  }
  draw(){
    push();
    fill(88, 116, 214); //gray
    stroke(255,255,255,100); //white
    quad(this.x-20,this.y,this.x,this.y-20,this.x+20,this.y,this.x,this.y+20);
    square(this.x-12.5,this.y-12.5,25, radians(120));
    fill(228, 68, 49);
    square(this.x-9.5,this.y-9.5,19,radians(120));


    push();
    fill(73);
    translate(this.centerX,this.centerY);
    rotate(this.angleDegree);

    if(this.shoot != 0){
      this.vabrate = 5;
      this.shoot -= 1;
    }
    else if(this.shoot == 0){
      this.vabrate = 0;
    }
    noStroke();
    circle(0,0,15);
    rect(0-4-this.vabrate,0-3,32,6,radians(150));
    pop();
    noFill();
    pop();
    if(this.selected){
      push();
      stroke(0,0,0, 51)
      fill(0, 102, 153, 20);
      circle(this.centerX,this.centerY,this.range*2);
      pop();
    }
  }
}
class Rocket2 extends Rocket {
  constructor(x,y,move) {
    super(x,y,move);
    this.type = tankInfo["rocket2"]["type"];
    this.damage = tankInfo["rocket2"]["damage"];
    this.rate = tankInfo["rocket2"]["rate"];
    this.speed = tankInfo["rocket2"]["speed"];
    this.range = tankInfo["rocket2"]["range"];
    this.async = getRandom(this.rate);
  }
  draw(){
    push();
    fill(88, 116, 214); //blue
    noFill();
    stroke(228, 68, 49); //orange
    quad(this.x-20,this.y,this.x,this.y-20,this.x+20,this.y,this.x,this.y+20);
    square(this.x-12.5,this.y-12.5,25, radians(120));
    fill(88, 116, 214);
    square(this.x-9.5,this.y-9.5,19,radians(120));


    push();
    fill(0);
    translate(this.centerX,this.centerY);
    rotate(this.angleDegree);

    if(this.shoot != 0){
      this.vabrate = 5;
      this.shoot -= 1;
    }
    else if(this.shoot == 0){
      this.vabrate = 0;
    }
    noStroke();
    circle(0,0,20);
    rect(0-4-this.vabrate,0-4,36,8,radians(150));
    pop();
    noFill();
    pop();
    if(this.selected){
      push();
      stroke(0,0,0, 51)
      fill(0, 102, 153, 20);
      circle(this.centerX,this.centerY,this.range*2);
      pop();
    }
  }
}
class Machinegun extends Single {
  constructor(x,y,move) {
    super(x,y,move);
    this.type = tankInfo["machinegun"]["type"];
    this.damage = tankInfo["machinegun"]["damage"];
    this.rate = tankInfo["machinegun"]["rate"];
    this.speed = tankInfo["machinegun"]["speed"];
    this.range = tankInfo["machinegun"]["range"];
    this.async = getRandom(this.rate);
  }
  draw(){
    push();
    fill(255); //gray
    stroke(255,255,255,100); //white
    // quad(this.x-20,this.y,this.x,this.y-20,this.x+20,this.y,this.x,this.y+20);
    square(this.x-12.5,this.y-12.5,25, radians(120));
    fill(194, 57, 57);
    square(this.x-9.5,this.y-9.5,19,radians(120));


    push();
    fill(50);
    translate(this.centerX,this.centerY);
    rotate(this.angleDegree);

    if(this.shoot != 0){
      this.vabrate = 2;
      this.shoot -= 1;
    }
    else if(this.shoot == 0){
      this.vabrate = 0;
    }
    noStroke();
    circle(0,0,15);
    rect(0-4,0 -5+this.vabrate,22,4,radians(200));
    // rect(0-4,0 -0.5,22,1.5,radians(200));
    rect(0-4,0 + 1-this.vabrate,22,4,radians(200));
    pop();
    noFill();
    pop();
    if(this.selected){
      push();
      stroke(0,0,0, 51)
      fill(0, 102, 153, 20);
      circle(this.centerX,this.centerY,this.range*2);
      pop();
    }
  }
}
class Machinegun2 extends Machinegun {
  constructor(x,y,move) {
    super(x,y,move);
    this.type = tankInfo["machinegun2"]["type"];
    this.damage = tankInfo["machinegun2"]["damage"];
    this.rate = tankInfo["machinegun2"]["rate"];
    this.speed = tankInfo["machinegun2"]["speed"];
    this.range = tankInfo["machinegun2"]["range"];
    this.async = getRandom(this.rate);
  }
  detect(){
    if(this.moving) return;
    var t = createVector(-1,-1);
    var target = false;
    var lock = false;
    var antlist = [];
    for(var i=0; i< ants.length;i++){
      if(this.isInrange(ants[i].x,ants[i].y)){
        target = true;
        antlist.push(ants[i]);
      }
    }
    if(!target)return;  //沒有掃到就離開

    if(this.multiTarget == true){ //有多重目標
      for(var i=0; i< antlist.length;i++){
        var d = 5;
        var t2 = createVector(0,0),t3 = createVector(0,0);
        t2.x = (antlist[i].x-this.x)*cos(radians(d)) - (antlist[i].y-this.y)*sin(radians(d)) + this.x;
        t2.y = (antlist[i].x-this.x)*sin(radians(d)) + (antlist[i].y-this.y)*cos(radians(d)) + this.y;
        t3.x = (antlist[i].x-this.x)*cos(radians(d)) + (antlist[i].y-this.y)*sin(radians(d)) + this.x;
        t3.y = -1*(t.x-this.x)*sin(radians(d)) + (t.y-this.y)*cos(radians(d)) + this.y;
        // this.bullets.push(new Bullet(this.centerX, this.centerY,antlist[i].x, antlist[i].y,this.speed,
        //   this.range, this.damage,this.type, "none"));
          this.bullets.push(new Bullet(this.centerX, this.centerY,t2.x, t2.y,this.speed,
            this.range, this.damage,this.type, "none"));
            this.bullets.push(new Bullet(this.centerX, this.centerY,t3.x, t3.y,this.speed,
              this.range, this.damage,this.type, "none"));
      }
    }else{    //沒有多重目標
      for(var i=0; i< antlist.length;i++){
        if(antlist[i].selected == true){
          t.x = antlist[i].x;
          t.y = antlist[i].y;
          lock = true;
          break;
        }
      }
      if(!lock){ //如果都沒有人被鎖定 就打第一個
        t.x = antlist[0].x;
        t.y = antlist[0].y;
      }
      var d = random(-15,15);
      var t2 = createVector(0,0);
      if(d>0){
        t2.x = (t.x-this.x)*cos(radians(d)) - (t.y-this.y)*sin(radians(d)) + this.x;
        t2.y = (t.x-this.x)*sin(radians(d)) + (t.y-this.y)*cos(radians(d)) + this.y;
      }else {
        t2.x = (t.x-this.x)*cos(radians(d)) + (t.y-this.y)*sin(radians(d)) + this.x;
        t2.y = -1*(t.x-this.x)*sin(radians(d)) + (t.y-this.y)*cos(radians(d)) + this.y;
      }

      this.bullets.push(new Bullet(this.centerX, this.centerY,t2.x, t2.y,this.speed,
        this.range, this.damage,this.type, "none"));
      this.shoot = 2;
      this.angleDegree = this.calangle(createVector(this.centerX, this.centerY), createVector(this.centerX+5, this.centerY),t);

    }
  }
  draw(){
    push();
    fill(255); //gray
    noFill();
    stroke(255,255,255,100); //white
    quad(this.x-20,this.y,this.x,this.y-20,this.x+20,this.y,this.x,this.y+20);
    square(this.x-15,this.y-15,30, radians(120));
    fill(194, 57, 57);
    square(this.x-11,this.y-11,22,radians(120));


    push();
    fill(50);
    translate(this.centerX,this.centerY);
    rotate(this.angleDegree);

    if(this.shoot != 0){
      this.vabrate = 2;
      this.shoot -= 1;
    }
    else if(this.shoot == 0){
      this.vabrate = 0;
    }
    noStroke();
    circle(0,0,20);
    rect(0-4,0 -6+this.vabrate,30,5,radians(200));
    rect(0-4,0 + 2-this.vabrate,30,5,radians(200));
    pop();
    noFill();
    pop();
    if(this.selected){
      push();
      stroke(0,0,0, 51)
      fill(0, 102, 153, 20);
      circle(this.centerX,this.centerY,this.range*2);
      pop();
    }
  }
}
class Shotgun extends Attack {
  constructor(x,y,move) {
    super(x,y,move);
    this.type = tankInfo["shotgun"]["type"];
    this.damage = tankInfo["shotgun"]["damage"];
    this.rate = tankInfo["shotgun"]["rate"];
    this.speed = tankInfo["shotgun"]["speed"];
    this.range = tankInfo["shotgun"]["range"];
    this.async = getRandom(this.rate);
  }
  detect(){
    if(this.moving) return;
    var t = createVector(-1,-1);
    var target = false;
    var lock = false;
    var antlist = [];
    for(var i=0; i< ants.length;i++){
      if(this.isInrange(ants[i].x,ants[i].y)){
        target = true;
        antlist.push(ants[i]);
      }
    }
    if(!target)return;  //沒有掃到就離開

    if(this.multiTarget == true){ //有多重目標
      for(var i=0; i< antlist.length;i++){
        var d = 5;
        var t2 = createVector(0,0),t3 = createVector(0,0);
        t2.x = (antlist[i].x-this.x)*cos(radians(d)) - (antlist[i].y-this.y)*sin(radians(d)) + this.x;
        t2.y = (antlist[i].x-this.x)*sin(radians(d)) + (antlist[i].y-this.y)*cos(radians(d)) + this.y;
        t3.x = (antlist[i].x-this.x)*cos(radians(d)) + (antlist[i].y-this.y)*sin(radians(d)) + this.x;
        t3.y = -1*(t.x-this.x)*sin(radians(d)) + (t.y-this.y)*cos(radians(d)) + this.y;
        // this.bullets.push(new Bullet(this.centerX, this.centerY,antlist[i].x, antlist[i].y,this.speed,
        //   this.range, this.damage,this.type, "none"));
          this.bullets.push(new Bullet(this.centerX, this.centerY,t2.x, t2.y,this.speed,
            this.range, this.damage,this.type, "none"));
            this.bullets.push(new Bullet(this.centerX, this.centerY,t3.x, t3.y,this.speed,
              this.range, this.damage,this.type, "none"));
      }
    }else{    //沒有多重目標
      for(var i=0; i< antlist.length;i++){
        if(antlist[i].selected == true){
          t.x = antlist[i].x;
          t.y = antlist[i].y;
          lock = true;
          break;
        }
      }
      if(!lock){ //如果都沒有人被鎖定 就打第一個
        t.x = antlist[0].x;
        t.y = antlist[0].y;
      }
      var d = 5;
      var t2 = createVector(0,0),t3 = createVector(0,0);
      t2.x = (t.x-this.x)*cos(radians(d)) - (t.y-this.y)*sin(radians(d)) + this.x;
      t2.y = (t.x-this.x)*sin(radians(d)) + (t.y-this.y)*cos(radians(d)) + this.y;
      t3.x = (t.x-this.x)*cos(radians(d)) + (t.y-this.y)*sin(radians(d)) + this.x;
      t3.y = -1*(t.x-this.x)*sin(radians(d)) + (t.y-this.y)*cos(radians(d)) + this.y;
      // t2,t3=shotgunCal(t,createVector(this.x,this.y),d);

      this.bullets.push(new Bullet(this.centerX, this.centerY,t2.x, t2.y,this.speed,
        this.range, this.damage,this.type, "none"));
      this.bullets.push(new Bullet(this.centerX, this.centerY,t3.x, t3.y,this.speed,
        this.range, this.damage,this.type, "none"));
        // this.bullets.push(new Bullet(this.centerX, this.centerY,t.x, t.y,this.speed,
        //   this.range, this.damage,this.type, "none"));
      this.shoot = 2;
      this.angleDegree = this.calangle(createVector(this.centerX, this.centerY), createVector(this.centerX+5, this.centerY),t);

    }
  }
  draw(){
    push();
    fill(228, 118, 49); //gray
    stroke(255,255,255,100); //white
    // quad(this.x-20,this.y,this.x,this.y-20,this.x+20,this.y,this.x,this.y+20);
    square(this.x-12.5,this.y-12.5,25, radians(120));
    fill(228, 68, 49);
    square(this.x-9.5,this.y-9.5,19,radians(120));


    push();
    fill(50);
    translate(this.centerX,this.centerY);
    rotate(this.angleDegree);

    if(this.shoot != 0){
      this.vabrate = 5;
      this.shoot -= 1;
    }
    else if(this.shoot == 0){
      this.vabrate = 0;
    }
    noStroke();
    circle(0,0,15);
    rect(0-4-this.vabrate,0 -6,22,4,radians(200));
    rect(0-4-this.vabrate,0 + 2,22,4,radians(200));
    pop();
    noFill();
    pop();
    if(this.selected){
      push();
      stroke(0,0,0, 51)
      fill(0, 102, 153, 20);
      circle(this.centerX,this.centerY,this.range*2);
      pop();
    }
  }
}
class Shotgun2 extends Shotgun {
  constructor(x,y,move) {
    super(x,y,move);
    this.type = tankInfo["shotgun2"]["type"];
    this.damage = tankInfo["shotgun2"]["damage"];
    this.rate = tankInfo["shotgun2"]["rate"];
    this.speed = tankInfo["shotgun2"]["speed"];
    this.range = tankInfo["shotgun2"]["range"];
    this.async = getRandom(this.rate);
  }
  detect(){
    if(this.moving) return;
    var t = createVector(-1,-1);
    var target = false;
    var lock = false;
    var antlist = [];
    for(var i=0; i< ants.length;i++){
      if(this.isInrange(ants[i].x,ants[i].y)){
        target = true;
        antlist.push(ants[i]);
      }
    }
    if(!target)return;  //沒有掃到就離開

    if(this.multiTarget == true){ //有多重目標
      for(var i=0; i< antlist.length;i++){
        var d = 10;
        var t2 = createVector(0,0),t3 = createVector(0,0);
        t2.x = (antlist[i].x-this.x)*cos(radians(d)) - (antlist[i].y-this.y)*sin(radians(d)) + this.x;
        t2.y = (antlist[i].x-this.x)*sin(radians(d)) + (antlist[i].y-this.y)*cos(radians(d)) + this.y;
        t3.x = (antlist[i].x-this.x)*cos(radians(d)) + (antlist[i].y-this.y)*sin(radians(d)) + this.x;
        t3.y = -1*(t.x-this.x)*sin(radians(d)) + (t.y-this.y)*cos(radians(d)) + this.y;
        // this.bullets.push(new Bullet(this.centerX, this.centerY,antlist[i].x, antlist[i].y,this.speed,
        //   this.range, this.damage,this.type, "none"));
          this.bullets.push(new Bullet(this.centerX, this.centerY,t2.x, t2.y,this.speed,
            this.range, this.damage,this.type, "none"));
            this.bullets.push(new Bullet(this.centerX, this.centerY,t3.x, t3.y,this.speed,
              this.range, this.damage,this.type, "none"));
      }
    }else{    //沒有多重目標
      for(var i=0; i< antlist.length;i++){
        if(antlist[i].selected == true){
          t.x = antlist[i].x;
          t.y = antlist[i].y;
          lock = true;
          break;
        }
      }
      if(!lock){ //如果都沒有人被鎖定 就打第一個
        t.x = antlist[0].x;
        t.y = antlist[0].y;
      }
      var d = 7;
      var t2 = createVector(0,0),t3 = createVector(0,0);
      t2.x = (t.x-this.x)*cos(radians(d)) - (t.y-this.y)*sin(radians(d)) + this.x;
      t2.y = (t.x-this.x)*sin(radians(d)) + (t.y-this.y)*cos(radians(d)) + this.y;
      t3.x = (t.x-this.x)*cos(radians(d)) + (t.y-this.y)*sin(radians(d)) + this.x;
      t3.y = -1*(t.x-this.x)*sin(radians(d)) + (t.y-this.y)*cos(radians(d)) + this.y;
      // t2,t3=shotgunCal(t,createVector(this.x,this.y),d);

      this.bullets.push(new Bullet(this.centerX, this.centerY,t2.x, t2.y,this.speed,
        this.range, this.damage,this.type, "none"));
      this.bullets.push(new Bullet(this.centerX, this.centerY,t3.x, t3.y,this.speed,
        this.range, this.damage,this.type, "none"));

        // this.bullets.push(new Bullet(this.centerX, this.centerY,t.x, t.y,this.speed,
        //   this.range, this.damage,this.type, "none"));
        this.shoot = 2;
        this.angleDegree = this.calangle(createVector(this.centerX, this.centerY), createVector(this.centerX+5, this.centerY),t);

    }
  }
  draw(){
    push();
    fill(228, 118, 49); //gray
    noFill();
    stroke(255,255,255,100); //white
    // quad(this.x-20,this.y,this.x,this.y-20,this.x+20,this.y,this.x,this.y+20);
    square(this.x-15,this.y-15,30, radians(120));
    fill(228, 68, 49);
    square(this.x-11,this.y-11,22,radians(120));


    push();
    fill(50);
    translate(this.centerX,this.centerY);
    rotate(this.angleDegree);

    if(this.shoot != 0){
      this.vabrate = 5;
      this.shoot -= 1;
    }
    else if(this.shoot == 0){
      this.vabrate = 0;
    }
    noStroke();
    circle(0,0,18);
    rect(0-4-this.vabrate,0 -6,28,4,radians(200));
    rect(0-4-this.vabrate,0 + 2,28,4,radians(200));
    pop();
    noFill();
    pop();
    if(this.selected){
      push();
      stroke(0,0,0, 51)
      fill(0, 102, 153, 20);
      circle(this.centerX,this.centerY,this.range*2);
      pop();
    }
  }
}
class Triplegun extends Shotgun {
  constructor(x,y,move) {
    super(x,y,move);
    this.type = tankInfo["triplegun"]["type"];
    this.damage = tankInfo["triplegun"]["damage"];
    this.rate = tankInfo["triplegun"]["rate"];
    this.speed = tankInfo["triplegun"]["speed"];
    this.range = tankInfo["triplegun"]["range"];
    this.async = getRandom(this.rate);
  }
  detect(){
    if(this.moving) return;
    var t = createVector(-1,-1);
    var target = false;
    var lock = false;
    var antlist = [];
    for(var i=0; i< ants.length;i++){
      if(this.isInrange(ants[i].x,ants[i].y)){
        target = true;
        antlist.push(ants[i]);
      }
    }
    if(!target)return;  //沒有掃到就離開

    if(this.multiTarget == true){ //有多重目標
      for(var i=0; i< antlist.length;i++){
        var d = 10;
        var t2 = createVector(0,0),t3 = createVector(0,0);
        t2.x = (antlist[i].x-this.x)*cos(radians(d)) - (antlist[i].y-this.y)*sin(radians(d)) + this.x;
        t2.y = (antlist[i].x-this.x)*sin(radians(d)) + (antlist[i].y-this.y)*cos(radians(d)) + this.y;
        t3.x = (antlist[i].x-this.x)*cos(radians(d)) + (antlist[i].y-this.y)*sin(radians(d)) + this.x;
        t3.y = -1*(t.x-this.x)*sin(radians(d)) + (t.y-this.y)*cos(radians(d)) + this.y;
        this.bullets.push(new Bullet(this.centerX, this.centerY,antlist[i].x, antlist[i].y,this.speed,
          this.range, this.damage,this.type, "none"));
          this.bullets.push(new Bullet(this.centerX, this.centerY,t2.x, t2.y,this.speed,
            this.range, this.damage,this.type, "none"));
            this.bullets.push(new Bullet(this.centerX, this.centerY,t3.x, t3.y,this.speed,
              this.range, this.damage,this.type, "none"));
      }
    }else{    //沒有多重目標
      for(var i=0; i< antlist.length;i++){
        if(antlist[i].selected == true){
          t.x = antlist[i].x;
          t.y = antlist[i].y;
          lock = true;
          break;
        }
      }
      if(!lock){ //如果都沒有人被鎖定 就打第一個
        t.x = antlist[0].x;
        t.y = antlist[0].y;
      }
      var d = 10;
      var t2 = createVector(0,0),t3 = createVector(0,0);
      t2.x = (t.x-this.x)*cos(radians(d)) - (t.y-this.y)*sin(radians(d)) + this.x;
      t2.y = (t.x-this.x)*sin(radians(d)) + (t.y-this.y)*cos(radians(d)) + this.y;
      t3.x = (t.x-this.x)*cos(radians(d)) + (t.y-this.y)*sin(radians(d)) + this.x;
      t3.y = -1*(t.x-this.x)*sin(radians(d)) + (t.y-this.y)*cos(radians(d)) + this.y;
      // t2,t3=shotgunCal(t,createVector(this.x,this.y),d);

      this.bullets.push(new Bullet(this.centerX, this.centerY,t2.x, t2.y,this.speed,
        this.range, this.damage,this.type, "none"));
      this.bullets.push(new Bullet(this.centerX, this.centerY,t3.x, t3.y,this.speed,
        this.range, this.damage,this.type, "none"));
        this.bullets.push(new Bullet(this.centerX, this.centerY,t.x, t.y,this.speed,
          this.range, this.damage,this.type, "none"));
      this.shoot = 2;
      this.angleDegree = this.calangle(createVector(this.centerX, this.centerY), createVector(this.centerX+5, this.centerY),t);

    }
  }
  draw(){
    push();
    fill(228, 118, 49); //gray
    stroke(255,255,255,100); //white
    // quad(this.x-20,this.y,this.x,this.y-20,this.x+20,this.y,this.x,this.y+20);
    square(this.x-14,this.y-14,28, radians(120));
    fill(228, 68, 49);
    square(this.x-11,this.y-11,22,radians(120));


    push();
    fill(50);
    translate(this.centerX,this.centerY);
    rotate(this.angleDegree);

    if(this.shoot != 0){
      this.vabrate = 5;
      this.shoot -= 1;
    }
    else if(this.shoot == 0){
      this.vabrate = 0;
    }
    noStroke();
    circle(0,0,20);
    rect(0-4-this.vabrate,0 -7,25,4,radians(200));
    rect(0-4-this.vabrate,0 - 2,25,4,radians(200));
    rect(0-4-this.vabrate,0 + 3,25,4,radians(200));
    pop();
    noFill();
    pop();
    if(this.selected){
      push();
      stroke(0,0,0, 51)
      fill(0, 102, 153, 20);
      circle(this.centerX,this.centerY,this.range*2);
      pop();
    }
  }
}
class Crazygun extends Triplegun {
  constructor(x,y,move) {
    super(x,y,move);
    this.type = tankInfo["crazygun"]["type"];
    this.damage = tankInfo["crazygun"]["damage"];
    this.rate = tankInfo["crazygun"]["rate"];
    this.speed = tankInfo["crazygun"]["speed"];
    this.range = tankInfo["crazygun"]["range"];
    this.async = getRandom(this.rate);
  }
  detect(){
    if(this.moving) return;
    var t = createVector(-1,-1);
    var target = false;
    var lock = false;
    var antlist = [];
    for(var i=0; i< ants.length;i++){
      if(this.isInrange(ants[i].x,ants[i].y)){
        target = true;
        antlist.push(ants[i]);
      }
    }
    if(!target)return;  //沒有掃到就離開

    if(this.multiTarget == true){ //有多重目標
      for(var i=0; i< antlist.length;i++){
        var d = 10;
        var t2 = createVector(0,0),t3 = createVector(0,0);
        t2.x = (antlist[i].x-this.x)*cos(radians(d)) - (antlist[i].y-this.y)*sin(radians(d)) + this.x;
        t2.y = (antlist[i].x-this.x)*sin(radians(d)) + (antlist[i].y-this.y)*cos(radians(d)) + this.y;
        t3.x = (antlist[i].x-this.x)*cos(radians(d)) + (antlist[i].y-this.y)*sin(radians(d)) + this.x;
        t3.y = -1*(t.x-this.x)*sin(radians(d)) + (t.y-this.y)*cos(radians(d)) + this.y;
        this.bullets.push(new Bullet(this.centerX, this.centerY,antlist[i].x, antlist[i].y,this.speed,
          this.range, this.damage,this.type, "none"));
          this.bullets.push(new Bullet(this.centerX, this.centerY,t2.x, t2.y,this.speed,
            this.range, this.damage,this.type, "none"));
            this.bullets.push(new Bullet(this.centerX, this.centerY,t3.x, t3.y,this.speed,
              this.range, this.damage,this.type, "none"));
      }
    }else{    //沒有多重目標
      for(var i=0; i< antlist.length;i++){
        if(antlist[i].selected == true){
          t.x = antlist[i].x;
          t.y = antlist[i].y;
          lock = true;
          break;
        }
      }
      if(!lock){ //如果都沒有人被鎖定 就打第一個
        t.x = antlist[0].x;
        t.y = antlist[0].y;
      }
      var d = 5;
      var tempdegree = 0;
      var t2 = createVector(0,0),t3 = createVector(0,0);
      var tlist = [];
      for(var i=0; i<360/d; i++){
        var tt = createVector(0,0);
        tt.x = (t.x-this.x)*cos(radians(tempdegree)) - (t.y-this.y)*sin(radians(tempdegree)) + this.x;
        tt.y = (t.x-this.x)*sin(radians(tempdegree)) + (t.y-this.y)*cos(radians(tempdegree)) + this.y;
        tlist.push(tt);
        tempdegree += d;
      }
      // t2.x = (t.x-this.x)*cos(radians(d)) - (t.y-this.y)*sin(radians(d)) + this.x;
      // t2.y = (t.x-this.x)*sin(radians(d)) + (t.y-this.y)*cos(radians(d)) + this.y;
      // t3.x = (t.x-this.x)*cos(radians(d)) + (t.y-this.y)*sin(radians(d)) + this.x;
      // t3.y = -1*(t.x-this.x)*sin(radians(d)) + (t.y-this.y)*cos(radians(d)) + this.y;
      // t2,t3=shotgunCal(t,createVector(this.x,this.y),d);

      for (var i = 0; i < tlist.length; i++) {
        this.bullets.push(new Bullet(this.centerX, this.centerY,tlist[i].x, tlist[i].y,this.speed,
          this.range, this.damage,this.type, "none"));
      }
      this.shoot = 2;
      // this.bullets.push(new Bullet(this.centerX, this.centerY,t2.x, t2.y,this.speed,
      //   this.range, this.damage,this.type, "none"));
      // this.bullets.push(new Bullet(this.centerX, this.centerY,t3.x, t3.y,this.speed,
      //   this.range, this.damage,this.type, "none"));
      //   this.bullets.push(new Bullet(this.centerX, this.centerY,t.x, t.y,this.speed,
      //     this.range, this.damage,this.type, "none"));
    }
  }
  draw(){
    push();
    fill(228, 118, 49); //gray
    stroke(255,255,255,100); //white
    quad(this.x-20,this.y,this.x,this.y-20,this.x+20,this.y,this.x,this.y+20);
    square(this.x-15,this.y-15,30, radians(120));
    fill(228, 68, 49);
    square(this.x-12,this.y-12,24,radians(120));


    push();
    fill(50);
    translate(this.centerX,this.centerY);
    // rotate(this.angleDegree);

    if(this.shoot != 0){
      this.vabrate = 5;
      this.shoot -= 1;
    }
    else if(this.shoot == 0){
      this.vabrate = 0;
    }
    noStroke();
    circle(0,0,15);

    for(var i=0;i<12;i++){
      push();
      rotate(radians(i*30));
      rect(0-4-this.vabrate,0 - 2,18,4,radians(200));
      pop();
    }

    pop();
    noFill();
    pop();
    if(this.selected){
      push();
      stroke(0,0,0, 51)
      fill(0, 102, 153, 20);
      circle(this.centerX,this.centerY,this.range*2);
      pop();
    }
  }
}

class Ice extends Support {
  constructor(x,y,move) {
    super(x,y,move);
    this.type = tankInfo["ice"]["type"];
    this.damage = tankInfo["ice"]["damage"];
    this.rate = tankInfo["ice"]["rate"];
    this.speed = tankInfo["ice"]["speed"];
    this.range = tankInfo["ice"]["range"];
    this.async = getRandom(this.rate);
  }
  detect(){
    if(this.moving) return;
    var t = createVector(-1,-1);
    var target = false;
    var lock = false;
    var antlist = [];
    for(var i=0; i< ants.length;i++){
      if(this.isInrange(ants[i].x,ants[i].y)){
        target = true;
        antlist.push(ants[i]);
      }
    }
    if(!target)return;  //沒有掃到就離開

    if(this.multiTarget == true){ //有多重目標
      for(var i=0; i< antlist.length;i++){
        this.bullets.push(new Bullet(this.centerX, this.centerY,antlist[i].x, antlist[i].y,this.speed,
          this.range, this.damage,this.type, "ice"));
      }
    }else{    //沒有多重目標
      for(var i=0; i< antlist.length;i++){
        if(antlist[i].selected == true){
          t.x = antlist[i].x;
          t.y = antlist[i].y;
          lock = true;
          break;
        }
      }
      if(!lock){ //如果都沒有人被鎖定 就打第一個
        t.x = antlist[0].x;
        t.y = antlist[0].y;
      }

      this.bullets.push(new Bullet(this.centerX, this.centerY,t.x, t.y,this.speed,
          this.range, this.damage,this.type, "ice"));
    }
  }
  draw(){
    push();
    noStroke();
    fill(255,100);
    circle(this.x,this.y,30);
    fill(112, 160, 187);
    circle(this.centerX,this.centerY,10);
    pop();
    noFill();
    if(this.selected){
      push();
      stroke(0,0,0, 51)
      fill(0, 102, 153, 20);
      circle(this.centerX,this.centerY,this.range*2);
      pop();
    }
  }
}
class Ice2 extends Ice {
  constructor(x,y,move) {
    super(x,y,move);
    this.type = tankInfo["ice2"]["type"];
    this.damage = tankInfo["ice2"]["damage"];
    this.rate = tankInfo["ice2"]["rate"];
    this.speed = tankInfo["ice2"]["speed"];
    this.range = tankInfo["ice2"]["range"];
    this.async = getRandom(this.rate);
  }
  detect(){
    if(this.moving) return;
    var t = createVector(-1,-1);
    var target = false;
    var lock = false;
    var antlist = [];
    for(var i=0; i< ants.length;i++){
      if(this.isInrange(ants[i].x,ants[i].y)){
        target = true;
        antlist.push(ants[i]);
      }
    }
    if(!target)return;  //沒有掃到就離開

    if(this.multiTarget == true){ //有多重目標
      for(var i=0; i< antlist.length;i++){
        this.bullets.push(new Bullet(this.centerX, this.centerY,antlist[i].x, antlist[i].y,this.speed,
          this.range, this.damage,this.type, "ice2"));
      }
    }else{    //沒有多重目標
      for(var i=0; i< antlist.length;i++){
        if(antlist[i].selected == true){
          t.x = antlist[i].x;
          t.y = antlist[i].y;
          lock = true;
          break;
        }
      }
      if(!lock){ //如果都沒有人被鎖定 就打第一個
        t.x = antlist[0].x;
        t.y = antlist[0].y;
      }

      this.bullets.push(new Bullet(this.centerX, this.centerY,t.x, t.y,this.speed,
          this.range, this.damage,this.type, "ice"));
    }
  }
  draw(){
    push();
    push();
    translate(this.centerX,this.centerY);
    rotate(radians(frameCount)*6);
    noStroke();
    fill(255);
    circle(30,0,8);
    pop();
    stroke(0,50);
    strokeWeight(2);
    fill(255,100);
    circle(this.x,this.y,30);
    fill(112, 160, 187);
    noStroke();
    circle(this.centerX,this.centerY,10);
    pop();
    noFill();
    if(this.selected){
      push();
      stroke(0,0,0, 51)
      fill(0, 102, 153, 20);
      circle(this.centerX,this.centerY,this.range*2);
      pop();
    }
  }
}
class Poison extends Ice {
  constructor(x,y,move) {
    super(x,y,move);
    this.type = tankInfo["poison"]["type"];
    this.damage = tankInfo["poison"]["damage"];
    this.rate = tankInfo["poison"]["rate"];
    this.speed = tankInfo["poison"]["speed"];
    this.range = tankInfo["poison"]["range"];
    this.multiTarget = true;
    this.async = getRandom(this.rate);
  }
  detect(){
    if(this.moving) return;
    for(var i=0; i< ants.length;i++){
      if(this.isInrange(ants[i].x,ants[i].y)){
        this.bullets.push(new Bullet(this.centerX, this.centerY,ants[i].x, ants[i].y,this.speed,
          this.range, this.damage,this.type, "poison"));
        if(this.multiTarget == false){ //關閉多重目標
          return;
        }
      }
    }
  }
  draw(){
    push();
    noStroke();
    fill('white');
    circle(this.centerX,this.centerY,30);
    fill('green');
    circle(this.centerX,this.centerY,12);
    noFill();
    pop();
    if(this.selected){
      push();
      stroke(0,0,0, 51)
      fill(0, 102, 153, 20);
      circle(this.centerX,this.centerY,this.range*2);
      pop();
    }
  }
}
class Poison2 extends Poison {
  constructor(x,y,move) {
    super(x,y,move);
    this.type = tankInfo["poison2"]["type"];
    this.damage = tankInfo["poison2"]["damage"];
    this.rate = tankInfo["poison2"]["rate"];
    this.speed = tankInfo["poison2"]["speed"];
    this.range = tankInfo["poison2"]["range"];
    this.multiTarget = true;
    this.async = getRandom(this.rate);
  }
  detect(){
    if(this.moving) return;
    for(var i=0; i< ants.length;i++){
      if(this.isInrange(ants[i].x,ants[i].y)){
        this.bullets.push(new Bullet(this.centerX, this.centerY,ants[i].x, ants[i].y,this.speed,
          this.range, this.damage,this.type, "poison2"));
        if(this.multiTarget == false){ //關閉多重目標
          return;
        }
      }
    }
  }
  draw(){
    push();
    noStroke();
    push();
      translate(this.centerX,this.centerY);
      rotate(radians(frameCount)*5);
      fill('green');
      circle(0,-12,12);
      circle(0,12,12);
      circle(12,0,12);
      circle(-12,0,12);
    pop();
    fill('white');
    circle(this.centerX,this.centerY,30);
    fill('green');
    circle(this.centerX,this.centerY,12);
    noFill();
    pop();
    if(this.selected){
      push();
      stroke(0,0,0, 51)
      fill(0, 102, 153, 20);
      circle(this.centerX,this.centerY,this.range*2);
      pop();
    }
  }
}
