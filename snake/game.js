var screen = { loading: true, menu: false, game: false },
  s,
  scl = 20,
  food,
  fr = 10,
  frBoost = 0,
  maxBoost = 30,
  canX,
  canY,
  capture,
  showCam = false;

function preload() {
  let body = document.querySelector('body');
  canX = Math.round((body.offsetWidth - 200) / scl) * scl;
  canY = Math.round((body.offsetHeight - 200) / scl) * scl;
  capture = createCapture(VIDEO);
  capture.size(canX, canY);
  capture.hide();
  loadAssets();
}

function setup() {
  noCursor();

  let canvas = createCanvas(canX, canY);
  canvas.parent('screen');
  s = new Snake();
  food = new Food();
  frameRate(fr);
  food.pickLocation();
  setTimeout(function () {
    screen.loading = false;
    screen.menu = true;
  }, 3000);
}

function mousePressed() {
  s.toggleColor();
}

function draw() {
  //BG
  bg();
  //CONDITIONS
  //LOADING
  if (screen.loading) {
    loadingScreen();
    return;
  }

  // Main menu
  if (screen.menu) {
    mainMenu();
    return;
  }

  if (screen.game) {
    //Scoreboard
    scoreBoard();

    //Game
    game();

    if (screen.pause) pause();
    return;
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW || key == 'w') {
    s.direction = [0, -1];
    return;
  }
  if (keyCode == DOWN_ARROW || key == 's') {
    s.direction = [0, 1];

    return;
  }
  if (keyCode == RIGHT_ARROW || key == 'd') {
    s.direction = [1, 0];

    return;
  }
  if (keyCode == LEFT_ARROW || key == 'a') {
    s.direction = [-1, 0];

    return;
  }

  // if (key == 'x') {
  //   s.die();
  //   return;
  // }

  if (key == 'p') {
    if (screen.game) {
      screen.pause = !screen.pause;
    }
  }

  if (key == 'm') {
    mute();
    return;
  }

  if (key == 'c') {
    showCam = !showCam;
  }

  // Spacebar
  if (keyCode == 32) {
    if (screen.loading && screen.menu) {
      screen.loading = false;
      screen.menu = true;
      return;
    }

    //Start Game
    if (screen.menu) {
      screen.menu = false;
      screen.game = true;
      sound('death');
      return;
    }

    if (screen.game) {
      s.toggleColor();
      return;
    }
    return;
  }

  // Escape
  if (keyCode == 27) {
    if (screen.menu) {
      screen.loading = true;
      return;
    }

    if (screen.game) {
      s.reset();
      food.pickLocation();
      screen.game = false;
      screen.menu = true;
      return;
    }
  }

  console.log(`${key} : ${keyCode}`);
}

function loadingScreen() {
  push();
  textAlign(CENTER);
  textSize(150);
  textFont(f_AirStrike);
  noStroke();
  fill(randomColor('bg'));
  text('S N A K E', width / 2, height / 2);
  pop();
}

function mainMenu() {
  push();

  textAlign(CENTER);
  textSize(150);
  textFont(f_AirStrike);
  noStroke();
  fill(randomColor('bg'));
  text('S N A K E', width / 2, height / 2);

  fill(255);
  textFont(f_Nasa);
  textSize(16);
  text('PRESS SPACE', width / 2, height / 2 + 50);

  if (s.record) {
    fill(randomColor());
    text(`HIGH SCORE: ${s.record}`, width / 2, 50);
  }

  let controlBase = { x: 40, y: height - 175, line: 25 };
  fill(color(0, 255, 255));
  textAlign(LEFT);
  text('CONTROLS:', controlBase.x - 20, controlBase.y);
  controlBase.y += controlBase.line;
  text('Move --- WASD / Arrow Keys', controlBase.x, controlBase.y);
  controlBase.y += controlBase.line;
  text('Pause --- P', controlBase.x, controlBase.y);
  controlBase.y += controlBase.line;
  text('Mute --- M', controlBase.x, controlBase.y);
  controlBase.y += controlBase.line;
  text('Camera --- C', controlBase.x, controlBase.y);
  controlBase.y += controlBase.line;
  text('Change Snake Theme --- Space / Click', controlBase.x, controlBase.y);
  controlBase.y += controlBase.line;
  text('Main Menu --- Esc', controlBase.x, controlBase.y);
  pop();
}

function scoreBoard() {
  push();
  textFont(f_Nasa);
  textSize(20);
  let scoreBase = {
    x: 20,
    y: 40,
    line: 20,
  };

  let countColor = s.total > s.record ? color(0, 255, 255) : color(255);
  fill(countColor);
  text(`Total: ${s.total}`, scoreBase.x, scoreBase.y);
  scoreBase.y += scoreBase.line;
  if (s.record) {
    fill(255);
    text(`Record: ${s.record}`, scoreBase.x, scoreBase.y);
    scoreBase.y += scoreBase.line;
  }

  for (let i = 0; i < s.deaths.length; i++) {
    fill(s.deaths[i]);
    let x1 = 20 * (i + 1);
    rect(x1, scoreBase.y, 10, 10);
  }

  pop();
}

function game() {
  //BOOST
  if (frBoost == 1) {
    changeAudioSpeed('bg', 1);
    s.setTheme(s.themeToggle);
  } else if (frBoost != 0) {
    s.setTheme(5);
    let audioSpeed = map(frBoost, 0, maxBoost, 2, 1);
    changeAudioSpeed('bg', audioSpeed);
    frBoost--;
  }
  frameRate(fr + frBoost);

  //SNAKE
  //DIRECTION
  if (s.direction) s.dir(s.direction[0], s.direction[1]);
  //DEATH CHECK
  if (s.death()) {
    food.pickLocation();
    frBoost = 1;
    sound('death');
  }
  if (!screen.pause) s.update();
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

function pause() {
  push();
  textAlign(CENTER);
  textSize(100);
  textFont(f_AirStrike);
  noStroke();
  fill(255);
  text('P A U S E', width / 2, height / 2 + 50);
  pop();
}

var bgX = 0;
var bgY = 0;
function bg() {
  background(0);
  if (showCam) {
    let img = capture;
    image(img, 0, 0, canX, canY);
    return;
  }
  push();
  // stroke(`rgba(255,255,255,.01)`);

  // let lines = 1000;
  // for (let i = 0; i < lines; i++) {
  //   if (bgX >= width) bgX = 0;
  //   if (bgY >= width) bgY = 0;
  //   bgX += 1 * (deltaTime / 50);
  //   let spread = i;
  //   line(bgX - spread, 0, -100 + bgX - spread, canY);
  // }
  pop();
}
