(function(){

let sandJS = {
    
    sand: [],
    ctx: [], //lil yucky but whatevs
    canvas: [],
    sandWidth: 5,   //will be uniform among all grains, no need to store for each
    
    init(pCTX,pCanvas){
        sand = [];
        ctx = pCTX;
        canvas = pCanvas;
    },

    createGrain(pX,pY){
        let grain = {
            x: pX,
            y: pY,
            color: '#ffe100',
            move(){
                
                //TODO: for speed purposes, pixel checks should disprove the need to fall first
                
                //check below
                let img = ctx.getImageData(this.x,this.y+sandJS.sandWidth,1,1);
                if(img.data[0]==0 && img.data[1]==0 && img.data[2]==0){
                    if(this.y < canvas.height - sandJS.sandWidth) this.y += sandJS.sandWidth;
                    return;
                }
                
                //check bottom left
                img = ctx.getImageData(this.x - sandJS.sandWidth,this.y + sandJS.sandWidth,1,1);
                if(img.data[0]==0 && img.data[1]==0 && img.data[2]==0){
                    this.x -= sandJS.sandWidth;
                    if(this.y < canvas.height - sandJS.sandWidth) this.y += sandJS.sandWidth;
                    return;
                }
                
                
                //check bottom right
                img = ctx.getImageData(this.x + sandJS.sandWidth,this.y + sandJS.sandWidth,1,1);
                if(img.data[0]==0 && img.data[1]==0 && img.data[2]==0){
                    this.x += sandJS.sandWidth;
                    if(this.y < canvas.height - sandJS.sandWidth) this.y += sandJS.sandWidth;
                    return;
                }
                
//                let imgData = ctx.getImageData(this.x-1,this.y+1,3,1);
//
//                
//                //check below
//                if(imgData.data[4]==0 && imgData.data[5]==0 && imgData.data[6] == 0){
//                    if(this.y < canvas.height - 1) this.y++;
//                    return;
//                }
//                
//                //check left
//                if(imgData.data[0]==0 && imgData.data[1]==0 && imgData.data[2]==0) {
//                    this.x--;
//                    if(this.y < canvas.height - 1) this.y++;
//                    return;
//                }
//                
//                //check right
//                if(imgData.data[8]==0 && imgData.data[9]==0 && imgData.data[10]==0){
//                    this.x++;
//                    if(this.y < canvas.height - 1) this.y++;
//                    return;
//                }
            }
        }
        sand.push(grain);
    },
    
    updateSand(){
        for(let i = 0; i < sand.length; i++){
            sand[i].move();
        }
    },
    
    drawSand(){
        let imgData;
        for(let i = 0; i < sand.length; i++){
            //nightmare nightmare nightmare nightmare nightmare
            ctx.save();
            ctx.fillStyle = sand[i].color;
            ctx.fillRect(sand[i].x,sand[i].y,this.sandWidth,this.sandWidth);      //pretty sure this can be better by drawing directly to imageData
            ctx.restore();
        }
    },
    
    //garbo method because I'm lazy, should probably be deleted for final deliverable
    testSand(){
        createGrain(canvas.width/2+1,canvas.height-10);
        createGrain(canvas.width/2,canvas.height-15);
        createGrain(canvas.width/2-1,canvas.height-20);
        createGrain(canvas.width/2,canvas.height-25);
        createGrain(canvas.width/2-1,canvas.height-30);
        createGrain(canvas.width/2+1,canvas.height-35);
    }
}
if(window) window["sandJS"] = sandJS;
else throw "window not defined";
})();