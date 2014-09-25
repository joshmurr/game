var World = {
    w: 0,
    h: 0,
    layers: [],
    create: function(w, h) {
        var obj = Object.create(this);
        this.w = w;
        this.h = h;

        return obj;
    },
    makeLayers: function(n) {
        var layer1 = WorldLayer.create(this.w, this.h, 3);
        // layer1.zindex = 3; //closest
        // layer1.numThings = 100;
        // layer1.makeThings();
        layer1.col = 'rgba(255,0,0,0.5)'; //RED

        var layer2 = WorldLayer.create(this.w, this.h, 2);
        // layer2.zindex = 2; //mid
        // layer2.numThings = 200;
        // layer2.makeThings();
        layer2.col = 'rgba(0,255,0,0.5)'; // GREEN

        var layer3 = WorldLayer.create(this.w, this.h, 1);
        // layer3.zindex = 1; //furthest
        // layer3.numThings = 100;
        // layer3.makeThings();
        layer3.col = 'rgba(0,0,255,0.5)'; // BLUE

        this.layers.push(layer3,layer2,layer1);
    },
    makeStuffInLayers: function(){
    	for(var i=0; i<this.layers.length; i++){
    		this.layers[i].makeThings();
    	}
    },
    draw: function(c) {
        for (var i = 0; i < this.layers.length; i++) {
            this.layers[i].draw(c);
        }
    }
};

var WorldLayer = {
    w: 0,
    h: 0,
    x: 0,
    y: 0,
    numThings: 5,
    type: '',
    zindex: 1,
    col: '',
    circles: [],
    create: function(w, h, z) {
        var obj = Object.create(this);
        this.zindex = z;
        this.w = w;
        this.h = h;
        // this.x = -w / 2;
        // this.y = -h / 2;
        //this.circles = this.makeThings();
        return obj;
    },
    makeThings: function() {
        for (var i = 0; i < this.numThings; i++) {
            var c = {
                x: Math.random() * this.w,
                y: Math.random() * this.h,
                r: 2,
                col: 'rgb(0,' + Math.floor((Math.random() * 255) + 100) + ',0)',
                shape: Math.PI * 2
            }
            this.circles.push(c);
        }
    },
    getData: function(n) {
        console.log(n + ": " + this.circles[n].x);
    },
    draw: function(c) {
        c.save();
        c.translate(this.x, this.y);
        for (var i = 0; i < this.circles.length; i++) {
            var circ = this.circles[i];
            c.beginPath();
            c.arc(circ.x, circ.y, circ.r, 0, circ.shape, false);
            c.fillStyle = this.col;
            c.fill();
        }
        c.restore();
    }
};