var OthelloDiv = function(pCell, pBlack, pWhite){
    // 0:石無し, 1:黒, 2:白
    this.stone = [
        document.getElementById(pCell),
        document.getElementById(pBlack),
        document.getElementById(pWhite)
    ];
}

OthelloDiv.prototype = new Othello();

OthelloDiv.prototype.showBoard = function (pInstans,pBoard) {
    
            var b = document.getElementById(pBoard);
    
            while (b.firstChild) {
                b.removeChild(b.firstChild);
            }
    
            for (var y = 1; y <= this.BOARD_TYPE.HEIGHT; y++) {
                for (var x = 1; x <= this.BOARD_TYPE.WIDTH; x++) {
                    var cell = this.stone[this.board[x][y]].cloneNode(true);
    
                    cell.style.left = ((x - 1) * 31) + "px";
                    cell.style.top = ((y - 1) * 31) + "px";
                    b.appendChild(cell);
    
                    if (this.board[x][y] == this.PIECE_TYPE.NONE) {
                        (function () {
                            var _x = x;
                            var _y = y;
                            cell.onclick = function () {
                                if (pInstans.checkTurnOver(_x, _y, true) > 0) {
                                    pInstans.board[_x][_y] = pInstans.turn;
                                    pInstans.showBoard(pInstans,"board");
                                    pInstans.turn = pInstans.PIECE_TYPE.SWITHING - pInstans.turn;
                                }
    
                            };
                        })();
                    }
                }
            }
    
        }