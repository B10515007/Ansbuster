var tankevolution = {
  tank:[
    "attack",
    "support"
  ],
  attack:[
    "single",
    "shotgun"
  ],
  single:[
    "rocket",
    "machinegun"
  ],
  machinegun:[
    "machinegun2"
  ],
  rocket:[
    "rocket2"
  ],
  shotgun:[
    "shotgun2",
    "triplegun"
  ],
  shotgun2:[

  ],
  triplegun:[
    "crazygun"
  ],
  support:[
    "ice"
  ],
  ice:[
    "ice2",
    "poison"
  ],
  poison:[
    "poison2"
  ]
}
var tankInfo = {
  tank:{
    type : "tank",
    range : 120,
    speed : 6,
    rate : 3,
    damage : 2,
    price : 200
  },
  attack:{
    type : "attack",
    range : 150,
    speed : 8,
    rate : 3,
    damage : 5,
    price : 160
  },
  support:{
    type : "support",
    range : 130,
    speed : 7,
    rate : 3,
    damage : 4,
    price : 120
  },
  single:{
    type : "single",
    range : 180,
    speed : 10,
    rate : 3,
    damage : 10,
    price : 210
  },
  rocket:{
    type : "rocket",
    range : 200,
    speed : 10,
    rate : 4,
    damage : 20,
    price : 400
  },
  rocket2:{
    type : "rocket2",
    range : 250,
    speed : 12,
    rate : 4,
    damage : 100,
    price : 1000
  },
  machinegun:{
    type : "machinegun",
    range : 120,
    speed : 8,
    rate : 8,
    damage : 8,
    price : 500
  },
  machinegun2:{
    type : "machinegun2",
    range : 150,
    speed : 10,
    rate : 15,
    damage : 12,
    price : 1000
  },
  shotgun:{
    type : "shotgun",
    range : 150,
    speed : 5,
    rate : 3,
    damage : 8,
    price : 230
  },
  shotgun2:{
    type : "shotgun2",
    range : 160,
    speed : 8,
    rate : 4,
    damage : 10,
    price : 600
  },
  triplegun:{
    type : "triplegun",
    range : 150,
    speed : 7,
    rate : 3,
    damage : 8,
    price : 700
  },
  crazygun:{
    type : "crazygun",
    range : 150,
    speed : 10,
    rate : 3,
    damage : 20,
    price : 1000
  },
  ice:{
    type : "ice",
    range : 120,
    speed : 3,
    rate : 2,
    damage : 2,
    slowTime : 600,
    slowRate : 0.5,
    price : 250
  },
  ice2:{
    type : "ice2",
    range : 140,
    speed : 5,
    rate : 3,
    damage : 2,
    slowTime : 900,
    slowRate : 0.5,
    price : 600
  },
  poison:{
    type : "poison",
    range : 150,
    speed : 2,
    rate : 1,
    damage : 1,
    deepDamage : (2), //*60就是以秒購幾滴
    slowRate : 0.8,
    poisonTime : 480,
    price : 1000
  },
  poison2:{
    type : "poison2",
    range : 150,
    speed : 3,
    rate : 1,
    damage : 2,
    deepDamage : (6), //*60就是以秒購幾滴
    slowRate : 0.6,
    poisonTime : 600,
    price : 1500
  },

}
