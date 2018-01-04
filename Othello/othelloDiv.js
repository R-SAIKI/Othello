var OthelloDiv = function(pCell, pBlack, pWhite, pBoard){
    // 0:石無し, 1:黒, 2:白
    this.stone = [
        document.getElementById(pCell),
        document.getElementById(pBlack),
        document.getElementById(pWhite)
    ];

    this.board = pBoard;
}

OthelloDiv.prototype.showBoard = function (pOthelloDivUI, pOthelloBL) {
    
            var b = document.getElementById(pOthelloDivUI.board);
    
            while (b.firstChild) {
                b.removeChild(b.firstChild);
            }
    
            for (var y = 1; y <= pOthelloBL.BOARD_TYPE.HEIGHT; y++) {
                for (var x = 1; x <= pOthelloBL.BOARD_TYPE.WIDTH; x++) {
                    var cell = this.stone[pOthelloBL.board[x][y]].cloneNode(true);
    
                    cell.style.left = ((x - 1) * 31) + "px";
                    cell.style.top = ((y - 1) * 31) + "px";
                    b.appendChild(cell);
    
                    if (pOthelloBL.board[x][y] == pOthelloBL.PIECE_TYPE.NONE) {
                        (function () {
                            var _x = x;
                            var _y = y;
                            cell.onclick = function () {
                                if (pOthelloBL.checkTurnOver(_x, _y, true) > 0) {
                                    pOthelloBL.board[_x][_y] = pOthelloBL.turn;
                                    pOthelloBL.IShowBoard(pOthelloDivUI, pOthelloBL);
                                    pOthelloBL.turn = pOthelloBL.PIECE_TYPE.SWITHING - pOthelloBL.turn;
                                    pOthelloBL.turnSkip(); // 置ける場所が無かったらパス
                                }
    
                            };
                        })();
                    }
                }
            }
    
        }