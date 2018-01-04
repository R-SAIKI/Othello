var OthelloCanvas = function (pCanvas) {
    this.GRID_SIZE = 64; //１つのグリッドのピクセルサイズ
    this.CIRCLE_RADIUS = 28;
    this.canvasStage = pCanvas;
}

OthelloCanvas.prototype.showBoard = function (pOthelloCanvasUI, pOthelloBL) {
    //コンテキストを取得する。この場合のコンテキストはスケッチブックと
    //絵筆に相当する。2dは2次元の意味。
    var canvas = document.getElementById(pOthelloCanvasUI.canvasStage);　　
    var context = canvas.getContext('2d');

    //駒の中心の位置
    var circleX;
    var circleY;

    //クリックイベントの設定。
    canvas.onclick = function (e) {
        var rect = e.target.getBoundingClientRect();
        mouseX = e.clientX - Math.floor(rect.left);
        mouseY = e.clientY - Math.floor(rect.top);
        var _x = pOthelloCanvasUI.getPointX(mouseX);
        var _y = pOthelloCanvasUI.getPointY(mouseY);
        if (pOthelloBL.board[_x][_y] == pOthelloBL.PIECE_TYPE.NONE) {
            if (pOthelloBL.checkTurnOver(_x, _y, true) > 0) {
                pOthelloBL.board[_x][_y] = pOthelloBL.turn;
                pOthelloBL.IShowBoard(pOthelloCanvasUI, pOthelloBL);
                pOthelloBL.turn = pOthelloBL.PIECE_TYPE.SWITHING - pOthelloBL.turn;
                pOthelloBL.turnSkip(); // 置ける場所が無かったらパス
                delete canvas;
            }
        } 
        return;   
    }　
    //描画。
    for (var y = 1; y <= pOthelloBL.BOARD_TYPE.WIDTH; y++) {　　　
        for (var x = 1; x <= pOthelloBL.BOARD_TYPE.HEIGHT; x++) {　　　　
            this.drawGrid(this.GRID_SIZE, context, x, y);
            if (pOthelloBL.board[x][y] != pOthelloBL.PIECE_TYPE.NONE) {
                circleX = this.GRID_SIZE / 2 + (this.GRID_SIZE * x);
                circleY = this.GRID_SIZE / 2 + (this.GRID_SIZE * y);
            }
            if (pOthelloBL.board[x][y] == pOthelloBL.PIECE_TYPE.BLACK) {
                this.drawStone(this.CIRCLE_RADIUS, context, 'black', circleX, circleY);
            } else if (pOthelloBL.board[x][y] == pOthelloBL.PIECE_TYPE.WHITE) {
                this.drawStone(this.CIRCLE_RADIUS, context, 'white', circleX, circleY);
            }
        }　　
    }　　
}

//オセロ板の1マス。
OthelloCanvas.prototype.drawGrid = function (gridSize, context, x, y) {　　
    context.clearRect(x * gridSize, y * gridSize, gridSize, gridSize);　　
    context.fillStyle = 'rgba(0, 128, 0, 1.0)';　　
    context.strokeStyle = 'black';　　
    context.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);　　
    context.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize);　
}

//オセロの駒
OthelloCanvas.prototype.drawStone = function (radius, context, color, x, y) {　　
    context.beginPath(); //円を描くためのパスを一度リセットする。
    　　
    context.arc(x, y, radius, 0, 2 * Math.PI, false);　　
    context.fillStyle = color;　　
    context.fill();　　
    context.lineWidth = 4;　　
    context.strokeStyle = 'black';　　
    context.stroke();　
}

//X軸のクリック位置から駒が置かれたX軸の位置を取得。
OthelloCanvas.prototype.getPointX = function (pX) {
    return Math.floor(pX / this.GRID_SIZE);
}

//Y軸のクリック位置から駒が置かれたY軸の位置を取得。
OthelloCanvas.prototype.getPointY = function (pY) {
    return Math.floor(pY / this.GRID_SIZE);
}
