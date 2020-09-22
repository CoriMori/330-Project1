let numRows, numColumns; 
let grid;
/*
0 == void
1 == yellow
2 == red
3 == green
4 == blue
*/
(function(){

let sandJS = {
    cellSize: 5,
    ctx: [], //lil yucky but whatevs
    canvas: [],
    
    init(pCTX,pCanvas){
        ctx = pCTX;
        canvas = pCanvas;
        
        numRows = canvas.height / this.cellSize;
        numColumns = canvas.width / this.cellSize;
        grid = new Array(numColumns);
        for(let c = 0; c < numColumns; c++){
            grid[c] = new Array(numRows).fill(0);
        }
    },
    
    createGrain(pX,pY,color=1,radius=5){
        //convert screen position to grid position
        pX = Math.round(pX / this.cellSize);
        pY = Math.round(pY / this.cellSize);
        
        pX += (Math.random() * radius) - radius/2;
        pY += (Math.random() * radius) - radius/2;
        
        pX = Math.round(pX);
        pY = Math.round(pY);
        
        
        grid[pX][pY] = color;
    },
    
    updateSand(){
        for(let c = numColumns-1; c >= 0; c--){
            for(let r = numRows-2; r >= 0; r--){
                
                //detects sand
                if(grid[c][r] != 0){
                    
                    let currColor = grid[c][r];
                    
                    //handles falling down
                    if(grid[c][r+1] == 0){
                        grid[c][r] = 0;
                        grid[c][r+1] = currColor;
                    }
                    
                    //handles sliding left
                    else if(c != 0 && grid[c-1][r+1] == 0){
                        grid[c][r] = 0;
                        grid[c-1][r+1] = currColor;
                    }
                    
                    //handles sliding right
                    else if(c != numColumns - 1 && grid[c+1][r+1] == 0){
                        grid[c][r] = 0;
                        grid[c+1][r+1] = currColor;
                    }
                }
                
            }
        }
    },
    
    renderSand(){
        for(let c = 0; c < numColumns; c++){
            for(let r = 0; r < numRows; r++){
                if(grid[c][r]==0) continue;
                
                //TODO: ideally the color system should be made more robust
                if(grid[c][r] == 1) ctx.fillStyle = "yellow";
                else if(grid[c][r]==2){ console.log("red");ctx.fillStyle = "red";}
                else if(grid[c][r]==3) ctx.fillStyle = "green";
                else if(grid[c][r]==4) ctx.fillStyle = "blue";

                ctx.fillRect(c*this.cellSize,r*this.cellSize,this.cellSize,this.cellSize);
            }
        }
    },
    
    clearSand(){
        grid.fill(0);
    }
}
if(window) window["sandJS"] = sandJS;
else throw "window not defined";
})();