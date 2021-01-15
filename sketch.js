var dog, happyDog, dogimg, foods, foodStock;
var database;

function preload()
{
dogimg = loadImage("images/dogImg.png");
happyDog = loadImage("images/dogImg1.png");

}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250, 300, 50, 50);
  dog.addImage(dogimg);
  dog.scale = 0.3
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock)
  
}


function draw() {  
  background(46, 139, 87);
  drawSprites();
  if(keyWentDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(happyDog);
  }

  fill("white");
  textSize(20);
  text("Press Up arrow key to feed Browny", 120, 20);
  fill("blue");
  text("Food Remaining : " + foods, 150, 180);

}

function readStock(data) {
  foods = data.val();

}

function writeStock (x)  {

  if(x <= 0){
   x = 0
  }
   else{
     x = x-1;
   }

   database.ref("/").update({
     Food:x
   });

}


