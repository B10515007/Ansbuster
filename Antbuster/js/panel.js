function buttonControl() {
  var s = getTankInformation(selection.object);
  document.getElementById("object").innerHTML = s;

  var h = hierarchy(selection.object.type);

  var node = document.getElementById('upgrade'); //清空按鈕
  node.innerHTML = "";

  for(i in h["up"]){
    var btn = document.createElement("BUTTON");
    btn.innerHTML = h["up"][i];
    btn.className += "btn btn-info";
    btn.type = "button";
    btn.value = h["up"][i];
    btn.style = "margin-right:20px;";
    btn.onclick = function(){
      mymoney -= tankInfo[this.innerHTML]["price"];
      updowngrade(this.value,selection.object.type,1);
    };
    btn.disabled = consume(h["up"][i], selection.object.type, 1);
    btn.title = "$" + tankInfo[h["up"][i]]["price"];
    document.getElementById("upgrade").appendChild(btn);
  }

  var br = document.createElement("p");
  document.getElementById("upgrade").appendChild(br);
  var btn = document.createElement("BUTTON");
  btn.innerHTML = "downGrade to " + h["down"];
  btn.className += "btn btn-dark";
  btn.type = "button";
  btn.value = h["down"];
  btn.style = "margin-right:40px;";
  btn.onclick = function(){
    mymoney += Math.floor(tankInfo[selection.object.type]["price"] * 0.5);
    updowngrade(this.value,selection.object.type,0);
  };
  btn.title = "$" + Math.floor(tankInfo[selection.object.type]["price"] * 0.5);
  document.getElementById("upgrade").appendChild(btn);
}
function consume(tank,thistank,up){
  // console.log(tankInfo[tank]["price"]);
  // console.log(mymoney);
  if(mymoney < tankInfo[tank]["price"]){
    return true;
  }
  return false;
}
function updowngrade(tank,thistank,up) {
  console.log(tank);
  if(tank == null) return;
  switch (tank) {
    case "Sell":
      tanks.splice(selection.index,1);
      var node = document.getElementById('upgrade');
      node.innerHTML = "";
      selection = new Select(0,0);
    return;
    break;
    case "tank":
      var newtank = new Tank(selection.object.x, selection.object.y, false);
      break;
    case "support":
      var newtank = new Support(selection.object.x, selection.object.y, false);
      break;
    case "ice":
        var newtank = new Ice(selection.object.x, selection.object.y, false);
        break;
    case "ice2":
        var newtank = new Ice2(selection.object.x, selection.object.y, false);
        break;
    case "poison":
        var newtank = new Poison(selection.object.x, selection.object.y, false);
        break;
    case "poison2":
        var newtank = new Poison2(selection.object.x, selection.object.y, false);
        break;
    case "attack":
      var newtank = new Attack(selection.object.x, selection.object.y, false);
      break;
    case "shotgun":
      var newtank = new Shotgun(selection.object.x, selection.object.y, false);
      break;
    case "shotgun2":
      var newtank = new Shotgun2(selection.object.x, selection.object.y, false);
      break;
    case "single":
        var newtank = new Single(selection.object.x, selection.object.y, false);
        break;
    case "rocket":
        var newtank = new Rocket(selection.object.x, selection.object.y, false);
        break;
    case "rocket2":
        var newtank = new Rocket2(selection.object.x, selection.object.y, false);
        break;
    case "machinegun":
        var newtank = new Machinegun(selection.object.x, selection.object.y, false);
        break;
    case "machinegun2":
        var newtank = new Machinegun2(selection.object.x, selection.object.y, false);
        break;
    case "triplegun":
        var newtank = new Triplegun(selection.object.x, selection.object.y, false);
        break;
    case "crazygun":
        var newtank = new Crazygun(selection.object.x, selection.object.y, false);
        break;
    default:

  }
  tanks.splice(selection.index,1);
  tanks.push(newtank);
  selection.object = tanks[tanks.length-1];
  selection.index = tanks.length-1;
  selection.object.selected = true;
  select = true;
  // document.getElementById("object").innerHTML = selection.object.type;
  buttonControl();
  panel();
}

function getTankInformation(tank){
  var s = "type : " + tank.type + "</br>" +
          "range : " + tank.range + "</br>" +
          "speed : "+ tank.speed + "</br>" +
          "frequecy : " + tank.rate + " shot/sec</br>" +
          "damage : " + tank.damage;
  return s;
}
function getAntInformation(ant){
  var status = "";
  if(ant.countDownIce != 0){
    status += "Freeze !!! ";
  }
  if (ant.countDownPoison != 0) {
    status += "Poisoned !!! ";
  }
  var s = "level : " + ant.level + "</br>" +
          "life : "+ Math.ceil(ant.life) + " / "+ Math.ceil(ant.fullLife) + "</br>" +
          "status : " + status;
  return s;
}
function volumeControl(value){
  console.log(value);
  bgm.volume = value/100;
}
