var Othello = function() {
    // 変数定義
    this.BOARD_TYPE = {
        'WIDTH': 8,
        'HEIGHT': 8,
    };

    this.PIECE_TYPE = {
        'NONE': 0,
        'BLACK': 1,
        'WHITE': 2,
        'SWITHING': 3,
    };

    this.stone = null;
    this.board = [];

    this.turn = this.PIECE_TYPE.BLACK;

    this.GRID_SIZE = 64;//１つのグリッドのピクセルサイズ
    this.CIRCLE_RADIUS = 28;

    this.g_canvas = null;
  }

  Othello.prototype.loadInit = function(pCell, pBlack, pWhite){
      // 盤面を初期化
      for (var i = 0; i < 10; i++) {
        this.board[i] = [];
        for (var j = 0; j < 10; j++) {
            this.board[i][j] = this.PIECE_TYPE.NONE;
        }
    }

    // 黒白の初期配置
    this.board[4][5] = this.PIECE_TYPE.BLACK;
    this.board[5][4] = this.PIECE_TYPE.BLACK;
    this.board[4][4] = this.PIECE_TYPE.WHITE;
    this.board[5][5] = this.PIECE_TYPE.WHITE;

    // 0:石無し, 1:黒, 2:白
    this.stone = [
        document.getElementById(pCell),
        document.getElementById(pBlack),
        document.getElementById(pWhite)
    ];
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
                    while (this.board[nx][ny] == this.PIECE_TYPE.SWITHING - this.turn) {
                        n++;
                        nx += dx;
                        ny += dy;
                    }
    
                    if (n > 0 && this.board[nx][ny] == this.turn) {
                        ret += n;
    
                        if (flip) {
                            nx = x + dx;
                            ny = y + dy;
    
                            while (this.board[nx][ny] == this.PIECE_TYPE.SWITHING - this.turn) {
                                this.board[nx][ny] = this.turn;
                                nx += dx;
                                ny += dy;
                            }
    
    
                        }
                    }
                }
            }
    
            return ret;
        }
    
    