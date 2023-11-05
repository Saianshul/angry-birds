const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

let engine, world;
let backgroundImg,platform;
let bg = "sprites/bg1.png";
let gameState = "onSling";

let box1, box2, box3, box4, box5;
let pig1, pig2;
let bird;
let slingshot;

let score = 0;

function preload() {
    getBackgroundImg();
}

function setup() {
    let canvas = createCanvas(1200, 400);

    engine = Engine.create();
    world = engine.world;

    ground = new Ground(600, height, 1200, 20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700, 320, 70, 70);
    box2 = new Box(920, 320, 70, 70);
    box3 = new Box(700, 240, 70, 70);
    box4 = new Box(920, 240, 70, 70);
    box5 = new Box(810, 160, 70, 70);

    pig1 = new Pig(810, 350);
    pig2 = new Pig(810, 220);

    log1 = new Log(810, 260, 300, PI/2);
    log2 =  new Log(810, 180, 300, PI/2);    
    log3 = new Log(760, 120, 150, PI/7);
    log4 = new Log(870, 120, 150, -PI/7);

    bird = new Bird(200, 50);

    slingshot = new SlingShot(bird.body, {x: 200, y: 50});
}

function draw() {
    if (backgroundImg) {
        background(backgroundImg);
    
        noStroke();
        textSize(35);
        fill("white");
        text("Score: " + score, width - 300, 50);
    }

    Engine.update(engine);

    ground.display();
    platform.display();

    box1.display();
    box2.display();
    box3.display();
    box4.display();
    box5.display();

    pig1.display();
    pig1.score();
    pig2.display();
    pig2.score();

    log1.display();
    log2.display();
    log3.display();
    log4.display();

    bird.display();
    
    slingshot.display();    
}

function mouseDragged() {
    Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
}

function mouseReleased() {
    slingshot.fly();
    gameState = "launched";
}

function keyPressed() {
    if (keyCode === 32) {
        bird.trajectory = [];
        Matter.Body.setPosition(bird.body, {x: 200, y: 50});
        slingshot.attach(bird.body);
    }
}

async function getBackgroundImg() {
    let response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    let responseJSON = await response.json();
    let datetime = responseJSON.utc_datetime;
    let hour = datetime.slice(11, 13);
    console.log(hour);
    
    if (hour >= 07 && hour <= 19) {
        bg = "sprites/bg1.png";
    } else {
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
}