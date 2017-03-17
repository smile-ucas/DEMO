/**
 * Created by YXX on 2017/3/8.
 */
function getPosTop(i,j) {
    return 20+i*120;
}
function getPosLeft(i,j) {
    return 20+j*120;
}

function getNumberBackgroundColor(number) {
    switch(number){
        case 2:return "#eee4da";break;
        case 4:return "#eef4da";break;
        case 8:return "#f354da";break;
        case 16:return "#e224da";break;
        case 32:return "#f3e4da";break;
        case 64:return "#4t34da";break;
        case 128:return "#f224da";break;
        case 256:return "#t724da";break;

        case 512:return "#32e4da";break;
        case 1024:return "#34f4da";break;
        case 2048:return "#8654da";break;
        case 4096:return "#8924da";break;
        case 8192:return "#6524da";break;
    }
    return "black";
}

function getNumberColor(number) {
    if(number<=4){
        return "#776e65";
    }

    return "white";
}


function nospace(board) {
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]==0)
                return false;
        }
    }

    return true;
}

function canMoveLeft(board) {
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){  //不需要判断最左侧一列,最左一列肯定不能向左移动
            if(board[i][j]!=0)
                if(board[i][j-1]==0||board[i][j-1]==board[i][j])  //看看该框的左侧框是否数字是0(系统中不显示)，或者左侧框的数字和该框的数字一样大小，也就是说可以合并
                    return true;
        }
    }

    return false;
}
function canMoveRight(board) {
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0)
                if(board[i][j+1]==0||board[i][j+1]==board[i][j])
                    return true;
        }
    }

    return false;
}
function canMoveUp(board) {
    for(var j=0;j<4;j++){
       for(var i=1;i<4;i++){
            if(board[i][j]!=0)
                if(board[i-1][j]==0||board[i-1][j]==board[i][j])
                    return true;
        }
    }

    return false;
}

function canMoveDown(board) {
    for(var j=0;j<4;j++){
      for(var i=2;i>=0;i--){
            if(board[i][j]!=0)
                if(board[i+1][j]==0||board[i+1][j]==board[i][j])
                    return true;
        }
    }

    return false;
}

function noBlockHorizontal(row,col1,col2,board) {
    for(var i=col1+1;i<col2;i++){ //是需要判断第col1列到第col2列之间是否有障碍物（即有非0数字的框），所以不判断col1,col2这两列，判断之间列就行
        if(board[row][i]!=0)
            return false;
    }

    return true;
}

function noBlockVertical(col,row1,row2,board) {
    for(var i=row1+1;i<row2;i++){
        if(board[i][col]!=0)
            return false;
    }

    return true;
}


function nomove(board) {
    if(canMoveLeft(board)||canMoveRight(board)||canMoveUp(board)||canMoveDown(board)){
        return false;
    }
    return true;
}