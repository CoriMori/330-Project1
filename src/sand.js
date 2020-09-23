let numRows, numColumns; 
let grid;
/*
0 == void
1 == wall
hex == sand
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
    
    createGrain(pX,pY,color=0,radius=5){
        //convert screen position to grid position
        pX = Math.round(pX / this.cellSize);
        pY = Math.round(pY / this.cellSize);
        
        pX += (Math.random() * radius) - radius/2;
        pY += (Math.random() * radius) - radius/2;
        
        pX = Math.round(pX);
        pY = Math.round(pY);
        
        if(pX < 0) pX = 0;
        else if(pX > numColumns-1) pX=numColumns-1;
        
        if(pY < 0) pY = 0;
        else if(pY > numRows-1) pY=numRows-1;
        
        
        grid[pX][pY] = color;
    },
    
    createWall(pX,pY){
        pX = Math.round(pX / this.cellSize);
        pY = Math.round(pY / this.cellSize);
        
        grid[pX][pY] = 1;
    },
    
    updateSand(){
        for(let c = numColumns-1; c >= 0; c--){
            for(let r = numRows-2; r >= 0; r--){
                
                if(grid[c][r]==0 || grid[c][r]==1) continue;

                let currColor = grid[c][r];
                
                if(grid[c][r+1] == 1) continue;

                //handles falling down
                if(grid[c][r+1] == 0){
                    grid[c][r] = 0;
                    grid[c][r+1] = currColor;
                }

                //handles sliding left
                else if(c != 0 && grid[c-1][r+1] == 0 && grid[c-1][r] != 1){
                    grid[c][r] = 0;
                    grid[c-1][r+1] = currColor;
                }

                //handles sliding right
                else if(c != numColumns - 1 && grid[c+1][r+1] == 0 && grid[c+1][r] != 1){
                    grid[c][r] = 0;
                    grid[c+1][r+1] = currColor;
                }

                
            }
        }
    },
    
    renderSand(ctx){
        for(let c = 0; c < numColumns; c++){
            for(let r = 0; r < numRows; r++){
                if(grid[c][r]==0) continue;
                else if(grid[c][r]==1){
                    ctx.fillStyle = '#808080';
                    ctx.fillRect(c*this.cellSize,r*this.cellSize,this.cellSize,this.cellSize);
                }
                
                ctx.fillStyle = grid[c][r];
                ctx.fillRect(c*this.cellSize,r*this.cellSize,this.cellSize,this.cellSize);
            }
        }
    },
    
    clearSand(){
        for(let c = 0; c < numColumns; c++)
            for(let r = 0; r < numRows; r++)
                grid[c][r] = 0;
    }
}
if(window) window["sandJS"] = sandJS;
else throw "window not defined";
})();