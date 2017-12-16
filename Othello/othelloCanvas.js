var OthelloCanvas = function(){
    this.GRID_SIZE = 64;//１つのグリッドのピクセルサイズ
    this.CIRCLE_RADIUS = 28;
}

OthelloCanvas.prototype = new Othello();

OthelloCanvas.prototype.showBoard = function(pInstans,pCanvas){
    //コンテキストを取得する。この場合のコンテキストはスケッチブックと
    //絵筆に相当する。2dは2次元の意味。
       var canvas = document.getElementById(pCanvas);
    　　var context = canvas.getContext('2d');
    　　for(var y=0; y<pInstans.BOARD_TYPE.WIDTH; y++){
    　　　for(var x=0; x<pInstans.BOARD_TYPE.HEIGHT; x++){
    　　　　this.drawGrid(pInstans.GRID_SIZE,context, x, y);
    　　　}
    　　}
    　　this.drawStone(pInstans.CIRCLE_RADIUS,context, 'white', 224, 224);
    　　this.drawStone(pInstans.CIRCLE_RADIUS,context, 'white', 288, 288);
    　　this.drawStone(pInstans.CIRCLE_RADIUS,context, 'black', 288, 224);
    　　this.drawStone(pInstans.CIRCLE_RADIUS,context, 'black', 224, 288);
}

OthelloCanvas.prototype.drawGrid = function (gridSize,context, x, y){
    　　context.clearRect(x * gridSize, y * gridSize, gridSize, gridSize);
    　　context.fillStyle = 'rgba(0, 128, 0, 1.0)';
    　　context.strokeStyle = 'black';
    　　context.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
    　　context.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize);
    　}

    OthelloCanvas.prototype.drawStone = function (radius,context, color, x, y){
        　　context.beginPath();//円を描くためのパスを一度リセットする。
        　　context.arc(x, y, radius, 0, 2 * Math.PI, false);
        　　context.fillStyle = color;
        　　context.fill();
        　　context.lineWidth = 4;
        　　context.strokeStyle = 'black';
        　　context.stroke();
        　}