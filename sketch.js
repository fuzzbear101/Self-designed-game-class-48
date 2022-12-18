var astronaut,astronautImg;
var oxygenTank, oxygenTankImg, oxygenGroup;
var alien, alienImg, alienGroup;
var rocket, rocketImg;
var bg, bgImg;
var edges;
var invisibleTop, invisibleBottom;

function preload(){
  astronautImg = loadImage("images/astronaut.png");
  oxygenTankImg = loadImage("images/oxygen.png");
  alienImg = loadImage("images/alien.png");
  rocketImg = loadImage("images/rocket.png");
  bgImg = loadImage("images/background.jpg");
}

function setup(){
  //background
  createCanvas(windowWidth,windowHeight);
  bg = createSprite(displayWidth/2,displayHeight/2 - 40,20,40);
  bg.addImage(bgImg);
  bg.scale = 0.22;

  noSmooth();

  //astronaut
  astronaut = createSprite(60,200,50,50);
  astronaut.addImage(astronautImg);
  astronaut.scale = 0.1; 
  astronaut.visible = true;
  astronaut.debug = false;
  astronaut.setCollider("rectangle",0,0,950,600);

  //rocket
  rocket = createSprite(displayWidth/2 - 600,displayHeight/2 + 100,50,50);
  rocket.addImage(rocketImg);
  rocket.scale = 0.05;
  rocket.visible = true;

  //edges
  edges = createEdgeSprites();

  //invisibleTop and bottom
  invisibleTop = createSprite(windowWidth/2,85, windowWidth, 10)
  invisibleBottom = createSprite(windowWidth/2,windowHeight-55,windowWidth,10)
  invisibleBottom.visible = false;
  invisibleTop.visible = false;
  

  alienGroup = createGroup()
  oxygenGroup = createGroup()


}

function draw(){
  background(0)
  spawnAliens();
  spawnOxygen();
  
  //movement of astronaut
  if (keyDown("left")) {
    astronaut.x -= 5
  }

  if (keyDown("right")) {
    astronaut.x += 5
  }

  if (keyDown("up")) {
    astronaut.y -= 5
  }

  if (keyDown("down")) {
    astronaut.y += 5
  }
  
  astronaut.collide(edges[0])
  astronaut.collide(edges[1])
  astronaut.collide(invisibleTop);
  astronaut.collide(invisibleBottom);

  alienGroup.bounceOff(edges);
  alienGroup.bounceOff(invisibleBottom);
  alienGroup.bounceOff(invisibleTop);
  alienGroup.bounce(alienGroup);

  //oxygen bar
  var oxygenRemainingBack = createSprite(675,40,200,20)
  var oxygenRemainingFront = createSprite(675,40,200,20)




  drawSprites();


}

function spawnAliens() {
  if (frameCount % 60 === 0 && alienGroup.length < 8)  {
    alien = createSprite(random(10,windowWidth-100),random(100,windowHeight-200),50,50);
    alien.addImage(alienImg);
    alien.scale = 0.09;
    alien.velocityY = random(1,4);
    alien.velocityX = random(1,4);    
    alienGroup.add(alien);
  }

}

function spawnOxygen() {
  if (frameCount % 60 === 0 && oxygenGroup.length < 5) {
    oxygenTank = createSprite(random(10,windowWidth-100),random(100,windowHeight-200),50,50);
    oxygenTank.addImage(oxygenTankImg);
    oxygenTank.scale = 0.15;
    oxygenGroup.add(oxygenTank);
  }
}
