var OthelloAI = function (pOthelloBL) {

    // 個体数
    this.NUMBER_OF_GENE = 5

    // 染色体の数
    this.NUMBER_OF_CHROMOSOME = 8

    // 角
    this.CORNER = [
        [1, 1],
        [1, 8],
        [8, 1],
        [8, 8]
    ];

    // 個体の格納領域。
    this.gene = [];
    
    // 個体の点数の格納領域
    this.geneScore = [];

    this.OtholloBL = pOthelloBL;

    // オブジェクトをコピー
    this.cloneOtholloBL = $.extend(true, {}, pOthelloBL);
}


// Main関数
OthelloAI.prototype.main = function(){
    var boardCell = [];
    
    this.initGene(this.NUMBER_OF_GENE, this.NUMBER_OF_CHROMOSOME);
    this.getPointXY(this.gene, boardCell);
    
    this.evaluateScore(boardCell);


}


// 個体の初期設定
//gene[i][j]:i番目の個体のj番目の染色体（二進数で駒の位置を表現する）
OthelloAI.prototype.initGene = function (pNunberOfGene, pNunberOfChromosome) {
    for (var i = 0; i < pNunberOfGene; i++) {
        gene[i] = new Array(pNunberOfChromosome);
        for (var j = 0; j < pNunberOfChromosome; j++) {
            gene[i][j] = Math.floor(Math.random() * 2);
        };
    };
}


// 現在の個体を元に新しい個体を生む。
OthelloAI.prototype.bornGene = function(){
    for(var i = 0; i < this.geneScore.length; i++){
        if(this.geneScore[i] == 0){
            
        }
    }
}


// 二点交叉
OthelloAI.prototype.twoPointsCross = function (pGene1, pGene2) {

    // 配列のコピー
    var geneClone1 = pGene1.slice(0, pGene1.length);
    var geneClone2 = pGene2.slice(0, pGene2.length);

    // 交叉点をランダムで二つ選択
    var crossPoint1 = Math.floor(Math.random() * 10);
    var crossPoint2 = Math.floor(Math.random() * 10);

    // 二つの交叉点で挟まれている部分を入れ替える。
    if (crossPoint1 - crossPoint2 >= 0) {
        for (var i = crossPoint2; i <= crossPoint1; i++) {
            pGene1[i] = geneClone2[i];
            pGene2[i] = geneClone1[i];
        }
    } else {
        for (var i = crossPoint1; i <= crossPoint2; i++) {
            pGene1[i] = geneClone2[i];
            pGene2[i] = geneClone1[i];
        }
    }
}


// 突然変異
OthelloAI.prototype.mutationEvolution = function (pGene, pProbability) {
    // 引数で指定された確率で配列の値(0か1)を入れ替える
    for (var i = 0; i < pGene.length; i++) {
        var mutationRate = Math.floor(Math.random() * 100);
        if (mutationRate < pProbability) {
            pGene[i] = (pGene[i] + 1) % 2;
        }
    }
}


// 適合度の評価
OthelloAI.prototype.evaluate = function (pX, pY) {
    var score = 0;
    var ary = [pX, pY];
    // オブジェクトをコピー
    var clone = $.extend(true, {}, this.cloneOtholloBL);

    if (clone.checkTurnOver(pX, pY, true) > 0) {
        clone.board[pX][pY] = clone.turn;
        clone.turn = clone.PIECE_TYPE.SWITHING - clone.turn;
        score += 100 - clone.CountValidPoint(clone);
        // 角であれば、評価を+15する。
        for (var i = 0; i < this.CORNER.length; i++) {
            if (this.CORNER[i] == ary) score += 15;
        }
    }
    return score;
}


// 適合度を評価して、点数の高い順に並び替える。
OthelloAI.prototype.evaluateScore = function(pBoardCell){
    var distinctBoardCell = [];
    distinctBoardCell = pBoardCell.filter(function (x, i, self) {
        return self.indexOf(x) === i;
    });
    var x = distinctBoardCell[i].substr(1,1);
    var y = distinctBoardCell[i].substr(2,1);
    for(var i = 0; i < distinctBoardCell.length; i++){
        this.geneScore[i] = {X:x, Y:y, score:this.evaluate(x, y)};
    }
    this.geneScore.sort(function(a,b){
        if(a.score > b.score) return -1;
        if(a.score < b.score) return 1;
        return 0;
    });
}


// 個体の内容からオセロボードの駒の位置を取得する
OthelloAI.prototype.getPointXY = function(pGene, pPointXY){
    var strX = '';
    var strY = '';
    for(var i = 0; i < pGene.length; i++){
        strX = parseInt(pGene[i].join('').slice(1,this.NUMBER_OF_CHROMOSOME/2),2) + '';
        strY = parseInt(pGene[i].join('').slice(this.NUMBER_OF_CHROMOSOME/2,this.NUMBER_OF_CHROMOSOME),2) + '';
        pPointXY[i] = strX + strY;
    }
}


// オセロボードの駒の位置を個体に変換する。
OthelloAI.prototype.getGene = function(pGene){
    for(var i = 0; i < this.geneScore.length; i++){
        pGene[i] = parseInt(this.geneScore[i].X.toString(2) + this.geneScore[i].Y.toString(2)); 
    }
}

