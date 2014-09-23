var newP = function(x, y, heading) {
    var p = Particle.create(x, y, (Math.random() * 5) + 1, utils.randomRange(heading - 0.5, heading + 0.5) - Math.PI, 0, utils.randomRange(10, 20));
    p.radius = Math.random() * 3;
    p.col = 'rgb(' + Math.floor((Math.random() * 255)) + ',0,' + Math.floor(utils.randomRange(100, 255)) + ')';
    return p;
}

var Smoke = {
    x: 0,
    y: 0,
    limit: 50,
    particles: [],
    thrusting: false,
    create: function(x, y) {
        var obj = Object.create(this);
        obj.x = x;
        obj.y = y;
        for (var i = 0; i < this.limit; i++) {
            this.particles.push(newP(x, y));
        }
        return obj;
    },

    update: function(x, y, heading, thrusting) {
        this.x = x;
        this.y = y;
        if (this.particles.length > 0) {
            for (var i = 0; i < this.particles.length; i++) {
                this.particles[i].update();
                if (this.particles[i].life <= 1) {
                    this.particles.splice(i, 1); //if dead: remove
                }
            }
        }
        if (thrusting) {
            while (this.particles.length < this.limit) {
                this.particles.push(newP(x, y, heading));
            }
        }
    },
    draw: function(c, type) {
        switch(type){
            case 'lines':
                for (var i = 0; i < this.particles.length; i++) {
                    var p = this.particles[i];
                    c.save();
                    c.translate(p.x,p.y);
                    c.rotate(p.getHeading());
                    c.beginPath();
                    c.moveTo(5,0);
                    c.lineTo(utils.randomRange(2,20),0);
                    c.strokeStyle = p.col;
                    c.stroke();
                    c.restore();
                }
                break;
            default:
                for (var i = 0; i < this.particles.length; i++) {
                    var p = this.particles[i];
                    c.save();
                    c.translate(p.x,p.y);
                    c.rotate(p.getHeading());
                    c.beginPath();
                    c.arc(10, 0, p.radius, 0, Math.PI * 2, false);
                    c.fillStyle = p.col;
                    c.fill();
                    c.restore();
                }
                break;
        } 
    }
};