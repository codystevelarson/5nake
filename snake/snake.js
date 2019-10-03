function Snake() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];
    this.record = 0;

    this.dir = function (x, y) {
        if ((Math.abs(this.xspeed) == Math.abs(x) || Math.abs(this.yspeed) == Math.abs(y)) && this.total > 0) {
            //dont let snake back over itself
            return;
        }
        this.xspeed = x;
        this.yspeed = y;
    }

    this.eat = function (food) {
        var d = dist(this.x, this.y, food.pos.x, food.pos.y);
        if (d < 1) {
            this.total++;
            return true;
        }
        return false;
    }

    this.death = function () {
        for (let i = 0; i < this.tail.length; i++) {
            var pos = this.tail[i];
            var d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                if (this.total > this.record) {
                    this.record = this.total;
                }
                fr = 8;
                frameRate(fr);
                this.total = 0;
                this.tail = [];
            }
        }
    }

    this.update = function () {
        if (this.total === this.tail.length) {
            for (let i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }
        this.tail[this.total - 1] = createVector(this.x, this.y);


        this.x += this.xspeed * scl;
        this.y += this.yspeed * scl;
        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);


    }

    this.show = function () {
        stroke(255, 255, 0);
        strokeWeight(2);
        for (let i = 0; i < this.total; i++) {
            let colOffest = 255 - ((this.total - i) * 15);

            fill(0, colOffest, 0);
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        fill(0, 255, 0);
        rect(this.x, this.y, scl, scl);
    }
}