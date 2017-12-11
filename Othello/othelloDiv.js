var showBoard = function (pInstans,pBoard) {
    
            var b = document.getElementById(pBoard);
    
            while (b.firstChild) {
                b.removeChild(b.firstChild);
            }
    
            for (var y = 1; y <= pInstans.BOARD_TYPE.HEIGHT; y++) {
                for (var x = 1; x <= pInstans.BOARD_TYPE.WIDTH; x++) {
                    var cell = pInstans.stone[pInstans.board[x][y]].cloneNode(true);
    
                    cell.style.left = ((x - 1) * 31) + "px";
                    cell.style.top = ((y - 1) * 31) + "px";
                    b.appendChild(cell);
    
                    if (pInstans.board[x][y] == pInstans.PIECE_TYPE.NONE) {
                        (function () {
                            var _x = x;
                            var _y = y;
                            cell.onclick = function () {
                                if (pInstans.checkTurnOver(_x, _y, true) > 0) {
                                    pInstans.board[_x][_y] = pInstans.turn;
                                    showBoard(pInstans,"board");
                                    pInstans.turn = pInstans.PIECE_TYPE.SWITHING - pInstans.turn;
                                }
    
                            };
                        })();
                    }
                }
            }
    
        };