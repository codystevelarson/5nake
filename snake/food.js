function Food() {
    this.pos;
    this.color;

    this.update = function () {
        this.color = color(random(255), random(255), random(255));
    }

    this.display = function () {
        strokeWeight(0);
        fill(this.color);
        rect(this.pos.x, this.pos.y, scl, scl);
    }

    this.pickLocation = function () {
        var cols = floor(width / scl);
        var rows = floor(height / scl);
        this.pos = createVector(floor(random(cols)), floor(random(rows)));
        this.pos.mult(scl);
    }

}