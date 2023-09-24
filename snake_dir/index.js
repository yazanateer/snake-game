var square_size = 50;
var rows = 10;
var cols = 10;
var board;
var draw_on_board;
var game_over= false;




// the snake body : 

var x_snake = square_size * 0;
var y_snake = square_size * 0;

var x_head = 0;
var y_head = 0;

// the food:
var x_food;
var y_food;

var snake = [];



/////////////////////////////////////////////////////
window.onload = function() {
    board = document.getElementById("board-snake");
    board.height = rows * square_size;
    board.width = cols * square_size;
    draw_on_board = board.getContext("2d");

    xy_food();
    document.addEventListener("keyup", move_head);
    update();
    setInterval(update, 1000/10);
}

function update() {
    if(game_over){
        return;
    }
    draw_on_board.fillStyle = "black";
    draw_on_board.fillRect(0,0,board.width,board.height);

    draw_on_board.fillStyle="red";
    draw_on_board.fillRect(x_food,y_food,square_size,square_size);

    if(x_snake == x_food && y_snake == y_food){ 
        snake.push([x_food,y_food]);
        xy_food();
    }

    for(let i = snake.length-1;i>0;i--){
            snake[i] = snake[i-1];
    }
    if(snake.length){
        snake[0] = [x_snake,y_snake];
    }

    draw_on_board.fillStyle="blue";
    x_snake += (x_head * square_size/2);
    y_snake += (y_head * square_size/2);
    draw_on_board.fillRect(x_snake,y_snake,square_size,square_size);

    for( let i =0;i<snake.length;i++){
        draw_on_board.fillRect(snake[i][0], snake[i][1], square_size, square_size);
    }


    //game over: 
    if(x_snake<0 || y_snake<0 || x_snake>(cols*square_size) || y_snake>(rows*square_size)){
        game_over=true;
        alert("The end");
    }

    for(let i = 0;i<snake.length;i++){
        if(x_snake == snake[i][0] && y_snake == snake[i][1]){
            game_over =true;
            alert("The end");
        }
    }
}


function xy_food(){
    x_food= Math.floor(Math.random() * cols) * square_size;
    y_food= Math.floor(Math.random() * cols) * square_size;
}

function move_head(btn){
    if(btn.code == "ArrowRight" && x_head!=-1){
        x_head = 1;
        y_head = 0;
    }

    if(btn.code == "ArrowLeft"&& x_head!=1){
        x_head = -1;
        y_head = 0;
    }

    if(btn.code == "ArrowUp"&& x_head!=1){
        x_head = 0;
        y_head = -1;
    }

    if(btn.code == "ArrowDown"&& x_head!=-1){
        x_head = 0;
        y_head = 1;
    }
}