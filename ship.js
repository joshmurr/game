var Ship = Particle.extend({
    pointing: -Math.PI / 2,
    turnSpeed: .1,
    speed: 0,
    rotateLeft: function() {
        this.pointing -= this.turnSpeed;
    },

    rotateRight: function() {
        this.pointing += this.turnSpeed;
    }
})
