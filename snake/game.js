var loading = true;
var s;
var scl = 20;
var food;
var fr = 10;
var frBoost = 0;
var maxBoost = 30;

function preload() {
  loadAssets();
}

function setup() {
  let container = document.getElementById("screen");
  let canvas = createCanvas(800, 800);
  canvas.parent("screen");
  s = new Snake();
  food = new Food();
  frameRate(fr);
  food.pickLocation();
  setTimeout(function() {
    loading = false;
  }, 2500);
}

function mousePressed() {
  s.toggleColor();
}

function draw() {
  //CONDITIONS
  //LOADING
  if (loading) {
    push();
    textAlign(CENTER);
    textSize(50);
    noStroke();
    fill(randomColor());
    text("LOADING", width / 2, height / 2);
    pop();
    return;
  }

  //BOOST
  if (frBoost == 1) {
    changeRate("bg", 1);
    s.setTheme(s.themeToggle);
  } else if (frBoost != 0) {
    s.setTheme(5);
    let audioSpeed = map(frBoost, 0, maxBoost, 2, 1);
    changeRate("bg", audioSpeed);
    frBoost--;
  }
  frameRate(fr + frBoost);

  //BG
  background(0);

  //Scoreboard
  fill(255);
  textSize(20);
  text("Record: " + s.record, 20, 40);
  for (let i = 0; i < s.deaths.length; i++) {
    fill(s.deaths[i]);
    let x1 = 20 * (i + 1);
    rect(x1, 60, 10, 10);
  }

  let countColor = s.total > s.record ? color(0, 255, 0) : color(255);
  fill(countColor);
  text(s.total, width - 60, 40);

  //SNAKE
  //DEATH CHECK
  if (s.death()) {
    food.pickLocation();
    frBoost = 1;
    sound("death");
  }
  s.update();
  s.display();

  //FOOD
  //EAT CHECK
  if (s.eat(food)) {
    fr++;
    frBoost = maxBoost;
    food.pickLocation();
  }

  food.update();
  food.display();
}

function keyPressed() {
  if (keyCode == UP_ARROW || key == "w") {
    s.dir(0, -1);
  } else if (keyCode == DOWN_ARROW || key == "s") {
    s.dir(0, 1);
  } else if (keyCode == RIGHT_ARROW || key == "d") {
    s.dir(1, 0);
  } else if (keyCode == LEFT_ARROW || key == "a") {
    s.dir(-1, 0);
  }

  if (key == "m") {
    mute();
  }

  if (keyCode == 32) {
    s.toggleColor();
  }

  console.log(`${key} : ${keyCode}`);
}
