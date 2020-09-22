(function(){
    
    let ctx, canvas;
    const canvasWidth=640,canvasHeight=480;
    let canvasAdjust;
    
    let activeColor = "yellow";
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
        canvasAdjust = canvas.getBoundingClientRect();

        ctx.fillRect(0,0,canvasWidth,canvasHeight);
        
        sandJS.init(ctx,canvas);
        
        setInterval(update, 1000/15);
        //testSand();
        //setInterval(testSand,1000*36/2);
        document.querySelector("#chooserSandSize").addEventListener("change",updateValues);
        document.querySelector("#chooserSandColor").onchange = function(e){activeColor=e.target.value;};
        canvas.addEventListener('mousemove',function(e){updateMousePosition(e);});
        canvas.addEventListener('mousedown',mouseClick);
    }  
                                
    function updateMousePosition(e){
        mousePos.x = e.clientX - canvasAdjust.left;
        mousePos.y = e.clientY - canvasAdjust.top;
    }
    
    function mouseClick(){
        sandJS.createGrain(mousePos.x,mousePos.y);
    }
    
    function updateValues(){
        activeWidth=document.querySelector("#chooserSandSize").value;
    }
    
    
    function update(){
        cls();
        
        sandJS.updateSand();
        sandJS.renderSand();
        
    }
    
    function cls(){
        cnmLib.drawRect(ctx,0,0,canvas.width,canvas.height);
    }
})();