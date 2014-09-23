var particleSystem = {
	x:0,
	y:0,
	particleLimit:20,
	parts:[],

	create:function(x,y){
		var obj=Object.create(this);
		obj.x=x;
		obj.y=y;
		for(var i=0; i<this.particleLimit; i++){
			this.parts.push(particle.create(this.x,this.y,Math.random()*5,Math.random()*Math.PI*2));
		}
		return obj;
	},

	update:function(x,y,context){
		this.x=x;
		this.y=y;
		
		for(var i=0; i<this.particleLimit; i++){
			context.arc(this.parts[i].x,this.parts[i].y,3,0,Math.PI*2,false);
			context.fill();
		}
	}
}