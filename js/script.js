let inputDir = { x: 0, y: 0 };
let lastTime = 0;
let speed = 10;
let snakeArr = [{ x: 13, y: 16 }]; 
let food = {
    x:5,y:10
}
let score = 0;





function main(ctime)
{
    window.requestAnimationFrame(main);
    if ((ctime - lastTime) / 1000 < 1 / speed) { return }
    lastTime = ctime;
    gameEngine();
}

function isCollided(snakeArr)
{
    //snake collide
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[0].x == snakeArr[i].x && snakeArr[0].y == snakeArr[i].y)
            return true;
    }
    if (snakeArr[0].x == 0 || snakeArr[0].y == 0 || snakeArr[0].x == 18 || snakeArr[0].y == 18)
        return true;
        
    return false;
}





function gameEngine()
{
    //part1: updating snake array and food;
    if (isCollided(snakeArr))
    {   
        inputDir = { x: 0, y: 0 };
        alert("Game Over,Press any key to Start again!!");
        snakeArr = [{ x: 13, y: 16 }];
        
        if (score > hiscoreval)
        {
            hiscoreval = score;
             localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
             Hiscore.innerHTML = "High Score: " + hiscoreval;
            }
        score = 0;
    }

    //if food eaten,score++,food randomize;
    if (snakeArr[0].x == food.x && snakeArr[0].y == food.y)
    {
        snakeArr.unshift({
          x: snakeArr[0].x + inputDir.x,
          y: snakeArr[0].y + inputDir.y,
        });
        score+=1;
        Score.innerHTML = "Score: " + score; 
        let a = 2, b = 18;
        food = {
          x: Math.round(a + (b - a) * Math.random()),
          y: Math.round(a + (b - a) * Math.random()),
        };


        }
    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--)
    {
        snakeArr[i+1] = { ...snakeArr[i] };
        }

    snakeArr[0].x += inputDir.x;snakeArr[0].y += inputDir.y;
    //part2: displaying snake array and food;
    //display snake;
    
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
       
        if (index == 0)
            snakeElement.classList.add("head");
        else
             snakeElement.classList.add("snake");
        board.appendChild(snakeElement);
;
    });

    //display food
     foodElement = document.createElement("div");
     foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
     foodElement.classList.add("food");
     board.appendChild(foodElement);
}


//main logic starts here
let hiscore = localStorage.getItem("hiscore");
if (hiscore == null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscore.innerHTML = "High Score: " + hiscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    switch (e.key) {
      case "ArrowUp": {
            console.log(e.key);
            inputDir.x =0;
            inputDir.y=-1;
        break;
      }
      case "ArrowDown": {
            console.log(e.key);
            inputDir.x = 0;
            inputDir.y = 1;
        break;
      }
      case "ArrowLeft": {
            console.log(e.key);
            inputDir.x =-1;
            inputDir.y = 0;
            break;
      }
      case "ArrowRight": {
            console.log(e.key);
            inputDir.x = 1;
            inputDir.y = 0;
        break;
      }
    }
})