var score = 0;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var speed2 = 10;

//Class Ball
class Ball {
    constructor(x, y, radius, color, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        // this.speed = speed;
        this.dx = speed;
        this.dy = -speed;
    }

    drawBall() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        this.x += this.dx
        this.y += this.dy;
    }
}

//Class Pad
class Pad {
    rightPressed = false;
    leftPressed = false;

    constructor(x, width, height, color, speed) {
        this.x = x;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
    }

    drawPad() {
        ctx.beginPath();
        ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    moveLeft() {
        if (this.x > 0) {
            this.x -= this.speed;
        }
    }

    moveRight() {
        if (this.x < canvas.width - pad.width) {
            this.x += this.speed;
        }
    }
}

class Gif {
    y;
    x;
    height;
    width;
    speed;

    constructor(x, y, height, width, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    drawGif() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
        this.y += 2;
    }

    moveUp() {
        this.y += 0.1;
    }
}

var ball = new Ball(canvas.width / 2, canvas.height / 2, 10, "#0095DD", 2);
var pad = new Pad((canvas.width - 70) / 2, 90, 10, "0095DD", 5);
var gif = new Gif(240, 0, 10, 10)

// Hàm vẽ
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.drawBall();
    pad.drawPad();
    gif.drawGif();
    gif.moveUp();
    document.getElementById("score").innerHTML = "SCORE: " + score;
    if (ball.x > canvas.width - ball.radius || ball.x < ball.radius) {
        ball.dx = -ball.dx;
    }
    if (ball.y < ball.radius) {
        ball.dy = -ball.dy;
    }
    if (gif.y == pad.height||gif.x==pad.height) {//Không bắt được sự kiện chạm vào quà cộng điểm + làm xuất hiện quà mỗi 10 điểm;
        score += 10;
    }
    if (ball.y + ball.dy > canvas.height - ball.radius - pad.height) {
        if (ball.x + ball.dx > pad.x && ball.x + ball.dx < pad.x + pad.width) {
            ball.dy = -ball.dy;
            score++;
            switch (score) {
                case 5: {
                    ball.color = "red";
                    pad.color = "red";
                    pad.width -= 3;
                    ball.dx+=1;
                    ball.dy-=1;
                    break;
                }
                case 10: {
                    ball.color = "green";
                    pad.color = "green";
                    pad.width -= 6;
                    ball.dx+=1.1;
                    ball.dy-=1.1;
                    break;
                }
                case 15: {
                    ball.color = "black";
                    pad.color = "black";
                    pad.width -= 9;
                    ball.dx+=1.2;
                    ball.dy-=1.2;
                    break;
                }
                case 20: {
                    ball.color = "#D2691E";
                    pad.color = "#D2691E";
                    pad.width -= 12;
                    ball.dx+=1.3;
                    ball.dy-=1.3;
                    break;
                }
                case 25: {
                    ball.color = "#2F4F4F";
                    pad.color = "#2F4F4F";
                    pad.width -= 15;
                    ball.dx+=1.4;
                    ball.dy-=1.4;
                    break;
                }
                case 30: {
                    ball.color = "FF00FF";
                    pad.color = "FF00FF";
                    pad.width -= 18;
                    ball.dx+=1.5;
                    ball.dy-=1.5;
                    break;
                }
                case 35: {
                    ball.color = "#8B0000";
                    pad.color = "#8B0000";
                    pad.width -= 21;
                    ball.dx+=1.6;
                    ball.dy-=1.6;
                    break;
                }
            }
        }
    }
    if (ball.y > canvas.height - ball.radius) {
        document.location.reload();
        alert("THUA RỒI, GÀ VÃI !!!");
    }
    if (pad.rightPressed && pad.x < canvas.width - pad.width) {
        pad.x += pad.speed;
    } else if (pad.leftPressed && pad.x > 0) {
        pad.x -= pad.speed;
    }
}

setInterval(draw, speed2);

function moveKeyDown(event) {
    switch (event.keyCode) {
        case 37 : {
            pad.moveLeft();
            pad.leftPressed = true;
            break;
        }
        case 39: {
            pad.moveRight()
            pad.rightPressed = true;
            break;
        }
    }
}

function moveKeyUp(event) {
    switch (event.keyCode) {
        case 37 : {
            pad.leftPressed = false;
            break;
        }
        case 39: {
            pad.rightPressed = false;
            break;
        }
    }
}

window.addEventListener("keydown", moveKeyDown);
window.addEventListener("keyup", moveKeyUp);