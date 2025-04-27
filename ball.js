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
        context.arc(this.center, this.center, this.bigcircle, 0, Math.PI * 1.7, false);
        context.strokeStyle = 'grey';
        context.lineWidth = 5;
        context.stroke();
        context.closePath();

        context.beginPath();
        context.strokeStyle = 'green';
        context.arc(this.center, this.center, this.bigcircle, Math.PI * 1.7, Math.PI * 2, false);
        context.lineWidth = 5;
        context.stroke();
        context.closePath();
    }

    isEscape() {
        var distance = 
            Math.sqrt((this.xpos - this.center) * (this.xpos - this.center) 
                + (this.ypos - this.center) * (this.ypos - this.center));
        if (distance < this.bigcircle - this.radius) {
            return false;
        }
        var angle = Math.atan2(this.ypos - this.center, this.xpos - this.center);
        if (angle < 0) {
            angle += Math.PI * 2;
        }
        if (angle > Math.PI*1.7 && angle < Math.PI*2) {
            return true;
        }
        return false;
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
        }
    }
}

let audio = new Audio('boing.mp3');
audio.load();
audio.volume = 0.1;

let ball1 = new ball(300, 300, 10, '#f56', -1, -1);

let balls = [];
balls.push(ball1);

function CreateBall(x, y){
    let newBall = new ball(x, y, 10, '#f56', (Math.random()-0.5)*2, (Math.random()-0.5)*2);
    balls.push(newBall);
}

let updateBall = function() {
    context.clearRect(0, 0, window_width, window_height);
    balls.forEach(ball => {
        ball.update();
        ball.draw(context);
        if(ball.isEscape()) {
            balls.splice(balls.indexOf(ball), 1);
            audio.currentTime = 0;
            audio.play();
            CreateBall(ball.center, ball.center);
            CreateBall(ball.center, ball.center);
        }
    })
    requestAnimationFrame(updateBall);
}

updateBall();