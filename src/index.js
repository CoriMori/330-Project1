(function(){
    
    let ctx, canvas;
    const canvasWidth=640,canvasHeight=480;
    
    let activeColor = "yellow",activeWidth = 3;
    let mousePos = {
        x: 0,
        y:0
    };

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
        setInterval(function(){sandJS.createGrain(mousePos.x,mousePos.y,activeWidth,activeColor);},200);
        //testSand();
        //setInterval(testSand,1000*36/2);
        document.querySelector("#chooserSandSize").addEventListener("change",updateValues);
        document.querySelector("#chooserSandColor").onchange = function(e){activeColor=e.target.value;};
        canvas.addEventListener('mousemove',function(e){
            mousePos.x = e.clientX;
            mousePos.y = e.clientY;
        })
    }  
    
    function updateValues(){
        activeWidth=document.querySelector("#chooserSandSize").value;
    }
    
    function testSand(){
        sandJS.createGrain(canvas.width/2+1,canvas.height-10);
        sandJS.createGrain(canvas.width/2,canvas.height-15);
        sandJS.createGrain(canvas.width/2-1,canvas.height-20);
        sandJS.createGrain(canvas.width/2,canvas.height-25);
        sandJS.createGrain(canvas.width/2-1,canvas.height-30);
        sandJS.createGrain(canvas.width/2+1,canvas.height-35);
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