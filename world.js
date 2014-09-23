var World = {
	w: 0,
	h: 0,
	circles: [],
	create: function(width, height){
		var obj=Object.create(this);
		this.w = width;
		this.h = height;
		for(var i=0; i<100; i++){
			var c = {
				x: Math.random()*width,
				y: Math.random()*height,
				r: utils.randomRange(20,400),
				col: Math.floor(utils.randomRange(10,255)),
				shape: Math.random()*(Math.PI*2)
			}
			this.circles.push(c);
		}
		return obj;
	},
	draw: function(c){
		for(var i=0; i<100; i++){
			var circ=this.circles[i];
			c.beginPath();
			c.arc(circ.x,circ.y,circ.r,0,circ.shape,false);
			c.fillStyle = circ.col;
			c.fill();
		}
	}
}