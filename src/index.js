(function(){
    
let ctx, canvas;
const canvasWidth=640,canvasHeight=480;
    
    
window.onload = init;
    
function init(){
    console.log("init");
    canvas=document.querySelector("canvas");
    ctx=canvas.getContext('2d');
    canvas.width=canvasWidth;
    canvas.height=canvasHeight;
    
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
}  
})();