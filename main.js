window.onload = function() {
    //alert("New game!");
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        world = World.create(width / 2, height / 2,3000,3000),
        ship = Ship.create(width / 2, height / 2, 0, 0),
        smoke = Smoke.create(ship.x,ship.y),
        border = {
            x: width/4,
            y: height/4
        },
        turningLeft = false,
        turningRight = false,
        thrusting = false,
        gamePaused = false,
        spacePress = false;

    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    // var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame; // Unused for now....
    var start = window.mozAnimationStartTime; // Only supported in FF. Other browsers can use something like Date.now().

    ship.friction = 0;
    world.friction = 0.98;
    world.makeLayers();

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
            case 32: //space
                spacePress = true;
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
            case 32: //space
                spacePress = false;
            default:
                break;
        }
    });

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        world.draw(context);

        if (turningRight) {
            world.rotateRight();
            ship.rotateRight();
        }
        if (turningLeft) {
            world.rotateLeft();
            ship.rotateLeft();
        }
        if (thrusting) {
            world.setSpeed();
            world.setHeading();
            ship.setSpeed();
            ship.setHeading();
        }

        ship.update();
        smoke.update(ship.x,ship.y,ship.pointing,thrusting);
        smoke.draw(context, 'lines');
        world.update();

        /* TODO:
        When world reaches limits, ship is then free to roam up to screen edges.
        */
        if (world.x > 0) world.x = 0;
        if (world.x < -world.w) world.x = -world.w;
        if (world.y > 0) world.y = 0;
        if (world.y < -world.h) world.y = -world.h;
        
        context.save();
        context.translate(ship.x, ship.y);
        context.rotate(ship.pointing);
        context.beginPath();
        context.arc(0, 0, 1, 0, Math.PI * 2, false); //Centre point
        context.moveTo(15, 0);
        context.lineTo(-5, -7);
        context.lineTo(-5, 7);
        context.lineTo(15, 0);
        // if (thrusting) {
        //     context.moveTo(-5, 0);
        //     context.lineTo(-12, 0);
        // }
        context.fillStyle = "red";
        context.fill();
        context.stroke();
        context.restore();

        requestAnimationFrame(update);
    }

}