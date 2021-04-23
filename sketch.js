var PLAY = 1;
var END = 0;
var gameState = PLAY;

var car,track,npc,gameover;

function preload() {
trackImage = loadImage("images/car track.jpg");
carImage = loadImage("images/Car game main car (2).png");
npcImage = loadImage("images/NPC_cars-removebg-preview.png")
gameoverImage = loadImage("images/game over.png");
}

function setup() {
  createCanvas(400,400);
  track = createSprite(200,200,400,800);
  track.addImage(trackImage);
  track.scale = 1.20;
  track.velocityY = 3;
  track.y = track.height/2;
 car =  createSprite(200,350, 50, 50);
 car.addImage(carImage);
 car.scale = 0.2;
 npcGroup = new Group();
 car.debug = true;
 car.setCollider("rectangle",0,0,180,250);
 score = 0;
 

}

function draw() {
  background(0); 
 
  if(keyWentDown("right")){
    car.velocityX = 5;
  }
  if(keyWentUp("right")){
    car.velocityX = 0;
  }

  if(keyWentDown("left")){
     car.velocityX = -5;
  }
  
  if(keyWentUp("left")){
    car.velocityX = 0;
  }
  if(gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);

   
  
    if(track.y>275){
      track.y = track.height/2;
    }
    spawnnpc();
    if(npcGroup.isTouching(car)){
      gameState = END;
    }
  }
  else if(gameState === END) {
  track.velocityY = 0;
  npcGroup.setVelocityYEach(0);
  npcGroup.setLifetimeEach(-1);
  car.velocityX = 0;
  gameover = createSprite(200,200,10,10);
 gameover.addImage(gameoverImage);

  }
  drawSprites();
  text("Score: "+ score, 300,50);
}

function spawnnpc() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var npc = createSprite(0,0,40,10);
    npc.x = Math.round(random(20,380));
    npc.addImage(npcImage);
    npc.scale = 0.5;
    npc.velocityY = 3;
    
     //assign lifetime to the variable
    npc.lifetime = 200;
    
    //adjust the depth
    //npc.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    npcGroup.add(npc);
  }
  
}