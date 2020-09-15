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
        
        sandJS.init(ctx,canvas);
        
        setInterval(update, 1000/15);
        setInterval(function(){sandJS.createGrain(canvas.width/2,canvas.height/2);},300);
//        sandJS.createGrain(canvas.width/2,canvas.height-10);
//        sandJS.createGrain(canvas.width/2,canvas.height-15);
//        sandJS.createGrain(canvas.width/2,canvas.height-20);
//        sandJS.createGrain(canvas.width/2,canvas.height-25);
    }  
    
    
    function update(){
        cls();
        
        sandJS.drawSand();
        sandJS.updateSand();
        
        
    }
    
    function cls(){
        cnmLib.drawRect(ctx,0,0,canvas.width,canvas.height);
    }
})();