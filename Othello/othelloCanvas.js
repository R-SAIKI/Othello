var OthelloCanvas = function () {
    this.GRID_SIZE = 64; //１つのグリッドのピクセルサイズ
    this.CIRCLE_RADIUS = 28;
}

OthelloCanvas.prototype.showBoard = function (pOthelloDivUI, pOthelloCanvasUI, pOthelloBL, pCanvas) {
    //コンテキストを取得する。この場合のコンテキストはスケッチブックと
    //絵筆に相当する。2dは2次元の意味。
    var canvas = document.getElementById(pCanvas);　　
    var context = canvas.getContext('2d');

    //駒の中心の位置
    var circleX;
    var circleY;

    canvas.onclick = function (e) {
        var rect = e.target.getBoundingClientRect();
        mouseX = e.clientX - Math.floor(rect.left);
        mouseY = e.clientY - Math.floor(rect.top);
        var _x = pOthelloCanvasUI.getPointX(mouseX);
        var _y = pOthelloCanvasUI.getPointY(mouseY);
        if (pOthelloBL.board[_x][_y] == pOthelloBL.PIECE_TYPE.NONE) {
            if (pOthelloBL.checkTurnOver(_x, _y, true) > 0) {
                pOthelloBL.board[_x][_y] = pOthelloBL.turn;
                pOthelloDivUI.showBoard(pOthelloDivUI, pOthelloCanvasUI, pOthelloBL, "board");
                pOthelloCanvasUI.showBoard(pOthelloDivUI, pOthelloCanvasUI, pOthelloBL, pCanvas);
                pOthelloBL.turn = pOthelloBL.PIECE_TYPE.SWITHING - pOthelloBL.turn;
            }
        } else {
            return;
        }
        delete canvas;
    }
　
    for (var y = 1; y <= pOthelloBL.BOARD_TYPE.WIDTH; y++) {　　　
        for (var x = 1; x <= pOthelloBL.BOARD_TYPE.HEIGHT; x++) {　　　　
            this.drawGrid(this.GRID_SIZE, context, x, y);
            console.log(x + "," + y + "," + pOthelloBL.board[x][y]);
            if (pOthelloBL.board[x][y] != pOthelloBL.PIECE_TYPE.NONE) {
                circleX = this.GRID_SIZE / 2 + (this.GRID_SIZE * x);
                circleY = this.GRID_SIZE / 2 + (this.GRID_SIZE * y);
                console.log(circleX + "," + circleY);
            }
            if (pOthelloBL.board[x][y] == pOthelloBL.PIECE_TYPE.BLACK) {
                this.drawStone(this.CIRCLE_RADIUS, context, 'black', circleX, circleY);
            } else if (pOthelloBL.board[x][y] == pOthelloBL.PIECE_TYPE.WHITE) {
                this.drawStone(this.CIRCLE_RADIUS, context, 'white', circleX, circleY);
            }
        }　　
    }　　
}

OthelloCanvas.prototype.drawGrid = function (gridSize, context, x, y) {　　
    context.clearRect(x * gridSize, y * gridSize, gridSize, gridSize);　　
    context.fillStyle = 'rgba(0, 128, 0, 1.0)';　　
    context.strokeStyle = 'black';　　
    context.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);　　
    context.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize);　
}

OthelloCanvas.prototype.drawStone = function (radius, context, color, x, y) {　　
    context.beginPath(); //円を描くためのパスを一度リセットする。
    　　
    context.arc(x, y, radius, 0, 2 * Math.PI, false);　　
    context.fillStyle = color;　　
    context.fill();　　
    context.lineWidth = 4;　　
    context.strokeStyle = 'black';　　
    context.stroke();　
}

OthelloCanvas.prototype.getPointX = function (pX) {
    return Math.floor(pX / 64);
}

OthelloCanvas.prototype.getPointY = function (pY) {
    return Math.floor(pY / 64);
}
