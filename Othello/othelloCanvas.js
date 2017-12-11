var showBoard = function(pInstans){
    //コンテキストを取得する。この場合のコンテキストはスケッチブックと
    //絵筆に相当する。2dは2次元の意味。
    console.log(pInstans.g_canvas);
       var canvas = document.getElementById(pInstans.g_canvas);
    　　var context = canvas.getContext('2d');
    　　for(var y=0; y<pInstans.BOARD_TYPE.WIDTH; y++){
    　　　for(var x=0; x<pInstans.BOARD_TYPE.HEIGHT; x++){
    　　　　drawGrid(pInstans.GRID_SIZE,context, x, y);
    　　　}
    　　}
    　　drawStone(pInstans.CIRCLE_RADIUS,context, 'white', 224, 224);
    　　drawStone(pInstans.CIRCLE_RADIUS,context, 'white', 288, 288);
    　　drawStone(pInstans.CIRCLE_RADIUS,context, 'black', 288, 224);
    　　drawStone(pInstans.CIRCLE_RADIUS,context, 'black', 224, 288);
}

    var drawGrid = function (gridSize,context, x, y){
    　　context.clearRect(x * gridSize, y * gridSize, gridSize, gridSize);
    　　context.fillStyle = 'rgba(0, 128, 0, 1.0)';
    　　context.strokeStyle = 'black';
    　　context.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
    　　context.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize);
    　}

    var drawStone = function (radius,context, color, x, y){
        　　context.beginPath();//円を描くためのパスを一度リセットする。
        　　context.arc(x, y, radius, 0, 2 * Math.PI, false);
        　　context.fillStyle = color;
        　　context.fill();
        　　context.lineWidth = 4;
        　　context.strokeStyle = 'black';
        　　context.stroke();
        　}