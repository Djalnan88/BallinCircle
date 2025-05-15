let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let window_height = window.innerHeight;
let window_width = window.innerWidth;
canvas.width = window_width;
canvas.height = window_height;
canvas.style.background = "#ff8"

class ball {
    constructor(xpos, ypos, radius, color, xspeed, yspeed) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.color = color;
        this.xspeed = xspeed;
        this.yspeed = yspeed;
        this.center = 300;
        this.bigcircle = 250;
        this.gravity = 0.1;
    }
    draw(context) {
        context.beginPath();
        context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();

        context.beginPath();
        context.arc(this.center, this.center, this.bigcircle, 0, Math.PI * 2, false);
        context.strokeStyle = 'grey';
        context.lineWidth = 5;
        context.stroke();
        context.closePath();
    }

    update() {
        this.xpos += this.xspeed;
        this.ypos += this.yspeed;
        this.yspeed += this.gravity;
        var distance = 
            Math.sqrt((this.xpos - this.center) * (this.xpos - this.center) 
                + (this.ypos - this.center) * (this.ypos - this.center));

        if (distance > this.bigcircle - this.radius) {
            var dx = this.xpos - this.center;
            var dy = this.ypos - this.center;
            var norm = Math.sqrt(dx * dx + dy * dy);
            dx /= norm;
            dy /= norm;
            var dot = this.xspeed * dx + this.yspeed * dy;
            this.xspeed -= 2 * dot * dx;
            this.yspeed -= 2 * dot * dy;
            this.xpos = this.center + (this.bigcircle - this.radius) * dx;
            this.ypos = this.center + (this.bigcircle - this.radius) * dy;
            this.radius += 1;
        }
    }

}

let ball0 = new ball(200, 100, 10, "red", 1, 0);
let updateball = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball0.update();
    ball0.draw(context);
    requestAnimationFrame(updateball);
}
updateball();