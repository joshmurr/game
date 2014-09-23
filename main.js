window.onload = function() {
    //alert("New game!");
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        ship = Ship.create(width / 2, height / 2, 0, 0),
        smoke = Smoke.create(ship.x,ship.y),
        turningLeft = false,
        turningRight = false,
        thrusting = false,
        gamePaused = false;

    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    // var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame; // Unused for now....
    var start = window.mozAnimationStartTime; // Only supported in FF. Other browsers can use something like Date.now().

    ship.friction = 0.99;
    ship.speed = 3;

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
                break;
            case 80: //p
                alert("PAUSED");
            default:
                break;
        }
    });
    document.body.addEventListener("keyup", function(event) {
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

        if (turningRight) ship.rotateRight();
        if (turningLeft) ship.rotateLeft();
        if (thrusting) {
            ship.setSpeed();
            ship.setHeading();
        }

        ship.update();
        smoke.update(ship.x,ship.y,ship.pointing,thrusting);
        smoke.draw(context);

        if (ship.x > width) ship.x = 0;
        if (ship.x < 0) ship.x = width;
        if (ship.y > height) ship.y = 0;
        if (ship.y < 0) ship.y = height;

        context.save();
        context.translate(ship.x, ship.y);
        context.rotate(ship.pointing);
        context.beginPath();
        context.arc(0, 0, 1, 0, Math.PI * 2, false); //Centre point
        context.moveTo(15, 0);
        context.lineTo(-5, -7);
        context.lineTo(-5, 7);
        context.lineTo(15, 0);
        if (thrusting) {
            context.moveTo(-5, 0);
            context.lineTo(-12, 0);
        }
        context.stroke();
        context.restore();

        requestAnimationFrame(update);
    }

}