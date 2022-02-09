var PLAY = 1;
var END = 0;
var gameState = PLAY;

var steve, steve1, steve2, steveW, steveS, steveH;
var ground, invisibleGround1, invisibleGround2, groundImage, groundBlock;
var arrowGroup, arrowImage, arrow1;

var zombiesGroup, zombie1, zombie2;
var skeleton1, skeleton2;

var score;

var gameOver, gameOverImage;
var restart, restartImage;


function preload(){
  groundImage = loadImage("images/bg2.png");
  groundBlock = loadImage("images/grass.png");
  steveW = loadAnimation("images/steve.walking.png", "images/steve.walking.png", "images/steve.walking.png", "images/steve.still.png", "images/steve.still.png", "images/steve.still.png");
  steveH = loadAnimation("images/steve1.png")
  
  zombie1 = loadImage("images/zombie1.png");
  zombie2 = loadImage("images/zombie2.png");

  skeleton1 = loadImage("images/skeleton1.png");

  arrowImage = loadImage("images/arrow1.png")

   gameOverImage = loadImage("images/gameover.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  
  ground = createSprite(displayWidth/2, displayHeight/2,2*displayWidth, displayHeight);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.scale = 2;
  ground.velocityX = -5;
  
  steve = createSprite(50,height-325,20,50);
  steve.addAnimation("steveWalking",steveW);
  steve.addAnimation("hitting" , steveH);
  steve.addAnimation("gameEnd", gameOverImage);
  steve.scale = 0.3;
  // steve.debug = false;
  // steve.setCollider("circle", 0, 0, 40);  
  
  invisibleGround1 = createSprite(displayWidth,710,2*displayWidth,10);
  invisibleGround1.visible = false;

  
  invisibleGround2 = createSprite(displayWidth/2,950,2*displayWidth,10);
  invisibleGround2.visible = true;
  invisibleGround2.velocityX = -5;

  invisibleGround2.addImage("grass",groundBlock);
  invisibleGround2.scale = 1.6;
  
  // //create zombie and Cloud Groups
  zombiesGroup = createGroup();
  // cloudsGroup = createGroup();
  
  // score = 0;
  
  // //create gameOver and restart sprites
  // gameOver = createSprite(300, 80, 100, 100);
  // gameOver.addImage(gameOverImage);
  // gameOver.scale = 0.5;

  // restart = createSprite(300, 120, 100, 100);
  // restart.addImage(restartImage);
  // restart.scale = 0.5; 
  
  // gameOver.visible = false;
  // restart.visible = false;
  
}

function draw(){
  background("lightgreen");

  if(ground.x < 0) {
    ground.x = displayWidth
  }

  if(invisibleGround2.x < 0) {
    invisibleGround2.x = displayWidth/4
  }

  if(zombiesGroup.isTouching(steve)){
    gameState = END;
  }
    else if(gameState === END) {
      ground.velocityX = 0;
      steve.velocityX = 0;
      zombiesGroup.destroyEach();
      steve.changeAnimation("gameEnd", gameOverImage);

    }

  if(keyWentDown("k")){
    steve.changeAnimation("hitting",steveH)
    steve.scale = 0.9;

    arrow1 = createSprite(steve.X+50, steve.y,40,10);
    arrow1.velocityX = 8;
    arrow1.addImage(arrowImage)
    arrow1.scale = 0.5
  }

  if(keyWentUp("k")){
    steve.changeAnimation("steveWalking",steveW);
    steve.scale = 0.3;
  }

    //jump when the space key is pressed
    if(keyDown("space")&& steve.y >= 159) {
      steve.velocityY = -12;
      //jumpSound.play();
  }
  
  //add gravity
  steve.velocityY = steve.velocityY + 0.8
  steve.collide(invisibleGround2);

  spawnZombies();

  drawSprites();
}

function spawnZombies(){
  if (frameCount % 100 === 0){
    var zombie = createSprite(2*width,height-325,10,40);
    zombie.velocityX = -6;
    
     //generate random zombies
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: zombie.addImage(zombie1);
               break;
       case 2: zombie.addImage(zombie2);
               break;
      case 3: zombie.addImage(skeleton2);
               break;
       default: break;
     }
    
     //assign scale and lifetime to the zombie           
     zombie.scale = 0.2;
     zombie.lifetime = 1000;
    
    //add each zombie to the group
     zombiesGroup.add(zombie);
  }
 }

 function spawnSkeletons(){
  if (frameCount % 1250 === 0){

  }

}