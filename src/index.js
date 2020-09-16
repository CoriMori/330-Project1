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
        setInterval(function(){sandJS.createGrain(canvas.width/2,canvas.height/2);},200);
        //testSand();
        //setInterval(sandJS.testSand,1000*36/2);
    }  
    
    
    function update(){
        cls();
        
        sandJS.drawSand();  
        sandJS.updateSand();    //sand update depends on the grains "seeing" each other, so update() has to go after draw()
        
        
    }
    
    function cls(){
        cnmLib.drawRect(ctx,0,0,canvas.width,canvas.height);
    }
})();