var boxes=document.querySelectorAll("td");
var colors;
function makeBigger(){
    document.querySelector("tbody").innerHTML="<tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr>";
    boxes=document.querySelectorAll("td");
    for(let i = 0; i < boxes.length; i++){
        boxes[i].style.width = "75px";
        boxes[i].style.height = "75px";
    } 
    play();
}
function changeColor(){
    if(score==60){makeBigger();}
    var opt;
    if(score<25){opt=1;}
    else if(score<60){opt=2;}
    else {opt=3;}
    var composition = [];
    if(opt==1){
        let count=Math.floor(Math.random() * 3) + 5;
        for(let i = 0; i < count; i++){composition.push(0)};
        for(let i = 0; i < 9-count; i++){composition.push(1)};
    }
    if(opt==2){
        let count1=Math.floor(Math.random() * 2) + 4;
        let count2=Math.floor(Math.random() * 2) + 2;
        for(let i = 0; i < count1; i++){composition.push(0)};
        for(let i = 0; i < count2; i++){composition.push(1)};
        for(let i = 0; i < 9 - count1 - count2; i++){composition.push(2)};
    }
    if(opt==3){
        let count1=Math.floor(Math.random() * 5) + 6;
        let count2=Math.floor(Math.random() * 3) + 3;
        for(let i = 0; i < count1; i++){composition.push(0)};
        for(let i = 0; i < count2; i++){composition.push(1)};
        for(let i = 0; i < 16 - count1 - count2; i++){composition.push(2)};
    }
    shuffle(composition);
    if(opt==1){colors = [["red","blue"],["blue","red"]][Math.floor(Math.random()*2)];}
    if(opt==2||opt==3){colors = [["red","blue","green"],["blue","red","green"],["red","green","blue"],["blue","green","red"],["green","red","blue"],["green","blue","red"]][Math.floor(Math.random()*6)];}
    for(let i = 0; i < boxes.length; i++){
        boxes[i].classList.remove("red");
        boxes[i].classList.remove("blue");
        boxes[i].classList.remove("green");
        boxes[i].classList.add(colors[composition[i]]);
    } 
} 
function shuffle(array){
    for(let i = array.length - 1 ; i > 0; i--){
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
}
function play(){
    for(var i = 0; i < boxes.length; i++){
        boxes[i].addEventListener("click",function(){
            if(!gameOver){
                if(this.classList[0]==colors[0]){
                    changeColor();
                    correctStreak+=1;
                    score+=1;
                    document.querySelector("#score").textContent=score;
                    if(correctStreak==5){
                        finishTime+=3000;
                        correctStreak=0;
                    }
                }
                else{
                    finishTime-=2000;
                    correctStreak=0;
                }
            }
        });
    }
}

var correctStreak=0;
var finishTime = new Date().getTime() + 30000;
var gameOver=false;
var score=0;
changeColor();
play();

setInterval(function(){
    var now = new Date().getTime();
    var remainingTime = finishTime - now;
    var percentage= 100-Math.floor(remainingTime/30000*100);
    document.querySelector("#time-show").style.marginRight = percentage + "%";
    if (remainingTime<0) {gameOver=true;}
},100);
