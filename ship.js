var Ship = Particle.extend({
    pointing: -Math.PI / 2,
    turnSpeed: .1,
    speed: 0,
    rotateLeft: function() {
        this.pointing -= this.turnSpeed;
    },

    rotateRight: function() {
        this.pointing += this.turnSpeed;
    },
    draw: function() {
        this.context.save();
        this.context.translate(this.x, this.y);
        this.context.rotate(this.pointing);
        this.context.beginPath();
        this.context.arc(0, 0, 1, 0, Math.PI * 2, false); //Centre point
        this.context.moveTo(15, 0);
        this.context.lineTo(-5, -7);
        this.context.lineTo(-5, 7);
        this.context.lineTo(15, 0);
        // if (thrusting) {
        //     context.moveTo(-5, 0);
        //     context.lineTo(-12, 0);
        // }
        this.context.fillStyle = "red";
        //this.context.fill();
        this.context.stroke();
        this.context.restore();
    }
})
