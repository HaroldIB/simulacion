var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var particula;
var t0;
var dt;
var t;
var animId;
var animTime = 5;

/* Espacio para dibujar la grilla */
var xMin=0;
var xMax=canvas.width;
var yMin=0;
var yMax=canvas.height;
var xStep=10;
var yStep=10;
		
function drawGrill(){
    context.beginPath() ;		
    var imax = Math.floor((xMax-xMin)/xStep);
    for (var i=0; i<=imax; i++){
        context.moveTo(xMin+xStep*i,yMin);
        context.lineTo(xMin+xStep*i,yMax);
    }
    var jmax = Math.floor((yMax-yMin)/yStep);
    for (var j=0; j<=jmax; j++){
        context.moveTo(xMin,yMin+yStep*j);
        context.lineTo(xMax,yMin+yStep*j);
    }
    context.stroke();
}

/* Simulación */

window.onload = init;
function init(){
    particula = new Particula(20,"blue");
    particula.x = 50;
    particula.y = 250;
    //Velocidad en pixeles por segundo
    particula.vx = 10;
    particula.draw(context);
    t0 = new Date().getTime();
    t = 0;
    animFrame();
    
};

function animFrame(){
    animId = requestAnimationFrame(animFrame,canvas);
    onTimer();
    drawGrill();
    drawScreen();
};

function onTimer(){
    var t1 = new Date().getTime(); 
	dt = 0.001*(t1-t0); 
	t0 = t1;	
	t += dt;
	console.log(dt,t,t0,animTime);
	if (t < animTime){
		move();
	}else{
		stop();
	}
}

function move(){
        particula.x = particula.x + particula.vx*dt;
        context.clearRect(0, 0, canvas.width, canvas.height);
        particula.draw(context);   
};

function stop(){
    cancelAnimationFrame(animId);
};

function drawScreen() {
    //background
    context.fillStyle = "#ffffaa";
    context.fillRect(0, 0, 700, 60);    
    //text
    context.fillStyle    = "#000000";
    context.font         = "20px _sans";
    context.textBaseline = "top";
    context.fillText  ("Movimiento Rectilíneo Uniforme", 200, 20 );
    //box
    context.strokeStyle = "#000000"; 
    context.strokeRect(5,  5, 690, 50);
}

