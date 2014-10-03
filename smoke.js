var newP = function(x_, y_, heading_) {
    //var p = Particle.create(x, y, (Math.random() * 5) + 1, utils.randomRange(heading - 0.5, heading + 0.5) - Math.PI, 0, utils.randomRange(10, 20));
    var h = utils.randomRange(heading_ - 0.5, heading_ + 0.5) - Math.PI,
        s = (Math.random() * 5) + 1,
        p = Particle.extend({
            x: x_,
            y: y_,
            vx: Math.cos(h) * s,
            vy: Math.sin(h) * s,
            life: utils.randomRange(10, 20),
            radius: Math.random()*3,
            col: 'rgb(' + Math.floor((Math.random() * 255)) + ',0,' + Math.floor(utils.randomRange(100, 255)) + ')'
        });
    //p.radius = Math.random() * 3;
    //p.col = 'rgb(' + Math.floor((Math.random() * 255)) + ',0,' + Math.floor(utils.randomRange(100, 255)) + ')';
    return p;
}

var Smoke = Particle.extend({
    limit: 50,
    particles: [],
    thrusting: false,
    context: null,
    init: function() {
        for (var i = 0; i < this.limit; i++) {
            this.particles.push(newP(this.x, this.y));
        }
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
                this.particles.push(newP(this.x, this.y, heading));
            }
        }
    },
    draw: function(type) {
        switch(type){
            case 'lines':
                for (var i = 0; i < this.particles.length; i++) {
                    var p = this.particles[i];
                    this.context.save();
                    this.context.translate(p.x,p.y);
                    this.context.rotate(p.getHeading());
                    this.context.beginPath();
                    this.context.moveTo(5,0);
                    this.context.lineTo(utils.randomRange(2,20),0);
                    this.context.strokeStyle = p.col;
                    this.context.stroke();
                    this.context.restore();
                }
                break;
            default:
                for (var i = 0; i < this.particles.length; i++) {
                    var p = this.particles[i];
                    this.context.save();
                    this.context.translate(p.x,p.y);
                    this.context.rotate(p.getHeading());
                    this.context.beginPath();
                    this.context.arc(10, 0, p.radius, 0, Math.PI * 2, false);
                    this.context.fillStyle = p.col;
                    this.context.fill();
                    this.context.restore();
                }
                break;
        } 
    }
});