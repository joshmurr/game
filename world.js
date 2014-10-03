var World = Ship.extend({
    size: 0,
    z_index: 0,
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    pointing: Math.PI/2,
    friction: 0.98,
    layer: [],
    type: null,
    debug: false,
    init: function(z,size_) {
        this.z_index = z;
        console.log(this.z_index + this.type);
        this.size = size_*(z+1);
        this.x = this.y = -this.size/2;
        this.w = this.h = this.size;
        switch(this.type){
            case 'squares':
                for(var i=0; i<this.numStuff; i++){
                    t = {
                        x: Math.random()*this.w,
                        y: Math.random()*this.h,
                        w: Math.random()*100,
                        h: Math.random()*100,
                        col: 'rgb('+Math.floor(Math.random()*255)+',255,255)'
                    }
                    this.layer.push(t);
                }
                break;
            default:
                //circles
                for(var i=0; i<this.numStuff; i++){
                    t = {
                        x: Math.random()*this.w,
                        y: Math.random()*this.h,
                        r: Math.random()*100,
                        col: 'rgb(255,'+Math.floor(Math.random()*255)+',255)'
                    }
                    this.layer.push(t);
                }
            }

    },

    draw: function() {
        this.context.save();
        this.context.translate(this.canvasWidth/2+this.x, this.canvasHeight/2+this.y);
        if(this.debug) {
            this.context.rect(0,0,this.w,this.h);
            this.context.stroke();
        }
        switch(this.type){
            case 'squares':
               for (var i = 0; i < this.layer.length; i++) {
                    var t = this.layer[i];
                    this.context.fillStyle = t.col;
                    this.context.fillRect(t.x, t.y, t.w, t.h);
                }
                break;
            default:
                for (var i = 0; i < this.layer.length; i++) {
                    var t = this.layer[i];
                    this.context.beginPath();
                    this.context.arc(t.x, t.y, t.r, 0, Math.PI*2, false);
                    this.context.fillStyle = t.col;
                    this.context.fill();
                }
        }
        //c.rotate(a);
        
        this.context.restore();
    }
})