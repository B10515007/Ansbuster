class Select{
    constructor(x,y){
      this.x = x;
      this.y = y;
      this.object;
      this.index;
    }
    distance(x1,y1){
      var d = dist(this.x,this.y,x1,y1);
      if(d <= 20){
        return true;
      }
      else{
        return false;
      }
    }
}
