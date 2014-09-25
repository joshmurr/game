window.onload = function() {
    //alert("New game!");
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        world = World.create(30,30),
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

    ship.friction = 0.95;
    ship.speed = 6;

    world.makeLayers();
    world.makeStuffInLayers();

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

        if (turningRight) ship.rotateRight();
        if (turningLeft) ship.rotateLeft();
        if (thrusting) {
            ship.setSpeed();
            ship.setHeading();
        }
        if(spacePress) {
            world.layers[0].getData(2);
            world.layers[1].getData(2);
            world.layers[2].getData(2);
        }
        ship.update();
        smoke.update(ship.x,ship.y,ship.pointing,thrusting);
        smoke.draw(context, 'lines');

        // if (ship.x > width) ship.x = 0;
        // if (ship.x < 0) ship.x = width;
        // if (ship.y > height) ship.y = 0;
        // if (ship.y < 0) ship.y = height;

        if (ship.x > width-border.x) {
            ship.x = width-border.x;
            for(var i=0; i<world.layers.length; i++){
                world.layers[i].x -= ship.getSpeed();//*world.layers[i].zindex;
            }
        }
        if (ship.x < border.x) {
            ship.x = border.x;
            for(var i=0; i<world.layers.length; i++){
                world.layers[i].x += ship.getSpeed();//*world.layers[i].zindex;
            }
        }
        if (ship.y > height-border.y) {
            ship.y = height-border.y;
            for(var i=0; i<world.layers.length; i++){
                world.layers[i].y -= ship.getSpeed();//*world.layers[i].zindex;
            }
        }
        if (ship.y < border.y) {
            ship.y = border.y;
            for(var i=0; i<world.layers.length; i++){
                world.layers[i].y += ship.getSpeed();//*world.layers[i].zindex;
            }
        }

        context.save();
        context.translate(ship.x, ship.y);
        context.rotate(ship.pointing);
        context.beginPath();
        //context.arc(0, 0, 1, 0, Math.PI * 2, false); //Centre point
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