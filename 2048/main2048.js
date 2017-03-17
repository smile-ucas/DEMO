/**
 * Created by YXX on 2017/3/8.
 */
var board =new Array();
var score =0;

var hasConflicted=new Array();//同一个位置不同连续发生碰撞，即叠加数字


$(document).ready(function(){
    newgame();
});

function newgame() {
    // 初始化
    init();


    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

function init() {
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
        }
    }
    for(var i=0;i<4;i++){
        board[i]=new Array();//做成二维数组
        hasConflicted[i]=new Array();//做成二维数组
        for(var j=0;j<4;j++) {
            board[i][j]=0;
            hasConflicted[i][j]=false;//即初始的时候每一个位置都没有进行过碰撞，可理解为叠加数字
        }
    }
    updateBoardView();

    score=0;

}
function updateBoardView() {
    $(".number-cell").remove();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $('#number-cell-'+i+'-'+j);

            if(board[i][j]==0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j)+50);
                theNumberCell.css('left',getPosLeft(i,j)+50);
            }
            else{
                theNumberCell.css('width','100px');
                theNumberCell.css('height','100px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }

            hasConflicted[i][j]=false;
        }
    }
}

function generateOneNumber() {
    if(nospace(board))
        return false;

    //随机一个位置
    var randx = parseInt(Math.floor(Math.random()*4));
    var randy = parseInt(Math.floor(Math.random()*4));

    // while(true){
    //     if(board[randx][randy]==0)//该位置上的数字是0，则该位置可用，跳出死循环
    //         break;
    //     randx= parseInt(Math.floor(Math.random()*4));
    //     randy = parseInt(Math.floor(Math.random()*4));
    // }
    var times=0;
    while(times<50){   //让计算机猜50次的机会 ，以便在游戏进行再后续的时候(空位置很少)提高运行速度

            if(board[randx][randy]==0)//该位置上的数字是0，则该位置可用，跳出死循环
                break;
            randx= parseInt(Math.floor(Math.random()*4));
            randy = parseInt(Math.floor(Math.random()*4));

            times++;

    }
    if(times==50){//计算机没有成功找到位置，人工赋位置
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(board[i][j]==0)
                {
                    randx=i;
                    randy=j;
                }
            }
        }

    }




    //随机一个数字(2或4,概率各一半)
    var randNumber = Math.random()<0.5?2:4;


    //在随机位置显示随机数字
    board[randx][randy]=randNumber;
    showNumberWithAnimation(randx,randy,randNumber);



        return true;
}

$(document).keydown(function (event) {
    switch(event.keyCode){
        case 37://left
            if(moveLeft()){
                setTimeout("generateOneNumber()",220);
                setTimeout("isGameOver()",300);

            }
            break;
        case 38://up
            if(moveUp()){
                setTimeout("generateOneNumber()",220);
                setTimeout("isGameOver()",300);
            }
            break;
        case 39://right
            if(moveRight()){
                setTimeout("generateOneNumber()",220);
                setTimeout("isGameOver()",300);
            }
            break;
        case 40://down
            if(moveDown()){
                setTimeout("generateOneNumber()",220);
                setTimeout("isGameOver()",300);
            }
            break;
        default:
            break;
    }
});

function isGameOver() {
    if(nospace(board) && nomove(board)){//棋盘没有空间，且所有相邻的数字没有相等的
        gameover();
    }
}
function gameover() {
    alert("Game Over");
}
function moveLeft() {
    if(!canMoveLeft(board)){
        return false;
    }

    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){  //不需要判断最左侧一列,最左一列肯定不能向左移动

              if(board[i][j]!=0){

                for(var k=0;k<j;k++){
                    if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;


                        continue;
                    }
                    else if(board[i][j]==board[i][k] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        
                        //add
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        //add score
                        score += board[i][k]
                        updateScore(score);

                        hasConflicted[i][k]=true;
                        continue;
                    }
                }

              }
        }
    }
    setTimeout("updateBoardView()",200);
    // updateBoardView()

    return true;
}


function moveRight() {
    if(!canMoveRight(board)){
        return false;
    }

    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){

            if(board[i][j]!=0){

                for(var k=3;k>j;k--){
                    if(board[i][k]==0 && noBlockHorizontal(i,j,k,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;


                        continue;
                    }
                    else if(board[i][j]==board[i][k] && noBlockHorizontal(i,j,k,board)&& !hasConflicted[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);

                        //add
                        board[i][k]+=board[i][j];
                        board[i][j]=0;

                        //add score
                        score += board[i][k]
                        updateScore(score);
                        hasConflicted[i][k]=true;

                        continue;
                    }
                }

            }
        }
    }
    setTimeout("updateBoardView()",200);
    // updateBoardView()

    return true;
}


function moveUp() {
    if(!canMoveUp(board)){
        return false;
    }
    for(var j=0;j<4;j++){
        for(var i=1;i<4;i++){
            if(board[i][j]!=0){

                for(var k=0;k<i;k++){
                    if(board[k][j]==0 && noBlockVertical(j,k,i,board)){
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;


                        continue;
                    }
                    else if(board[k][j]==board[i][j] && noBlockVertical(j,k,i,board)&& !hasConflicted[k][j]){
                        //move
                        showMoveAnimation(i,j,k,j);

                        //add
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        //add score
                        score += board[k][j]
                        updateScore(score);

                        hasConflicted[k][j]=true;
                        continue;
                    }
                }

            }
        }
    }
    setTimeout("updateBoardView()",200);
    // updateBoardView()

    return true;
}


function moveDown() {
    if(!canMoveDown(board)){
        return false;
    }
    for(var j=0;j<4;j++){
       for(var i=2;i>=0;i--){
                if(board[i][j]!=0){

                for(var k=3;k>i;k--){
                    if(board[k][j]==0 && noBlockVertical(j,i,k,board)){
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;


                        continue;
                    }
                    else if(board[k][j]==board[i][j] && noBlockVertical(j,i,k,board)&& !hasConflicted[k][j]){
                        //move
                        showMoveAnimation(i,j,k,j);

                        //add
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        //add score
                        score += board[k][j]
                        updateScore(score);

                        hasConflicted[k][j]=true;
                        continue;
                    }
                }

            }
        }
    }
    setTimeout("updateBoardView()",200);
    // updateBoardView()

    return true;
}