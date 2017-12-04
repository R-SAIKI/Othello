//キャンバスクラス
function othelloCanvasClass(selector){

    var ROW_NUM = 8;//行の数
    var COL_NUM = 8;//列の数
    var GRID_SIZE = 64;//１つのグリッドのピクセルサイズ
    var CIRCLE_RADIUS = 28;

    this.g_canvas = document.querySelector(selector);
    
    　this.drawCanvas = function (){
    　　//コンテキストを取得する。この場合のコンテキストはスケッチブックと
    　　//絵筆に相当する。2dは2次元の意味。
    　　var context = g_canvas.getContext('2d');
    　　for(var y=0; y<ROW_NUM; y++){
    　　　for(var x=0; x<COL_NUM; x++){
    　　　　drawGrid(context, x, y);
    　　　}
    　　}
    　　drawStone(context, 'white', 224, 224);
    　　drawStone(context, 'white', 288, 288);
    　　drawStone(context, 'black', 288, 224);
    　　drawStone(context, 'black', 224, 288);
    　}
    
    this.drawGrid = function (context, x, y){
    　　context.clearRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    　　context.fillStyle = 'rgba(0, 128, 0, 1.0)';
    　　context.strokeStyle = 'black';
    　　context.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    　　context.strokeRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    　}
    
    this.drawStone = function (context, color, x, y){
    　　context.beginPath();//円を描くためのパスを一度リセットする。
    　　context.arc(x, y, CIRCLE_RADIUS, 0, 2 * Math.PI, false);
    　　context.fillStyle = color;
    　　context.fill();
    　　context.lineWidth = 4;
    　　context.strokeStyle = 'black';
    　　context.stroke();
    　}
}
