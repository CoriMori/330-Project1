let numRows, numColumns; 
let grid;
/*
0 == void
1 == sand
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
        console.log(numColumns,numRows);
        grid = new Array(numColumns);
        for(let c = 0; c < numColumns; c++){
            grid[c] = new Array(numRows).fill(0);
        }
    },
    
    createGrain(pX,pY){
        //convert screen position to grid position
        pX = Math.round(pX / this.cellSize);
        pY = Math.round(pY / this.cellSize);
        
        grid[pX][pY] = 1;
    },
    
    updateSand(){
        for(let c = numColumns-1; c >= 0; c--){
            for(let r = numRows-1; r >= 0; r--){
                if(grid[c][r] == 1 && grid[c][r+1] == 0){
                    grid[c][r] = 0;
                    grid[c][r+1] = 1;
                }
            }
        }
    },
    
    renderSand(){
        for(let c = 0; c < numColumns; c++){
            for(let r = 0; r < numRows; r++){
                if(grid[c][r] == 1){
                    console.log("draw");
                    ctx.fillStyle = "yellow";
                    ctx.fillRect(c*this.cellSize,r*this.cellSize,this.cellSize,this.cellSize);
                }
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