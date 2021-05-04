let backgroundImg;
let enemyImgs;
let friendlyImg;
let spitImg;
let explosionImg;
let colorImgs;

function preload(){
    backgroundImg = loadImage('imgs/backgroundImg.jpg');
    enemyImgs = [loadImage('imgs/enemy1Img.png'),loadImage('imgs/enemy2Img.png'),loadImage('imgs/enemy3Img.png'),loadImage('imgs/enemy4Img.png'),loadImage('imgs/enemy5Img.png')];
    friendlyImg = loadImage('imgs/friendlyImg.png');
    spitImg = loadImage('imgs/spitImg.png');
    explosionImg = loadImage('imgs/explosionImg.png');
    colorImgs = [loadImage('imgs/redImg.png'),loadImage('imgs/blueImg.gif'),loadImage('imgs/greenImg.png')];
}

let width = 500;
let height = 500;

let difficulty = 1;
let difficultyMultiplierPerFrame = 1.0001;
let enemies = [];
let player;
let friendlySpit = [];
let enemySpit = [];
let explosions = [];
let fallingPowerUps = [];

let yBodyDefaultSpeed = 0.7;
let yDefaultSpitSpeed = 2;
let yBodySpeed = 0.7;
let yFriendlySpitSpeed = 2;
let yEnemySpitSpeed = 2;
let spitDefaultDelay = 30;
let spitDelay = spitDefaultDelay;
let spitCounter = 0;
let xDefaultStrafeSpeed = 3;
let xStrafeSpeed = xDefaultStrafeSpeed;

let powerUps = {'slowMotion':0,'superSpeed':0,'rapidFire':0};

let PowerUp = class {
    constructor() {
        this.xPos = Math.random()*width;
        this.yPos = 0;
        this.power = Math.floor(Math.random()*3);
    }

    update() {
        this.yPos += yBodySpeed;
        for(let i=0;i<friendlySpit.length;i++){
            if(Math.abs(friendlySpit[i].xPos-this.xPos)<15 && friendlySpit[i].yPos<this.yPos+10){
                return this.delete();
            }
        }
        if(Math.abs(player.xPos-this.xPos)<15 && Math.abs(player.yPos-this.yPos)<15){
            powerUps[Object.keys(powerUps)[this.power]] += 500;
            return this.delete();
        }
        if(this.yPos>height+50){
            return this.delete();
        }
        return false;
    };

    draw() {
        image(colorImgs[this.power],this.xPos-10,this.yPos-10,20,20);
    };

    delete() {
        return true;
    };
}

let Enemy = class {
    constructor() {
        this.xPos = Math.random()*width;
        this.yPos = 0;
        this.enemy = Math.floor(Math.random()*5);
    };

    update() {
        this.yPos += yBodySpeed;
        for(let i=0;i<friendlySpit.length;i++){
            if(Math.abs(friendlySpit[i].xPos-this.xPos)<15 && friendlySpit[i].yPos<this.yPos+10){
                friendlySpit.splice(i,1);
                return this.destroy();
            }
        }
        if(this.yPos>height+50){
            return this.delete();
        }
        if(Math.random()<difficulty/1000){
            this.spit();
        }
        return false;
    };

    spit() {
        enemySpit.push(new Spit(this.xPos,this.yPos,1));
    };

    draw() {
        image(enemyImgs[this.enemy],this.xPos-10,this.yPos-10,20,20);
    };

    destroy() {
        explosions.push(new Explosion(this.xPos,this.yPos));
        return true;
    };

    delete() {
        return true;
    };
};

let Player = class {
    constructor(){
        this.xPos = width/2;
        this.yPos = height-50;
    };

    update() {
        for(let i=0;i<enemySpit.length;i++){
            if(Math.abs(enemySpit[i].xPos-this.xPos)<10 && Math.abs(enemySpit[i].yPos-this.yPos)<10){
                enemySpit[i].delete();
                return this.destroy();
            }
        }
        if(keyIsDown(LEFT_ARROW)){
            this.xPos -= xStrafeSpeed;
        }
        if(keyIsDown(RIGHT_ARROW)){
            this.xPos += xStrafeSpeed;
        }
        if(keyIsDown(32)){
            this.spit();
        }
        return false;
    };

    spit() {
        if(spitCounter == 0){
            friendlySpit.push(new Spit(this.xPos,this.yPos,-1));
            spitCounter = spitDelay;
        }
    };

    draw() {
        image(friendlyImg,this.xPos-20,this.yPos-20,40,40);
    };

    destroy() {
        explosions.push(new Explosion(this.xPos,this.yPos));
        return true;
    };
}

let Spit = class {
    constructor(xPos,yPos,direction){
        this.xPos = xPos;
        this.yPos = yPos;
        this.direction = direction;
    };

    update() {
        if(this.direction == 1){
            this.yPos += this.direction*yEnemySpitSpeed;
        }else{
            this.yPos += this.direction*yFriendlySpitSpeed;
        }
        if(this.yPos>height+50 || this.yPos<-50){
            return this.delete();
        }
        return false;
    };

    draw() {
        image(spitImg,this.xPos-10,this.yPos-10,20,20);
    };

    delete() {
        return true;
    };
}

let Explosion = class {
    constructor(xPos,yPos){
        this.xPos = xPos;
        this.yPos = yPos;
        this.opacity = 255;
    };

    update() {
        this.opacity -= 3;
        if(this.opacity == 0){
            return this.delete();
        }
        return false;
    };

    draw() {
        image(explosionImg,this.xPos-25,this.yPos-25,50,50);
    };

    delete() {
        return true;
    };
}

function setup(){
    createCanvas(width, height);
    player = new Player();
}

function draw(){
    difficulty *= difficultyMultiplierPerFrame;
    background(255,255,255);
    image(backgroundImg, 1, 1, width, height);
    if(powerUps.rapidFire>0){
        spitDelay = 2;
        powerUps.rapidFire--;
    }else{
        spitDelay = spitDefaultDelay;
    }
    if(powerUps.slowMotion>0){
        yBodySpeed = yBodyDefaultSpeed/3;
        yEnemySpitSpeed = yDefaultSpitSpeed/3;
        powerUps.slowMotion--;
    }else{
        yEnemySpitSpeed = yDefaultSpitSpeed;
        yBodySpeed = yBodyDefaultSpeed;
    }
    if(powerUps.superSpeed>0){
        xStrafeSpeed = xDefaultStrafeSpeed*2;
        powerUps.superSpeed--;
    }else{
        xStrafeSpeed = xDefaultStrafeSpeed;
    }
    if(spitCounter>0){
        spitCounter--;
    }
    if(Math.random()<difficulty/100){
        enemies.push(new Enemy());
    }
    if(Math.random()<difficulty/1000){
        enemies.push(new PowerUp());
    }
    for(let i=0;i<fallingPowerUps.length;i++){
        if(fallingPowerUps[i].update()){
            fallingPowerUps.splice(i,1);
        }
    }
    for(let i=0;i<enemies.length;i++){
        if(enemies[i].update()){
            enemies.splice(i,1);
        }
    }
    if(player.update()){
        console.log('game over');
        enemies = []
        enemySpit = []
        difficulty = 1
    }
    for(let i=0;i<explosions.length;i++){
        if(explosions[i].update()){
            explosions.splice(i,1);
        }
    }
    for(let i=0;i<enemySpit.length;i++){
        if(enemySpit[i].update()){
            enemySpit.splice(i,1);
        }
    }
    for(let i=0;i<friendlySpit.length;i++){
        if(friendlySpit[i].update()){
            friendlySpit.splice(i,1);
        }
    }
    for(let i=0;i<fallingPowerUps.length;i++){
        fallingPowerUps.draw();
    }
    for(let i=0;i<enemies.length;i++){
        enemies[i].draw();
    }
    player.draw()
    for(let i=0;i<explosions.length;i++){
        explosions[i].draw();
    }
    for(let i=0;i<enemySpit.length;i++){
        enemySpit[i].draw();
    }
    for(let i=0;i<friendlySpit.length;i++){
        friendlySpit[i].draw();
    }
}