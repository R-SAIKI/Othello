var Othello = function () {
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
    
    this.PIECE_CHAR = ['黒','白'];

    this.BOARD_LENGTH = 10;

    this.board = [];

    //先行
    this.turn = this.PIECE_TYPE.BLACK;
}

Othello.prototype.loadInit = function () {
    // 盤面を初期化
    for (var i = 0; i < this.BOARD_LENGTH; i++) {
        this.board[i] = [];
        for (var j = 0; j < this.BOARD_LENGTH; j++) {
            this.board[i][j] = this.PIECE_TYPE.NONE;
        }
    }

    // 黒白の初期配置
    this.board[4][5] = this.PIECE_TYPE.BLACK;
    this.board[5][4] = this.PIECE_TYPE.BLACK;
    this.board[4][4] = this.PIECE_TYPE.WHITE;
    this.board[5][5] = this.PIECE_TYPE.WHITE;

}

//駒を裏返せるかチェック
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


// プレイヤーの置ける場所をカウントする。
Othello.prototype.CountValidPoint = function () {
    var count = 0;
    for (var y = 1; y <= this.BOARD_TYPE.WIDTH; y++) {　　　
        for (var x = 1; x <= this.BOARD_TYPE.HEIGHT; x++) {　　　　
            if (this.checkTurnOver(x, y, false) > 0) count++;
        }　　
    }
    return count;
}


// 駒を置けない場合はスキップする
Othello.prototype.turnSkip = function () {
    if (this.CountValidPoint() == 0) {
        alert(this.PIECE_CHAR[this.turn] + 'はパス!');
        this.turn = this.PIECE_TYPE.SWITHING - this.turn;
    }
}


//描画処理のインターフェース的なやつ。
Othello.prototype.IShowBoard = function (pObj, pOthello) {
    pObj.showBoard(pObj, pOthello);
}
