var Othello = function(pStone, pSelector) {
    // 変数定義
    this.this.BOARD_TYPE = {
        'WIDTH': 8,
        'HEIGHT': 8,
    };

    this.PIECE_TYPE = {
        'NONE': 0,
        'BLACK': 1,
        'WHITE': 2,
        'SWITHING': 3,
    };

    this.stone = pStone;
    this.board = [];

    this.turn = PIECE_TYPE.BLACK;

    this.GRID_SIZE = 64;//１つのグリッドのピクセルサイズ
    this.CIRCLE_RADIUS = 28;

    this.g_canvas = document.querySelector(pSelector);
  }

  Othello.prototype.loadInit = function(){
      // 盤面を初期化
      for (var i = 0; i < 10; i++) {
        this.board[i] = [];
        for (var j = 0; j < 10; j++) {
            this.board[i][j] = PIECE_TYPE.NONE;
        }
    }

    // 黒白の初期配置
    this.board[4][5] = PIECE_TYPE.BLACK;
    this.board[5][4] = PIECE_TYPE.BLACK;
    this.board[4][4] = PIECE_TYPE.WHITE;
    this.board[5][5] = PIECE_TYPE.WHITE;
  }

  Othello.prototype.checkTurnOver = function (x, y, flip) {
    
            var ret = 0;
    
            for (var dx = -1; dx <= 1; dx++) {
                for (var dy = -1; dy <= 1; dy++) {
                    if (dx == 0 && dy == 0) {
                        continue;
                    }
    
                    var nx = x + dx;
                    var ny = y + dy;
                    var n = 0;
                    while (this.board[nx][ny] == PIECE_TYPE.MAX - turn) {
                        n++;
                        nx += dx;
                        ny += dy;
                    }
    
                    if (n > 0 && this.board[nx][ny] == turn) {
                        ret += n;
    
                        if (flip) {
                            nx = x + dx;
                            ny = y + dy;
    
                            while (this.board[nx][ny] == PIECE_TYPE.MAX - turn) {
                                this.board[nx][ny] = turn;
                                nx += dx;
                                ny += dy;
                            }
    
    
                        }
                    }
                }
            }
    
            return ret;
        }
    
    Othello.prototype.showBoard = function (pBoard) {
        
                var b = document.getElementById(pBoard);
        
                while (b.firstChild) {
                    b.removeChild(b.firstChild);
                }
        
                for (var y = 1; y <= this.BOARD_TYPE.HEIGHT; y++) {
                    for (var x = 1; x <= this.BOARD_TYPE.WIDTH; x++) {
                        var cell = stone[this.board[x][y]].cloneNode(true);
        
                        cell.style.left = ((x - 1) * 31) + "px";
                        cell.style.top = ((y - 1) * 31) + "px";
                        b.appendChild(cell);
        
                        if (this.board[x][y] == PIECE_TYPE.NONE) {
                            (function () {
                                var _x = x;
                                var _y = y;
                                cell.onclick = function () {
                                    if (checkTurnOver(_x, _y, true) > 0) {
                                        this.board[_x][_y] = turn;
                                        showBoard();
                                        turn = PIECE_TYPE.MAX - turn;
                                    }
        
                                };
                            })();
                        }
                    }
                }
        
            };
    
    Othello.prototype.drawCanvas = function (){
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

    Othello.prototype.drawGrid = function (context, x, y){
        　　context.clearRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        　　context.fillStyle = 'rgba(0, 128, 0, 1.0)';
        　　context.strokeStyle = 'black';
        　　context.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        　　context.strokeRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        　}

    Othello.prototype.drawStone = function (context, color, x, y){
            　　context.beginPath();//円を描くためのパスを一度リセットする。
            　　context.arc(x, y, CIRCLE_RADIUS, 0, 2 * Math.PI, false);
            　　context.fillStyle = color;
            　　context.fill();
            　　context.lineWidth = 4;
            　　context.strokeStyle = 'black';
            　　context.stroke();
            　}