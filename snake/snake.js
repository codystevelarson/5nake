function Snake() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];
    this.record = 0;
    this.deaths = [];
    this.themeToggle = 0;
    this.theme = { body: color(0, 255, 0), stroke: color(255, 255, 0) };

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
                    this.deaths.push(color(0, 255, 0));
                } else {
                    this.deaths.push(color(255, 0, 0));
                }
                fr = 10;
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

    this.display = function () {
        stroke(this.theme.stroke);
        strokeWeight(2);
        for (let i = 0; i < this.total; i++) {
            let colOffest = 255 - ((this.total - i) * 15);

            this.tailFill(colOffest);
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        fill(this.theme.body);
        rect(this.x, this.y, scl, scl);
    }

    this.toggleColor = function () {
        if (this.themeToggle == 5) {
            this.themeToggle = 0;
        } else {
            this.themeToggle++;
        }

        switch (this.themeToggle) {
            case 0:
                this.theme.body = color(0, 255, 0);
                this.theme.stroke = color(255, 255, 0);
                break;
            case 1:
                this.theme.body = color(0, 0, 255);
                this.theme.stroke = color(0, 255, 255);
                break;
            case 2:
                this.theme.body = color(255, 0, 0);
                this.theme.stroke = color(255, 0, 255);
                break;
            case 3:
                this.theme.body = color(255, 255, 255);
                this.theme.stroke = color(0, 0, 0);
                break;
            case 4:
                this.theme.body = color(0, 0, 0);
                this.theme.stroke = color(255, 255, 255);
                break;
            case 5:
                this.theme.body = color(random(255), random(255), random(255));
                this.theme.stroke = color(random(255), random(255), random(255));
                break;
        }
    }

    this.tailFill = function (offset) {
        switch (this.themeToggle) {
            case 0:
                fill(0, offset, 0);
                break;
            case 1:
                fill(0, 0, offset);
                break;
            case 2:
                fill(offset, 0, 0);
                break;
            case 3:
                fill(offset, offset, offset);
                break;
            case 4:
                offset = Math.abs(offset - 255);
                fill(offset, offset, offset);
                break;
            case 5:
                fill(color(random(255), random(255), random(255)));
                break;
        }
    }
}