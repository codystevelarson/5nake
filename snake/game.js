var s;
var scl = 20;
var food;
var fr = 8;


function setup() {
    createCanvas(800, 800);
    s = new Snake();
    food = new Food();
    frameRate(fr);
    food.pickLocation();
}

function mousePressed() {
    s.total++;
}

function draw() {
    background(0);
    fill(255);
    textSize(20);
    text("Record: " + s.record, 20, 40);
    s.death();
    s.update();
    s.show();
    if (s.eat(food)) {
        fr++
        frameRate(fr);
        food.pickLocation();
    }

    food.update();
    food.display();
}

function keyPressed() {
    if (keyCode == UP_ARROW) {
        s.dir(0, -1);
    } else if (keyCode == DOWN_ARROW) {
        s.dir(0, 1);
    } else if (keyCode == RIGHT_ARROW) {
        s.dir(1, 0);
    } else if (keyCode == LEFT_ARROW) {
        s.dir(-1, 0);
    }
}


