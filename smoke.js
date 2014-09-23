var newP = function(x,y,heading){
    var p = Particle.create(x, y, (Math.random() * 5)+1, utils.randomRange(heading-0.5,heading+0.5)-Math.PI, 0, 30);
    p.radius = Math.random()*3;
    p.col = 'rgb('+Math.floor((Math.random()*255))+',0,'+Math.floor((Math.random()*255))+')';
    return p;
}

var Smoke = {
	x:0,
	y:0,
    limit: 10,
    particles: [],
    create: function(x,y){
    	var obj = Object.create(this);
    	obj.x = x;
    	obj.y = y;
        for(var i=0; i<this.limit; i++){
            this.particles.push(newP(x,y));
        }
    	return obj;
    },
    
    update: function(x,y,heading) {
    	this.x = x;
    	this.y = y;
        if (this.particles.length > 0) {
            for (var i = 0; i < this.particles.length; i++) {
                if(this.particles[i].life <= 1){
                    this.particles.splice(i,1,newP(this.x,this.y,heading));
                }
                this.particles[i].update();
            }
        }
    },
    draw: function(c){
    	for (var i = 0; i < this.particles.length; i++) {
    	    var p = this.particles[i];
    	    c.beginPath();
    	    c.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
            c.fillStyle = p.col;
    	    c.fill();
    	}
    }
};