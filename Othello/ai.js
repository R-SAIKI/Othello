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
    this.gene = new Array(this.NUMBER_OF_GENE);
    
    // 個体の点数の格納領域
    this.geneScore = new Array(this.NUMBER_OF_GENE);

    this.OtholloBL = pOthelloBL;

    // オブジェクトをコピー
    this.cloneOtholloBL = $.extend(true, {}, pOthelloBL);
}


// Main関数
OthelloAI.prototype.main = function(){
    this.init(this.NUMBER_OF_GENE, this.NUMBER_OF_CHROMOSOME);
    
}


// 個体の初期設定
//gene[i][j]:i番目の個体のj番目の染色体（二進数で駒の位置を表現する）
OthelloAI.prototype.init = function (pNunberOfGene, pNunberOfChromosome) {
    for (var i = 0; i < pNunberOfGene; i++) {
        gene[i] = new Array(pNunberOfChromosome);
        for (var j = 0; j < pNunberOfChromosome; j++) {
            gene[i][j] = Math.floor(Math.random() * 2);
        };
    };
}


// 二点交叉
OthelloAI.prototype.twoPointsCrossing = function (pGene1, pGene2) {

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



