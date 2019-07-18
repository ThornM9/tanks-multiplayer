let player;
let tanks = [];
let map;
let seed = "hello";
let game_over = false;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  rectMode(CENTER);
  frameRate(60);

  player = new Tank(20, 20);
  map = new Map(seed);
  map.createWalls();
}

function draw() {
  if (game_over) {
    return;
  }
  background(255);
  for (let i = 0; i < tanks.length; i++) {
    tanks[i].update();
    tanks[i].show();
  }

  processKeys();
  player.update();
  player.show();

  for (let i = player.bullets.length - 1; i > 0; i--) {
    let bullet = player.bullets[i];

    let result = bullet.hitTank([player]);
    if (result.hit) {
      console.log("you're dead son!");
      game_over = true;
      return;
    }

    result = bullet.hitTank(tanks);
    tanks = result.tanks;

    bullet.update();
    bullet.show();
  }

  for (let i = 0; i < map.cells.length; i++) {
    let cell = map.cells[i];
    cell.show();
  }
}

function processKeys() {
  if (keyIsDown(LEFT_ARROW)) {
    player.rotateLeft();
  } else if (keyIsDown(RIGHT_ARROW)) {
    player.rotateRight();
  }

  if (keyIsDown(UP_ARROW)) {
    console.log("moving forward");
    player.moveForward();
  } else if (keyIsDown(DOWN_ARROW)) {
    console.log("moving back");
    player.moveBackward();
  } else {
    player.setVel(0, 0);
  }
}

function keyPressed() {
  if (keyCode === 77) {
    player.shoot();
  }
}