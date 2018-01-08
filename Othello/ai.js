var OthelloAI = function (pOthelloBL) {

    // 個体数
    this.NUMBER_OF_GENE = 7

    // 染色体の数
    this.NUMBER_OF_CHROMOSOME = 8

    // 世代
    this.GENERETION = 30 

    // 角
    this.CORNER = [
        [1, 1],
        [1, 8],
        [8, 1],
        [8, 8]
    ];
    
    // 個体の点数とオセロボードの位置の格納領域
    this.geneScore = [];

    this.OtholloBL = pOthelloBL;

    // オブジェクトをコピー
    this.cloneOtholloBL = $.extend(true, {}, pOthelloBL);
}


// Main関数
OthelloAI.prototype.main = function(){
    var gene = [];
    this.initGene(this.NUMBER_OF_GENE, this.NUMBER_OF_CHROMOSOME, gene);
    this.evaluateScore(this.getPointXY(gene));
    var bestGene = this.bornGene();
    this.OtholloBL.checkTurnOver(bestGene.X, bestGene.Y, true);
    this.OtholloBL.board[bestGene.X][bestGene.Y] = this.OtholloBL.turn;
    this.OtholloBL.turn = this.OtholloBL.PIECE_TYPE.SWITHING - this.OtholloBL.turn;
    // 置ける場所が無かったらパス
    if(!this.OtholloBL.turnSkip()){
        var othelloAI = new OthelloAI(this.OtholloBL);
        othelloAI.main();
        delete othelloAI;
    }           
}


// 個体の初期設定
//gene[i][j]:i番目の個体のj番目の染色体（二進数で駒の位置を表現する）
OthelloAI.prototype.initGene = function (pNunberOfGene, pNunberOfChromosome, pGene) {
    for (var i = 0; i < pNunberOfGene; i++) {
        pGene[i] = new Array(pNunberOfChromosome);
        for (var j = 0; j < pNunberOfChromosome; j++) {
            pGene[i][j] = Math.floor(Math.random() * 2);
        };
    };
}


// 評価が0点の個体を変化させて、全ての個体で最も点数が高い個体を返す。
OthelloAI.prototype.bornGene = function(){
    var lowScoreGenes = [];
    var lowScoreGenesFiler = [];
    var count = 0;
    while(count < this.GENERETION || this.geneScore[0].score == 0){
        for(var i = 0; i < this.geneScore.length; i++){
            if(this.geneScore[i].score == 0){
                lowScoreGenes[i] = this.getGene(i);
                this.geneScore.splice(i, 1);
            }
        }
        lowScoreGenesFiler = lowScoreGenes.filter(v => v);
        if(lowScoreGenesFiler.length > 1){
            // 二点交叉
            for(var i = 0; i < lowScoreGenesFiler.length - 1; i++){
                this.twoPointsCross(lowScoreGenesFiler[i], lowScoreGenesFiler[i + 1]);
            }
            // 突然変異
            for(var i = 0; i < lowScoreGenesFiler.length; i++){
                this.mutationEvolution(lowScoreGenesFiler[i], 10);
            }
            this.evaluateScore(this.getPointXY(lowScoreGenesFiler));
        }     
        count++;
    }
    return this.geneScore[0];
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
    var x = 0;
    var y = 0;
    distinctBoardCell = pBoardCell.filter(function (x, i, self) {
        return self.indexOf(x) === i;
    });  
    for(var i = 0; i < distinctBoardCell.length; i++){
        x = parseInt(distinctBoardCell[i].substr(0,1));
        y = parseInt(distinctBoardCell[i].substr(1,1));
        this.geneScore.push({X:x, Y:y, score:this.evaluate(x, y)});
    }
    this.geneScore.sort(function(a,b){
        if(a.score > b.score) return -1;
        if(a.score < b.score) return 1;
        return 0;
    });
}


// 個体の内容からオセロボードの駒の位置を取得する
OthelloAI.prototype.getPointXY = function(pGene){
    var pointXY = [];

    // 2進数のものを入れる用
    var geneX ='';
    var geneY ='';

    // 10進数に直したものを入れる用
    var strX = '';
    var strY = '';

    for(var i = 0; i < pGene.length; i++){
        geneX = pGene[i].join('').slice(0,this.NUMBER_OF_CHROMOSOME/2);
        geneY = pGene[i].join('').slice(this.NUMBER_OF_CHROMOSOME/2,this.NUMBER_OF_CHROMOSOME);
        strX = this.precedeCorner(parseInt(geneX,2)) + '';
        strY = this.precedeCorner(parseInt(geneY,2)) + '';   
        pointXY[i] = strX + strY;
    }
    return pointXY;
}


// 角を置きやすくする。
OthelloAI.prototype.precedeCorner = function(pNumber){
    if(pNumber > 8 || pNumber < 1){
        pNumber = Math.floor(Math.random() * 10);
        if(pNumber > 8 || pNumber < 1){
            if(Math.floor(Math.random() * 2)){
                pNumber = 8;
            }else{
                pNumber = 1;
            }                        
        }     
    }
    return pNumber;
}


// オセロボードの駒の位置を個体に変換する。
OthelloAI.prototype.getGene = function(pIndex){
    // X,Yそれぞれで文字の長さが4文字になるようにする。
    var strLength = 4;
    var geneX = new Array(strLength);
    var geneY = new Array(strLength);
    var strGeneX = this.geneScore[pIndex].X.toString(2);
    var strGeneY = this.geneScore[pIndex].Y.toString(2);
    this.strToAry(geneX, strGeneX, strLength);
    this.strToAry(geneY, strGeneY, strLength);
    return geneX.concat(geneY); 
}


// 文字列を配列にする。空文字には0を入れる。
OthelloAI.prototype.strToAry = function(pAry, pStr, pStrLength){
    for(var i = pStrLength; i > 0; i--){
        if(pStr.substr(i,1) != ''){
            pAry[pStrLength - i] = parseInt(pStr.substr(i,1));
        }else{
            pAry[pStrLength - i] = 0;
        }
    }
}