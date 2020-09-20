var keyType = 0;
var time = 6,frameC = 4;
var selection = new Select;
var tanks = [];
var ants = [];
var nowTank = new Tank(0,0,true);
var setting = false;
var rate = 25,stratTime = 0;
var edgeX = 900, edgeY = 650;
var totalAnts = 0;
var cakes = new Cake;
var cakeFly = [];
var newTankPrice = 30;
var start = 0;
var bgm = new Audio("music/bgm.mp3");
var click = new Audio("music/click.wav");
var ice = new Audio("music/ice.wav");
// var award = new Audio("award.mp3");
var BGM,rnd;
var mymoney = 30000;
var mylevel = 2;
var mypoint = 0;
// var audio2 = new Audio("flip.wav");
var t = new Tank(50,50);
function setup() {
  n = createCanvas(edgeX,edgeY);
  frameRate(60);
  n.parent('sketch-holder');
	// img = loadImage("img/grass.jpg");
  // img.resize(edgeX,edgeY);
  /* Ant(x,y,speed,level) */
  /* Bullet(x, y, x1,y1,speed,range,damage) */
  /* Tank(x,y,move) */

  /*rnd = random(0,2);
  if(rnd < 1)
    BGM = bgm;
  else
    BGM = bgm2;
  BGM.play();
  for(var i = 0,pos = 450;i<300;i++)
  {
    a[i] = new Ball(pos);
    pos -= 100;
  }*/
  for(var i=0;i<8;i++){
    setants();
  }

}

function hierarchy(tank){
  var upgrade = [];
  var downgrade = "";
  for(i in tankevolution){
    if(i == tank){
      for(j in tankevolution[i]){ //find upgrade tank
        upgrade.push(tankevolution[i][j]);
      }
    }
    for(j in tankevolution[i]){ //find downgrade tank
      if(tankevolution[i][j] == tank){
        downgrade = i;
        break;
      }
    }
  }
  if(downgrade == "") downgrade = "Sell";
  return {"up":upgrade,"down":downgrade};
}
function getRandom(rate) {
  var a = (60/rate);
  return Math.floor(Math.random()*a);
}
function levelup(){
  if(totalAnts % 10 == 0) mylevel += 1;
  panel();
}

function setants(){
  var fullLife = 0;
  var hard = Math.floor((mylevel - 70)/5)*0.5 + 2;
  if(mylevel < 30){
    fullLife = mylevel*mylevel*0.7;
  }else if(mylevel < 50){
    fullLife = mylevel*mylevel;
  }else if(mylevel < 70){
    fullLife = mylevel*mylevel*1.5;//50~69
  }
  if(mylevel >= 70){
    fullLife = mylevel*mylevel*hard;
  }
  // else if(mylevel < 75){
  //   fullLife = mylevel*mylevel*2; //70~74
  // }else if(mylevel < 80){
  //   fullLife = mylevel*mylevel*2.5;
  // }else if(mylevel < 100){
  //   fullLife = mylevel*mylevel*4;
  // }
  ants.push(new Ant(20,20,1.2, mylevel,fullLife));
  totalAnts++;
}
function setTank(){
  if(mymoney < newTankPrice) return;
  mymoney -= newTankPrice;
  setting = true;
  nowTank = new Tank(0,0,true);
  tankPrice()
}
function tankPrice(){
  newTankPrice = Math.floor(newTankPrice * 1.4);
}

function selectMode(x, y){
  selection = new Select(x, y);
  var select = false;
  for(var i = 0;i<tanks.length;i++){
    tanks[i].selected = false;
    if(select) continue;
    if(selection.distance(tanks[i].centerX, tanks[i].centerY)){
      selection.object = tanks[i];
      selection.index = i;
      tanks[i].selected = true;
      select = true;
    }
  }
  for(var i = 0;i<ants.length;i++){
    ants[i].selected = false;
    if(select) continue;
    if(selection.distance(ants[i].x, ants[i].y)){
      selection.object = ants[i];
      selection.index = i;
      ants[i].selected = true;
      select = true;
    }
  }
  return select;
}

function mouseClicked(){
  if(mouseX < 0 || mouseY < 0 || mouseX > edgeX || mouseY > edgeY){
    return false;
  }
  click.play();
  if(selectMode(mouseX,mouseY)){
    // document.getElementById("object").innerHTML = selection.object.type;
    if(selection.object.type != "ant"){ //select tank

      buttonControl();

    }
    else {
      var s = getAntInformation(selection.object);
      document.getElementById("object").innerHTML = s;
      var node = document.getElementById('upgrade'); //clear button
      node.innerHTML = "";
    }
  }
  else{
    document.getElementById("object").innerHTML = '';
    var node = document.getElementById('upgrade'); //clear button
    node.innerHTML = "";
  }

}
function panel(){
  document.getElementById("money").innerHTML = mymoney;
  document.getElementById("level").innerHTML = mylevel;
  document.getElementById("Point").innerHTML = mypoint;
}
function outofrange(){
  var flag = false;
  if(dist(mouseX, mouseY,20,20) <= 150){
    flag = true
  }
  if(dist(mouseX, mouseY,edgeX-80,edgeY-80) <= 170){
    flag = true
  }
  if((mouseX < 0 || mouseY < 0 || mouseX > edgeX || mouseY > edgeY)){
    flag = true
  }
  for(var i = 0;i<tanks.length;i++){
    if(dist(tanks[i].centerX,tanks[i].centerY,mouseX,mouseY) < 50){
      flag = true;
    }
  }
  return flag;
}
function draw() {
  if(start == 0){
    textSize(30);
    text("Click to start!",edgeX/2,edgeY/2);
    textSize(10);
    text("by How禎",edgeX-100,edgeY-10);
    if(mouseIsPressed){
      start = 1;
      bgm.loop =true;
      bgm.play();
      bgm.volume = 0.5;
    }
    return;
  }

  // background(67, 167, 69);
  // background(125, 215, 126);
  background(156, 193, 158);
  // image(img, 0, 0);

  panel();
  push(); // antsHome
  noStroke();
  for(var i = 0;i<101;i++){
    fill(200-i*2, 69, 19);
    circle(20,20,100-i);
  }
  fill(0, 0, 0);
  circle(20,20,60);
  noFill();
  stroke(200, 69, 19,100);
  circle(20,20,300);
  pop(); //antHome
  if(time != 0){ //ready to start
    push();
    // console.log("a");
    fill(255,255,255);
    textSize(30);
    text(time,15,35);
    if(frameCount%60 == 0){
      time -= 1;
    }
    pop();
  }
  push();
  cakes.show();
  pop();
  if(frameCount%60==0)
    document.getElementById("fps").innerHTML = Math.ceil(getFrameRate());
  if(setting){
    if(outofrange())nowTank.out = true;
    else nowTank.out = false;
    nowTank.updateLocate(mouseX,mouseY);
    nowTank.show();
    if(mouseIsPressed && !nowTank.out){
      tanks.push(new Tank(mouseX, mouseY, false));
      setting = false;
    }
  }
  for(var i = 0;i<tanks.length;i++){
    tanks[i].show();
  }
  for(var i = 0;i<ants.length;i++){
    if(time != 0) break;
    if(ants[i].life <= 0){
      mypoint += ants[i].level;
      mymoney += ants[i].level;
      if(selection.object != null){
        if(selection.object.type != "ant"){ //reflash button

          buttonControl();
        }
      }
      levelup();
      setants();
      if(ants[i].cake == true){
        cakeFly.push(new CakeFly(ants[i].x,ants[i].y,ants[i].angleDegree));
      }
      ants.splice(i, 1);
      panel();
      continue;
    }
    ants[i].show();
  }
  if(selection.object != null){
    if(selection.object.type == "ant"){
      var s = getAntInformation(selection.object);
      document.getElementById("object").innerHTML = s;
    }
  }
  for(var i =0;i<cakeFly.length;i++){
    cakeFly[i].show();
    if(cakeFly[i].back()){
      cakes.left += 1;
      cakes.carring -= 1;
      cakeFly.splice(i, 1);
    }
  }
  if(mymoney < newTankPrice){
    document.getElementById("newtank").disabled = true;
    document.getElementById("newtank").title = "$"+newTankPrice;
  }else {
    document.getElementById("newtank").disabled = false;
    document.getElementById("newtank").title = "$"+newTankPrice;
  }

//   stroke('purple'); // Change the color
// strokeWeight(10);
//   point(740,490);
  // if(ants.length < 6){
  //   ants.push(new Ant(random(0,20),random(0,20),1.2, 1));
  //   console.log(getFrameRate());
  // }
  // push();
  // fill('yellow');
  // translate(150,150);
  // rotate(-1*radians(frameCount));
  // ellipse(0-8, 0-8, 12, 12);
  // ellipse(0+7, 0+7, 10,10);
  // ellipse(0 ,0 , 10,10);
  // pop();
  //
  // push();
  // fill('yellow');
  // translate(250,250);
  // rotate(radians(frameCount));
  // ellipse(0-8, 0-8, 12, 12);
  // ellipse(0+7, 0+7, 10,10);
  // ellipse(0 ,0 , 10,10);
  // pop();
  /*if(time != 0){
    background(155);
    drawshoot();
    fill(0,0,0);
    textSize(100);
    text(time,300,100);
    keyDetect();
    if(vibrate < 150)
      vibrate+=8;
    else if(vibrate >= 150)
    {
      vibrate = 60;
      keyType = 0;
    }
    if(frameC != 4)
    {
      for(var j = 0;j<a.length;j++)
        a[j].update();
      frameC++;
    }

    if(frameCount%60==0 && stratTime == 1)
    {
      time--;
    }
  }
  else {
    background(155);
    BGM.pause();
    award.play();
    drawshoot();
    fill(0,0,0);
    textSize(100);
    text(score,200,200);
    textSize(50);
    text("Game Over!!",width/2-200,height/2);
  }*/

}
