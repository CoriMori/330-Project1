
(function(){
console.log("loaded");

let cnmLib={
    getRandomColor(){
        const getByte=_=>55 + Math.round(Math.random() * 200);
        return `rgba(${getByte()}, ${getByte()}, ${getByte()}, .8)`;
    },

    getRandomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    drawRect(ctx,x,y,w,h,fillStyle="black",lineWidth=0,strokeStyle="black")
    {
        ctx.save();
        ctx.fillStyle=fillStyle;
        ctx.beginPath();
        ctx.rect(x,y,w,h);
        ctx.closePath();
        ctx.fill();
            
        if(lineWidth>0){
            ctx.lineWidth=lineWidth;
            ctx.strokeStyle=strokeStyle;
            ctx.stroke();}
            
        ctx.restore();
    }
};
    
if(window){
    window["cnmLib"]=cnmLib;
}
else{
    throw "'window' not defined";
}
    
})();