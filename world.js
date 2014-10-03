var World = Ship.extend({
    w: 0,
    h: 0,
    numStuff: 200,
    layers: [],
    context: null,
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
    draw: function() {
        this.context.save();
        this.context.translate(this.x, this.y);
        //c.rotate(a);
        for (var i = 0; i < this.layers.length; i++) {
            for (var j = 0; j < this.layers[i].circles.length; j++) {
                var circ = this.layers[i].circles[j];
                this.context.beginPath();
                this.context.arc(circ.x, circ.y, circ.r, 0, circ.shape, false);
                this.context.fillStyle = circ.col;
                this.context.fill();
            }
        }
        this.context.restore();
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