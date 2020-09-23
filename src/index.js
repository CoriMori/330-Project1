(function(){
    
    let ctx1, canvas1;  //Background canvas
    let ctx2, canvas2;  //Drawing canvas
    let ctx3, canvas3;  //Outline canvas
    const canvasWidth=640,canvasHeight=480;
    let canvasAdjust;
    let currentWidth;
    let currentColor='#FFFF00';
    let currentBrush = "sand";
    let currentRadius;
    let currentBGColor="black";
    let currentSpeed=60;
    //let animID;
    
    let mousePos = {
        x: 0,
        y:0
    };
    let mouseClicked = false;

    window.onload = init;

    function init(){
        console.log("init");
        canvas1=document.querySelector("#BGCanvas");
        ctx1=canvas1.getContext('2d');
        canvas1.width=canvasWidth;
        canvas1.height=canvasHeight;
        
        canvas2=document.querySelector("#DrawingCanvas");
        ctx2=canvas2.getContext('2d');
        canvas2.width=canvasWidth;
        canvas2.height=canvasHeight;
        canvasAdjust = canvas2.getBoundingClientRect();
        
        canvas3=document.querySelector("#OutlineCanvas");
        ctx3=canvas3.getContext('2d');
        canvas3.width=canvasWidth;
        canvas3.height=canvasHeight;
        
        ctx1.fillRect(0,0,canvasWidth,canvasHeight);
        
        sandJS.init(ctx2,canvas2);    
        
        canvas2.addEventListener('mousemove',function(e){updateMousePosition(e);});
        canvas2.addEventListener('mousedown',function(e){mouseClicked=true;});
        canvas2.addEventListener('mouseup',function(e){mouseClicked=false;});
        
        SetUpUI();
        update(currentSpeed);
    }  
                                
    function updateMousePosition(e){
        mousePos.x = e.clientX - canvasAdjust.left;
        mousePos.y = e.clientY - canvasAdjust.top;
    }
    
    function SetUpUI(){
        
        document.querySelector("#chooserSandSize").addEventListener("change",function(){
             currentWidth=document.querySelector("#chooserSandSize").value;
        });
        document.querySelector("#chooserSandColor").addEventListener("change",function(){
            currentColor=document.querySelector("#chooserSandColor").value;
        });
        document.querySelector("#chooserBrush").addEventListener("change",function(){
            currentBrush=document.querySelector("#chooserBrush").value;
        });
        document.querySelector("#chooserSandSize").addEventListener("change",function(){
            currentRadius=document.querySelector("#chooserSandSize").value;
        });
        /*document.querySelector("#chooserStreamSpeed").addEventListener("change",function(){
                cancelAnimationFrame(animID);
                currentSpeed=document.querySelector("#chooserStreamSpeed").value;
                console.log(currentSpeed);
                update(currentSpeed);
        });*/
        document.querySelector("#btnFill").addEventListener("click",function(){
            currentBGColor=document.querySelector("#chooserFillStyle").value;
            ctx1.fillStyle=currentBGColor;
            ctx1.fillRect(0,0,canvasWidth,canvasHeight);
        });
        
        document.querySelector("#btnClear").addEventListener("click",function(){
            console.log("clear");
            ctx.save();
            //sandJS.clearSand();
            ctx2.clearRect(0,0,canvasWidth,canvasHeight);
            currentBGColor="black";
            cls();
            ctx3.clearRect(0,0,canvasWidth,canvasHeight);
            ctx.restore();
        });
        
    }
    
    
    function update(){
        requestAnimationFrame(update,1000/currentSpeed);
        cls();
        
        if(mouseClicked){ 
            if(currentBrush == "sand") sandJS.createGrain(mousePos.x,mousePos.y,currentColor,currentRadius);
            else sandJS.createWall(mousePos.x,mousePos.y);
        }
        
        sandJS.updateSand();
        sandJS.renderSand(ctx2);
        
    }
    
    function cls(){
        cnmLib.drawRect(ctx2,0,0,canvasWidth,canvasHeight,currentBGColor);

    }
})();