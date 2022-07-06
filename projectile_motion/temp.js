var canvas=document.getElementById("canvas");
var drawing =canvas.getContext("2d");
window.onload=init();
var T=0;
var X0=0;
var Y0=canvas.height;
var X=X0;
var Y=Y0;
var angle=document.getElementById("angle");
var v=document.getElementById("velocity");
var g=0.09;
var G=9.807;
var run=false;
var play=document.getElementById("start");
play.addEventListener("click",toggle);
var oldTimeStamp=0.;
var secondsPassed=0.;
var animationspeed=document.getElementById("animation_speed");
var vx=0;
var vy=0;
var range=0;
var maxH=0;
var time_flight=0;
function toggle()
{
    if(!run)
    {
        play.value="Stop";
    }
    else
    {
        play.value="Start";
        X=X0;
        Y=Y0;
        T=0;
    }
   run=!run;

}



function init()
{
    window.requestAnimationFrame(animationloop);
}

function animationloop(timeStamp)
{
    secondsPassed=(timeStamp-oldTimeStamp)/1000.;
    oldTimeStamp=timeStamp;
    update();
    draw();
    window.requestAnimationFrame(animationloop);  //recursive function
}

function update()
{
    if(run){
    T+=animationspeed.value*secondsPassed;
    X=v.value*Math.cos(-angle.value*Math.PI/180.)*T+X0;
    Y=v.value*Math.sin(-angle.value*Math.PI/180.)*T+Y0+0.5*g*T*T;
    Ydis=Y-550;
    vx=v.value*Math.cos(-angle.value*Math.PI/180.);
    vy=v.value*Math.sin(angle.value*Math.PI/180.);
    time_flight=2*vy/G;
    range=-1*v.value*v.value*Math.sin(2*-angle.value*Math.PI/180.)/G;
    maxH=vy*vy/(2*G);
    }
    
   
}

var img = new Image();
img.src = "proj_bg1.jpeg"



function draw()
{
     drawing.clearRect(0,0,canvas.width,canvas.height);
    // drawing.beginPath();
    // drawing.fillStyle="blue";
    // drawing.rect(0,-canvas.height+400,canvas.width,canvas.height);
    // drawing.fill();
    // drawing.beginPath();
    // drawing.fillStyle="green";
    // drawing.rect(0,canvas.height,canvas.width,-canvas.height+400);
    // drawing.fill();
    drawing.drawImage(img,0,0);
    drawing.beginPath();
    drawing.fillStyle="black";
    drawing.arc(X,Y,10,0,2*Math.PI);
    drawing.fill();
    drawing.fillStyle="black";
    drawing.fillText("Angle:"+angle.value+" degree",150,170);
    drawing.fillText("Velocity:"+v.value+" m/s",150,180);
    drawing.fillText("Height from Ground: 0 m",150,190);
    drawing.fillText("Animation Speed:"+animationspeed.value+" m/s",150,200);
     drawing.fillText("Horizontal Velocity:"+vx+" m/s",150,210);
    drawing.fillText("Vertical Velocity:"+vy+" m/s",150,220);
    drawing.fillText("Time of Flight:"+time_flight+" s",150,230);
    drawing.fillText("Range of Projectile:"+range+" m",150,240);
    drawing.fillText("Maximum Height:"+maxH+" m",150,250);
}
    