var Ship = Object.create(Particle);

extend(Ship, {
	direction: -Math.PI / 2,
    pointing: -Math.PI / 2,
    turnSpeed: .1,
    speed: 1,
    rotateLeft: function() {
        this.pointing -= this.turnSpeed;
    },

    rotateRight: function() {
        this.pointing += this.turnSpeed;
    }
})

var World = Object.create(Ship);

extend(World,{
    w: 0,
    h: 0,
    direction:  Math.PI/2,
    pointing:   Math.PI/2,
    numStuff: 200,
    layers: [],
    create: function(x,y,w, h) {
        var obj = Object.create(this);
        obj.w = w;
        obj.h = h;
        obj.x = -x/2;
        obj.y = -y/2;
        obj.vx = Math.cos(this.direction) * this.speed;
        obj.vy = Math.sin(this.direction) * this.speed;
        return obj;
    },
    makeLayers: function() {
        var layerM = layer.create(this.w,this.h,this.makeStuff());
        var layerN = layer.create(this.w,this.h,this.makeStuff());
        this.layers.push(layerN, layerM);
    },
    makeStuff: function(){
        var tmp = [];
        for (var i = 0; i < this.numStuff; i++) {
            var c = {
                x: Math.random() * this.w,
                y: Math.random() * this.h,
                r: 10,
                col: 'rgba('+Math.floor(Math.random() * 255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+',0.8)',
                shape: Math.PI * 2
            }
            tmp.push(c);
        }
        return tmp;
    },
    draw: function(c) {
        c.save();
        c.translate(this.x, this.y);
        //c.rotate(a);
        for (var i = 0; i < this.layers.length; i++) {
            for (var j = 0; j < this.layers[i].circles.length; j++) {
                var circ = this.layers[i].circles[j];
                c.beginPath();
                c.arc(circ.x, circ.y, circ.r, 0, circ.shape, false);
                c.fillStyle = circ.col;
                c.fill();
            }
        }
        c.restore();
    }
})

var layer = {
    w: 0,
    h: 0,
    circles: [],
    create: function(width, height, thing){
        var obj = Object.create(this);
        obj.w = width;
        obj.h = height;
        obj.circles = thing;
        return obj;
    }
}