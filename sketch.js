let snake;
let rez = 20;
let food;
let w;
let h;
let headImg;
let bodyImg;
let foodImg;

function preload() {
  headImg = loadImage('head.png', imageLoaded, imageLoadError);
  bodyImg = loadImage('body.png', imageLoaded, imageLoadError);
  foodImg = loadImage('food.png', imageLoaded, imageLoadError);
}

function imageLoaded() {
  console.log('Image loaded successfully.');
}

function imageLoadError(err) {
  console.error('Image failed to load:', err);
}

function setup() {
  createCanvas(600, 600);
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(10);
  snake = new Snake();
  foodLocation();
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      snake.setDir(-1, 0);
      break;
    case RIGHT_ARROW:
      snake.setDir(1, 0);
      break;
    case DOWN_ARROW:
      snake.setDir(0, 1);
      break;
    case UP_ARROW:
      snake.setDir(0, -1);
      break;
  }
}

function draw() {
  scale(rez);
  background(0);
  if (snake.eat(food)) {
    foodLocation();
  }
  snake.update();
  snake.show();
  
  // Draw the food
  image(foodImg, food.x, food.y, 1, 1);
}

class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(floor(w / 2), floor(h / 2));
    this.xdir = 0;
    this.ydir = 0;
    this.len = 0;
  }

  setDir(x, y) {
    this.xdir = x;
    this.ydir = y;
  }

  update() {
    let head = this.body[this.body.length - 1].copy();
    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
  }

  grow() {
    let head = this.body[this.body.length - 1].copy();
    this.len++;
    this.body.push(head);
  }

  eat(pos) {
    let head = this.body[this.body.length - 1];
    if (head.x === pos.x && head.y === pos.y) {
      this.grow();
      return true;
    }
    return false;
  }

  endGame() {
    let head = this.body[this.body.length - 1];
    if (head.x > w - 1 || head.x < 0 || head.y > h - 1 || head.y < 0) {
      return true;
    }
    for (let i = 0; i < this.body.length - 1; i++) {
      let part = this.body[i];
      if (part.x === head.x && part.y === head.y) {
        return true;
      }
    }
    return false;
  }

  show() {
    for (let i = 0; i < this.body.length; i++) {
      if (i === this.body.length - 1) {
        if (headImg instanceof p5.Image) {
          image(headImg, this.body[i].x, this.body[i].y, 1, 1);
        }
      } else {
        if (bodyImg instanceof p5.Image) {
          image(bodyImg, this.body[i].x, this.body[i].y, 1, 1);
        }
      }
    }
  }
}
