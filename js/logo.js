var particles = [];
var viscosity;
var c;

function setup() {
    createCanvas(window.innerWidth, 400);
    noStroke();

    viscosity = 0.95;

    for (var i = 0; i < 20; i++) {
        c = color(random(255), random(255), random(255), 192);
        particles.push(new Particle(random(width), random(height), c));
    }
}

function draw() {
    background(50);

    // makes the particles attract/repel each other
    handleInteractions();

    // moves each particle, then draws it
    for (var i = 0; i < particles.length; i++) {
        particles[i].move();
        particles[i].display();
    }
}

function Particle(x, y, c) {
    this.xPos = x; this.yPos = y;
    this.xVel = 0; this.yVel = 0;
    this.mass = random(0.003, 0.03);
    this.colour = c;

    // moves the particle
    this.move = function () {
        this.xPos += this.xVel;
        this.yPos += this.yVel;
    }

    // displays the particle
    this.display = function () {
        fill(this.colour)
        ellipse(this.xPos, this.yPos, this.mass * 500, this.mass * 500)
    };
}
function handleInteractions(i, j) {
    for (var i = 0; i < particles.length; i++) {
        var accX = 0; var accY = 0;

        // particle interaction
        for (var j = 0; j < particles.length; j++) {
            if (i != j) {
                var x = particles[j].xPos - particles[i].xPos;
                var y = particles[j].yPos - particles[i].yPos;
                var dis = sqrt(x * x + y * y);
                if (dis < 1) dis = 1;

                var force = (dis - 160) * particles[j].mass / dis;
                accX += force * x;
                accY += force * y;
            }

            // mouse interaction
            var x = mouseX - particles[i].xPos;
            var y = mouseY - particles[i].yPos;
            var dis = sqrt(x * x + y * y);

            // adds a dampening effect
            if (dis < 4) dis = 4;
            if (dis > 5) dis = 5;

            var force = (dis - 5) / (5 * dis);
            accX += force * x;
            accY += force * y;
        }
        particles[i].xVel = particles[i].xVel * viscosity + accX * particles[i].mass;
        particles[i].yVel = particles[i].yVel * viscosity + accY * particles[i].mass;
    }
}

// creates a new particle
function mousePressed() {
    if (particles.length < 500) {
        c = color(random(255), random(255), random(255), 192);
        particles.push(new Particle(mouseX, mouseY, c));
    }
    else {
        for (var i = 0; i < 500; i++) {
            particles.pop();
        }
    }
}

// creates a new particle
function mouseDragged() {
    if (particles.length < 500) {
        c = color(random(255), random(255), random(255), 192);
        particles.push(new Particle(mouseX, mouseY, c));
    }
    else {
        for (var i = 0; i < 500; i++) {
            particles.pop();
        }
    }
}