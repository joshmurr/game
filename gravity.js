window.onload = function(){
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		sun = particle.create(width/2,height/2,0,0),
		planet = particle.create(width/2+400,height/2,10,-Math.PI/2),
		planet2 = particle.create(width/2+200,height/2,10,-Math.PI/2),
		planet3 = particle.create(width/2+300,height/2,10,-Math.PI/2);

	sun.mass = 40000;

	update();

	function update() {
		context.clearRect(0,0,width,height);

		planet.gravitateTo(sun);
		planet.update();

		planet2.gravitateTo(sun);
		planet2.update();

		planet3.gravitateTo(sun);
		planet3.update();

		context.beginPath();
		context.fillStyle = "yellow";
		context.arc(sun.x, sun.y, 20,0,Math.PI*2,false);
		context.fill();		

		context.beginPath();
		context.fillStyle = "blue";
		context.arc(planet.x, planet.y, 5,0,Math.PI*2,false);
		context.fill();

		context.beginPath();
		context.fillStyle = "red";
		context.arc(planet2.x, planet2.y, 5,0,Math.PI*2,false);
		context.fill();

		context.beginPath();
		context.fillStyle = "green";
		context.arc(planet3.x, planet3.y, 5,0,Math.PI*2,false);
		context.fill();

		requestAnimationFrame(update);
	}
};