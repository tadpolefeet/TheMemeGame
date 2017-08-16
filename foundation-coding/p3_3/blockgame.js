
var stateActions = { preload: preload, create: create, update: update };

var game = new Phaser.Game(800, 500, Phaser.AUTO, 'game', stateActions);

//VARIABLES (LOTS OF VARIABLES ARE "BLOCK" BECAUSE THE MEMES USED TO BE BLOCKS!)

var orange ;
var count = 0;


var score = 10;
var labelScore = "0";
var spawnx;
var spawny;
var xyv;
var v;

var block1;
var block2;
var block3;
var type;
var blocktime = 1;
var triple = 0;

function preload(){

game.load.image("harambe", "../assets/pepe.png");
game.load.image("background", "../assets/background3.png");
game.load.image("red", "../assets/red.jpg");
game.load.image("blue", "../assets/pepe2.png");
game.load.image("green", "../assets/illuminati.png");
game.load.image("scope", "../assets/scope.png");
game.load.audio("triple", "../assets/triple.mp3");
}







function create(){


var backimage = game.add.sprite(0, 0, "background" );

labelScore = game.add.text(60, 20, "10",
{font: "30px Arial", fill: "#ffffff"});

game.physics.startSystem(Phaser.Physics.ARCADE);

player = game.add.sprite(400, 250, "harambe");
game.physics.arcade.enable(player);
player.height = 60;
player.width = 50;
player.anchor.set(0.5, 0.5);


var spawninterval = blocktime * Phaser.Timer.SECOND;
game.time.events.loop(
spawninterval,
choosespawnlocation
);



}





function update(){

  game.input.keyboard
  .addKey(Phaser.Keyboard.RIGHT)
  .onDown
  .add(right);
  game.input.keyboard
  .addKey(Phaser.Keyboard.LEFT)
  .onDown
  .add(left);
  game.input.keyboard
  .addKey(Phaser.Keyboard.UP)
  .onDown
  .add(up);
  game.input.keyboard
  .addKey(Phaser.Keyboard.DOWN)
  .onDown
  .add(down);

  game.physics.arcade.overlap(
  player, block1, collide1);

  game.physics.arcade.overlap(
  player, block2, collide2);

  game.physics.arcade.overlap(
  player, block3, collide3);




if(player.x > 775){changeScore(-5);
player.body.velocity.x = -300;
  player.x = 750;
}
if(player.x < 25){changeScore(-5);
player.body.velocity.x = 300;
  player.x = 50;
}
if(player.y > 475){changeScore(-5);
player.body.velocity.y = -300;
  player.y = 450;
}
if(player.y < 25){changeScore(-5);
  player.y = 50;
player.body.velocity.y = 300;
}


if(score < 0.1){
player.y = 250;
score = -100;
player.x = 400;
player.body.velocity.x = 0;
player.body.velocity.y = 0;
var snipe = game.add.sprite(0, 0, "scope" );
snipe.height = 500;
snipe.width = 800;
var die = game.add.text(60, 20, "GAME OVER :( HARAMBE DIED!",
{font: "30px Arial", fill: "#ffffff"});

}

}





function right(){
player.body.velocity.x = 0;
player.body.velocity.y = 0;
player.body.velocity.x = 300;
}

function left(){
player.body.velocity.x = 0;
player.body.velocity.y = 0;
player.body.velocity.x = -300;
}

function up(){
player.body.velocity.y = 0;
player.body.velocity.x = 0;
player.body.velocity.y = - 300;
}

function down(){
player.body.velocity.y = 0;
player.body.velocity.x = 0;
player.body.velocity.y = 300;
}



function choosespawnlocation(){
  var side = game.rnd.integerInRange(1, 4);

if(side==1){  //top
spawny = -50;
spawnx = game.rnd.integerInRange(50, 750);
xyv = 1;
v = 1;
}

else if(side==2){  //right
spawnx = 850;
spawny = game.rnd.integerInRange(50, 450);
xyv = 2;
v = -1;
}

else if(side==3){  //bottom
spawny = 550;
spawnx = game.rnd.integerInRange(50, 750);
xyv = 1;
v = -1;
}

else{  //left
spawnx = -50;
spawny = game.rnd.integerInRange(50, 450);
xyv = 2;
v = 1;
}

spawn(spawnx, spawny, xyv, v); //xyv - 1=vertical, 2 = horizontal. v = velocity(positive or negative)

}





function spawn(spawnx, spawny, xyv, v){
if(score < 16){ type = game.rnd.integerInRange(1, 3);} // chooses type
else{type = game.rnd.integerInRange(1, 5);}

if(type==1){

  block1 = game.add.sprite(spawnx, spawny, "green");
  block1.height = 50;
  block1.width = 50;
  game.physics.arcade.enable(block1);
  if(xyv==1){block1.body.velocity.y = v*150;}
  else{block1.body.velocity.x = v*150;}
}

else if (type==2){

  block2 = game.add.sprite(spawnx, spawny, "red");
  block2.height = 50;
  block2.width = 50;
  game.physics.arcade.enable(block2);
  if(xyv==1){block2.body.velocity.y = v*400;}
  else{block2.body.velocity.x = v*400;}

}
else if (type==4){

  block2 = game.add.sprite(spawnx, spawny, "red");
  block2.height = 50;
  block2.width = 50;
  game.physics.arcade.enable(block2);
  if(xyv==1){block2.body.velocity.y = v*400;}
  else{block2.body.velocity.x = v*400;}

}
else if (type==3){

  block3 = game.add.sprite(spawnx, spawny, "blue");
  block3.height = 50;
  block3.width = 50;
  game.physics.arcade.enable(block3);
  if(xyv==1){block3.body.velocity.y = v*400;}
  else{block3.body.velocity.x = v*400;}

}
else{

  block3 = game.add.sprite(spawnx, spawny, "blue");
  block3.height = 50;
  block3.width = 50;
  game.physics.arcade.enable(block3);
  if(xyv==1){block3.body.velocity.y = v*300;}
  else{block3.body.velocity.x = v*300;}

}


}

function changeScore(x){
score = score + x;
labelScore.setText(score.toString());
}

function collide1(){
  triple++;
  if(triple == 3){triple = 0;
game.sound.play("triple");}
changeScore(5);
block1.kill();
}

function collide2(){
  triple = 0;
changeScore(-5);
block2.kill();
}

function collide3(){
  triple = 0;
score = Math.sqrt(score);
score = Math.round(score);
labelScore.setText(score.toString());

block3.kill();
}
