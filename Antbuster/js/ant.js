class Ant {
  constructor(x,y,speed,level,fullLife) {
    this.type = "ant";
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.targetX = 1000;
    this.targetY = 700;
    this.route = [];
    this.level = level;
    this.fullLife = fullLife;
    this.life = Math.ceil(fullLife);
    this.index = 0;
    this.speedX;
    this.speedY;
    this.foot = false;
    this.footC = 0;
    this.nowangle = 0;
    this.turnangle = 0;
    this.angleDegree;
    this.head = createVector(10,0);
    this.buff = "none";
    this.selected = false;
    this.cake = false;
    this.startTimerIce = false;
    this.startTimerPoison = false;
    this.slowrate = 1.0;
    this.countDownIce = 0;
    this.countDownPoison = 0;
    this.deepDamage = 0;
    this.goal = 1; //1 for go to cake, 0 for go home
    this.hangAround = 0;
    this.carrySlow = 1;
    this.record = []
    var v = createVector(this.x + random(-5,5), this.y+random(-5,5));
    this.route.push(v);

    // this.generateRoute();
    // this.generateRoute();
    this.computeStep();
  }
  thinkRoute(){
    if(this.route.length-1 == this.index){
      var a = random(1,10);
      var v = createVector(random(-5*a,20*a),random(-10*a,30*a));
      this.record.push(v);
      var x = this.route[this.index].x + v.x;
      var y = this.route[this.index].y + v.y;
      // console.log(v);
      // console.log(this.route[this.index]);
      if(this.goal == 1){
        if(this.hangAround == 0){
          if(x > edgeX) x = edgeX;
          else if (x < 0) x = 0;
          if(y < 0) y = 0;
          else if (y > edgeY) y = edgeY;
          if(x > cakes.x && y > cakes.y){
            x = cakes.x;
            y = cakes.y;
          }
        }
        else if (this.hangAround == 1) { // no cake to carry, go around and waiting cake
          x = this.x + random(-100,100);
          y = this.y + random(-100,100);
          if(x > cakes.x + 80) x = cakes.x + 80;
          else if (x < cakes.x - 80) x = cakes.x - 80;
          if(y >  cakes.y + 80) y = cakes.y + 80;
          else if (y < cakes.y - 80) y =  cakes.y - 80;
        }
        this.route.push(createVector(x, y));
      }
      else if(this.goal == 0){ //go home with cake
        var a = random(1,10);
        var v = createVector(random(-5*a,20*a),random(-10*a,30*a));
        var x = this.route[this.route.length-1].x - v.x;
        var y = this.route[this.route.length-1].y - v.y;
        if(x > edgeX) x = edgeX;
        else if (x < 0) x = 0;
        if(y < 0) y = 0;
        else if (y > edgeY) y = edgeY;
        this.route.push(createVector(x, y));
        if(dist(this.x, this.y, 20, 20) < 50){ // success carry cake to home
          this.cake = false;
          cakes.carring -= 1;
          this.goal = 1;
        }
        if(cakes.carring + cakes.left == 0){
          alert("Cake Over!!!");
        }
      }
    }
  }
  generateRoute(){

    var v = createVector(0, 20);

    /*go*/
    for(var i=1;i<30;i++){
      this.route.push(v);
      var x = v.x + random(-1*(i%10),20*(i%10));
      var y = v.y + random(-20*(i%10),30*(i%10));

      if(x > edgeX) x =edgeX;
      if(y < 0) y = 0;
      else if (y > edgeY) y = edgeY;
      v = createVector(x, y);
    }
    this.route.push(createVector(edgeX, edgeY));
    /*back*/
    for(var i=1;i<30;i++){
      var x = v.x - random(-1*(i%10),20*(i%10));
      var y = v.y - random(-20*(i%10),30*(i%10));

      if(x > edgeX) x =edgeX;
      if(x < 0) x = 0;
      if(y < 0) y = 0;
      else if (y > edgeY) y = edgeY;
      v = createVector(x, y);
      this.route.push(v);
    }
    this.route.push(createVector(0, 0));
  }
  computeStep(){
    var d = dist(this.route[this.index].x, this.route[this.index].y,this.x, this.y);
    this.speedY = ((this.route[this.index].y-this.y)*this.speed)/d;
    if(this.route[this.index].x < this.x){
      this.speedX = -1 * sqrt(this.speed*this.speed - this.speedY*this.speedY);
    }
    else{
      this.speedX = sqrt(this.speed*this.speed - this.speedY*this.speedY);
    }
    var b = dist(this.x+this.head.x,this.y+this.head.y, this.x, this.y);
    var originDegree = degrees(acos((this.head.x - this.x) / b));
    // console.log(originDegree);
    /* 餘弦定理 */
    var a = dist(this.x+this.head.x,this.y+this.head.y, this.route[this.index].x, this.route[this.index].y);
    var c = dist(this.x,this.y, this.route[this.index].x, this.route[this.index].y);
    var angle = acos((a*a-b*b-c*c) / (-2*b*c));

    var headX = this.x+this.head.x, headY = this.y+this.head.y
    var y = -this.route[this.index].x + this.x, x = this.route[this.index].y - this.y;
    var cc = this.route[this.index].x*this.y - this.route[this.index].y*this.x;

    if(x*headX + headY*y + cc < 0){
      angle *= -1;
    }

    this.angleDegree = angle;

    this.turnangle = degrees(this.angleDegree) - this.nowangle;
  }
  buffCondition(){
    //freeze countdown setting
    if(this.buff == "ice" || this.buff == "ice2"){
      this.startTimerIce = true;
      if(this.slowrate > tankInfo[this.buff]["slowRate"]){
        this.slowrate = tankInfo[this.buff]["slowRate"]; //if double slow, slowest priorty
      }
      this.slowrate = tankInfo[this.buff]["slowRate"];
      if(this.countDownIce < tankInfo[this.buff]["slowTime"]){
        this.countDownIce = tankInfo[this.buff]["slowTime"];
      }

      this.buff = "none";
    }
    //freeze countdown
    if(this.countDownIce != 0){
      this.countDownIce -= 1; //countdown from 10
      if(this.countDownIce <= 0){
        this.startTimerIce = false;
        if(this.startTimerPoison == false){ //no poison no freeze, rate = 1
          this.slowrate = 1;
        }
        this.countDownIce = 0;
        this.buff = "none";
      }
    }
    //poison countdown setting
    if(this.buff == "poison" || this.buff == "poison2"){
      this.startTimerPoison = true;
      if(this.slowrate > tankInfo[this.buff]["slowRate"]){
        this.slowrate = tankInfo[this.buff]["slowRate"]; //如果本身已經被減速了，以速度最慢的為準
      }
      if(this.countDownPoison < tankInfo[this.buff]["poisonTime"]){
        this.countDownPoison = tankInfo[this.buff]["poisonTime"];
      }
      if(this.deepDamage < tankInfo[this.buff]["deepDamage"]){
        this.deepDamage = tankInfo[this.buff]["deepDamage"];
      }

      this.buff = "none";
    }
    //poison countdown
    if(this.countDownPoison != 0){
      this.countDownPoison -= 1;
      this.life -= this.deepDamage
      if(this.life < 0) this.life = 0;
      if(this.countDownPoison <= 0){
        this.startTimerPoison = false;
        if(this.startTimerIce == false){ //如果沒中毒也沒被冰就恢復速度
          this.slowrate = 1;
        }
        this.countDownPoison = 0;
        this.buff = "none";
      }
    }

  }
  update(){
    if(dist(this.x,this.y,cakes.x,cakes.y) <= 50){ //carry cake
      if(cakes.left > 0 && this.cake == false){
        cakes.left -= 1;
        cakes.carring += 1;
        this.goal = 0; //go home
        this.cake = true;
        this.life += Math.ceil(this.fullLife*0.5); //restore half life point
        if(this.life > Math.ceil(this.fullLife))this.life = Math.ceil(this.fullLife);
        this.hangAround = 0;
      }
      else if(cakes.left == 0 && this.cake == false){ //no3cake to carry
        this.hangAround = 1;
      }
    }
    if(this.cake) {
      this.carrySlow = 0.8;
    }
    else {
      this.carrySlow = 1;
    }
    this.buffCondition();

    this.x += this.speedX * this.slowrate * this.carrySlow;
    this.y += this.speedY * this.slowrate * this.carrySlow;
    // console.log(dist(this.route[this.index].x,this.route[this.index].y,this.x,this.y));

    if(dist(this.route[this.index].x,this.route[this.index].y,this.x,this.y) < 2){
      this.thinkRoute();
      this.index++;
      // console.log(this.index);
      this.computeStep();
    }

  }
  show(){
    push();
    // if(this.buff == "slow"){
    //   fill(255,255,this.countDownIce*0.4);
    //   stroke(this.countDownIce*0.2,this.countDownIce*0.2,this.countDownIce*0.2);
    // }
    // else if(this.buff == "poison"){
    //   fill(0, 102, 153);
    //   textSize(32);
    //   text(this.countDownPoison, this.x,this.y-10);
    //   fill(255 - this.countDownPoison*0.4,200,0);
    //   // stroke(this.countDownIce*0.2,this.countDownIce*0.2,this.countDownIce*0.2);
    //   stroke(0,0,0);
    // }
    // else {
    //   fill(255,255,0);
    //   stroke(0,0,0);
    // }

    fill(255- this.countDownPoison*0.4+this.countDownIce*0.3,255,this.countDownIce*0.4);

    // if(this.goal){
    //   fill('black');
    // }else {
    //   fill('white');
    // }

    stroke(0,0,0);
    translate(this.x,this.y);

    rotate(this.angleDegree);

    /*body*/

    circle(0-this.head.x, 0, 12);
    circle(0+this.head.x, 0, 10);
    circle(0, 0, 10);

    this.footC++;
    if(this.footC < 3){
      this.foot = false;
    }
    else{
      this.foot = true;
    }
    if(this.footC > 6) this.footC = 0;

    /*head*/
    line(15, 2, 18, 4);
    line(15, -2, 18, -4);

    line(18, 4, 22, 2);
    line(18, -4, 22, -2);

    /*foot*/
    if(this.foot){
      line(5, 4, 15, 12);
      line(5, -4, 15, -12);
    }

    /*second*/
    line(0, 5, 4, 8);
    line(0, -5, 4, -8);


    if(this.foot){
      line(4, 8, -6, 15);
      line(4, -8, -6, -15);
    }else{
      line(4, 8, 8, 15);
      line(4, -8, 8, -15);
    }



    /*third*/
    line(-3, 4, -7, 10);
    line(-3, -4, -7, -10);

    if(this.foot){
      line(-7, 10, -15, 14);
      line(-7, -10, -15, -14);
    }
    if(this.cake == true){
      push();
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
    pop();

    // circle(this.x, this.y, 10);
    push();
    rect(this.x-30,this.y+10,5,-25);
    fill('red');
    rect(this.x-30,this.y+10,5,-25 * (this.life / (this.fullLife)));
    pop();

    if(this.selected == true){
      push();
      noFill();
      line(this.x-30,this.y,this.x+30,this.y);
      line(this.x,this.y-30,this.x,this.y+30);
      circle(this.x,this.y,50);
      circle(this.x,this.y,30);
      fill('red');
      circle(this.x,this.y,5);
      pop();
    }
    this.update();
  }
}
