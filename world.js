var World = {
	x:0,
	y:0,
	layers: [],
	create: function(x,y){
		var obj = Object.create(this);
		this.x = x;
		this.y = y;
		var layer1 = WorldLayer.create(this.x,this.y);
		layer1.zindex = 1; //closest
		layer1.col = 'rgba(255,0,0,0.5)';

		var layer2 = WorldLayer.create(this.x,this.y);
		layer2.zindex = 2; //mid
		layer2.col = 'rgba(0,255,0,0.5)';

		var layer3 = WorldLayer.create(this.x,this.y);
		layer3.zindex = 3; //furthest
		layer3.col = 'rgba(0,0,255,0.5)';

		this.layers.push(layer1,layer2,layer3);
		return obj;
	},
	draw: function(c){
		for(var i=0; i<this.layers.length; i++){
			this.layers[i].draw(c);
		}
	}
};

var WorldLayer = {
	w: 0,
	h: 0,
	x: 0,
	y: 0,
	type: '',
	zindex: 1,
	col: 'rgba(0,0,0,1)',
	circles: [],
	create: function(width, height){
		var obj=Object.create(this);
		this.w = width;
		this.h = height;
		this.x = -width/2;
		this.y = -height/2;
		for(var i=0; i<100; i++){
			var c = {
				x: Math.random()*width,
				y: Math.random()*height,
				r: 200,
				col: 'rgb(0,'+Math.floor((Math.random()*255)+100)+',0)',
				shape: Math.PI*2
			}
			this.circles.push(c);
		}
		return obj;
	},
	draw: function(c){
		c.save();
		c.scale(this.zindex,this.zindex);
		c.translate(this.x,this.y);
		for(var i=0; i<100; i++){
			var circ=this.circles[i];
			c.beginPath();
			c.arc(circ.x,circ.y,circ.r,0,circ.shape,false);
			c.fillStyle = this.col;
			c.fill();
		}
		c.restore();
	}
};