var World = Ship.extend({
    w: 0,
    h: 0,
    numStuff: 200,
    layer: [],
    type: null,
    init: function() {
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
        this.context.translate(this.x, this.y);
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