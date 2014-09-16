window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        ship = particle.create(width / 2, height / 2, 0, 0, 0),
        turningLeft = false,
        turningRight = false,
        thrusting = false;

    ship.friction = 0.9;
    ship.speed = 5;

    document.body.addEventListener("keydown", function(event) {
        switch (event.keyCode) {
            case 38: //up
                thrusting = true;
                break;
            case 37: //left
                turningLeft = true;
                break;
            case 39: //right
                turningRight = true;
            default:
                break;
        }
    });
    document.body.addEventListener("keyup", function(event) {
        // ship.setSpeed(0);
        switch (event.keyCode) {
            case 38: //up
                thrusting = false;
                break;
            case 37: //left
                turningLeft = false;
                break;
            case 39: //right
                turningRight = false;
            default:
                break;
        }
    });

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        if (turningRight) ship.turnRight();
        if (turningLeft) ship.turnLeft();
        if (thrusting) ship.setSpeed();

        ship.update();

        if (ship.x > width)   ship.x = 0;
        if (ship.x < 0)       ship.x = width;
        if (ship.y > height)  ship.y = 0;
        if (ship.y < 0)       ship.y = height;

        context.save();
        context.translate(ship.x, ship.y);
        context.rotate(ship.direction);
        context.beginPath();
        context.moveTo(10, 0);
        context.lineTo(-10, -7);
        context.lineTo(-10, 7);
        context.lineTo(10, 0);
        if (thrusting) {
            context.moveTo(-10, 0);
            context.lineTo(-18, 0);
        }
        context.stroke();
        context.restore();
    
        requestAnimationFrame(update);
    }
}