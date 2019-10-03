var s;
var scl = 20;
var food;
var fr = 10;


function setup() {
    let container = document.getElementById("APP");
    let canvas = createCanvas(800, 800);
    canvas.parent("APP");
    s = new Snake();
    food = new Food();
    frameRate(fr);
    food.pickLocation();
}

function mousePressed() {
    s.toggleColor();
}

function draw() {
    background(0);
    fill(255);
    textSize(20);
    text("Record: " + s.record, 20, 40);
    for (let i = 0; i < s.deaths.length; i++) {
        fill(s.deaths[i]);
        let x1 = 20 * (i + 1);
        rect(x1, 60, 10, 10);
    }
    if (s.death()) {
        food.pickLocation();
    }
    s.update();
    s.display();
    if (s.eat(food)) {
        fr++
        frameRate(fr);
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
}


