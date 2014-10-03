window.onload = function() {
    //alert("New game!");
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        ship = Ship.extend({
            x: width/2,
            y: height/2,
            friction: 0,
            context: context
        }),
        worlds = {
            worlds: [],
            init: function(){
                for(var i=this.worlds.length-1; i>-1; i--){
                    this.worlds[i].init(i,4000);
                }
            },
            draw: function(){
                for(var i=0; i<this.worlds.length; i++){
                    this.worlds[i].draw();
                }
            },
            update: function(){
                for(var i=0; i<this.worlds.length; i++){
                    this.worlds[i].update();
                }
            },
            rotateRight: function(){
                for(var i=0; i<this.worlds.length; i++){
                    this.worlds[i].rotateRight();
                }
            },
            rotateLeft: function(){
                for(var i=0; i<this.worlds.length; i++){
                    this.worlds[i].rotateLeft();
                }
            },
            move: function(){
                for(var i=0; i<this.worlds.length; i++){
                    this.worlds[i].setSpeed(this.worlds[i].speed);
                    this.worlds[i].setHeading(this.worlds[i].pointing);
                }
            }
        }
        circleWorld = World.extend({
            canvasWidth: width,
            canvasHeight: height,
            speed: 2,
            vx: 0,
            vy: 0,
            numStuff: 50,
            type: 'circles',
            context: context
        }),
        squareWorld = World.extend({
            canvasWidth: width,
            canvasHeight: height,
            speed: 3,
            vx: 0,
            vy: 0,
            numStuff: 200,
            type: 'squares',
            context: context
        }),
        smoke = Smoke.extend({
            x:ship.x,
            y:ship.y,
            context: context,
        }),
        turningLeft = false,
        turningRight = false,
        thrusting = false,
        gamePaused = false,
        spacePress = false;

    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    // var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame; // Unused for now....
    var start = window.mozAnimationStartTime; // Only supported in FF. Other browsers can use something like Date.now().

    worlds.worlds.push(circleWorld,squareWorld);
    worlds.init();
    smoke.init();
    // circleWorld.makeLayers();

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

        if (turningRight) {
            worlds.rotateRight();
            ship.rotateRight();
        }
        if (turningLeft) {
            worlds.rotateLeft();
            ship.rotateLeft();
        }
        if (thrusting) {
            worlds.move();
            ship.setSpeed(ship.speed);
            ship.setHeading(ship.pointing);
        }

        worlds.update();
        worlds.draw();

        smoke.update(ship.x,ship.y,ship.pointing,thrusting);
        smoke.draw('lines');
        ship.update();
        ship.draw();

        /* TODO:
        When circleWorld reaches limits, ship is then free to roam up to screen edges.
        */
        // if (circleWorld.x > 0) circleWorld.x = 0;
        // if (circleWorld.x < -circleWorld.w) circleWorld.x = -circleWorld.w;
        // if (circleWorld.y > 0) circleWorld.y = 0;
        // if (circleWorld.y < -circleWorld.h) circleWorld.y = -circleWorld.h;
        requestAnimationFrame(update);
    }

}