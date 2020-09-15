(function(){

let sandJS = {
    
    sand: [],
    ctx: [], //lil yucky but whatevs
    canvas: [],
    
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
                let imgData = ctx.getImageData(this.x-1,this.y+1,3,1);
                
                //check below
                if(imgData.data[4]==0 && imgData.data[5]==0 && imgData.data[6] == 0){
                    if(this.y < canvas.height - 1) this.y++;
                }
                
                //check left
                else if(imgData.data[0]==0 && imgData.data[1]==0 && imgData.data[2]==0) {
                    this.x--;
                    if(this.y < canvas.height - 1) this.y++;
                }
                
                //check right
                else if(imgData.data[8]==0 && imgData.data[9]==0 && imgData.data[10]==0){
                    this.x++;
                    if(this.y < canvas.height - 1) this.y++;
                    console.log("roight");
                }
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
            ctx.fillRect(sand[i].x,sand[i].y,1,1);      //pretty sure this can be better by drawing directly to imageData
            ctx.restore();
        }
    }
}
if(window) window["sandJS"] = sandJS;
else throw "window not defined";
})();