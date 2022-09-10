const questionEl = document.getElementById("question");
const inputEl = document.getElementById("input");
const formEl = document.getElementById("form");
const scoreEl = document.getElementById("score");

const easyEl = document.getElementById("easy");
const normalEl = document.getElementById("normal");
const hardEl = document.getElementById("hard");
const expertEl = document.getElementById("expert");
const totalEl = document.getElementById("total");
const holderEl = document.querySelector('#holder');
const submitEl = document.getElementById("submit");
const startEl = document.getElementById("start");

var lnum = 10;
let score = JSON.parse(localStorage.getItem("score"));
let total = JSON.parse(localStorage.getItem("total"));
if(!score){
    score = 0;
}
if(!total){
    total = 0;
}

var num1, num2, correctAns, level = 1;

function newQuestion(){
    num1= Math.ceil(Math.random()*lnum)
    num2= Math.ceil(Math.random()*lnum)
    questionEl.innerHTML = 'What is '+num1+' multiply by '+num2+'?';
    inputEl.value = '';
    input.focus();
    correctAns = num1 * num2;
    scoreEl.innerText = 'score: '+score;
    totalEl.innerText = 'attempted: '+total;
}

submitEl.addEventListener('click', ()=>{
    const userAns = +inputEl.value; //to get the value from the input box
    if(userAns === correctAns){
        score++;
        updateLocalStorage()
    }
    else{
        score--;
        updateLocalStorage()
    }
    total++;
    newQuestion();
    //event.preventDefault(); // to prevent a button from refreshing the page
});

function updateLocalStorage(){
    localStorage.setItem("score", JSON.stringify(score));
    localStorage.setItem("total", JSON.stringify(total));
}

function updateScoreTotal(){
    score = 0;
    scoreEl.innerText = 'score: '+score;
    total = 0;
    totalEl.innerText = 'attempted: '+total;
    updateLocalStorage();
}

function newLevel(level){
    if(level==1){
        easyEl.style.background = "white";
        easyEl.style.transition = "all 0.35s";
        normalEl.style.background = "lightgreen";
        hardEl.style.background = "lightgreen";
        expertEl.style.background = "lightgreen";
        lnum = 10;
    } else if(level==2){
        easyEl.style.background = "lightgreen";
        normalEl.style.background = "white";
        normalEl.style.transition = "all 0.35s";
        hardEl.style.background = "lightgreen";
        expertEl.style.background = "lightgreen";
        lnum = 25;
    } else if(level==3){
        easyEl.style.background = "lightgreen";
        normalEl.style.background = "lightgreen";
        hardEl.style.background = "white";
        hardEl.style.transition = "all 0.35s";
        expertEl.style.background = "lightgreen";
        lnum = 50;
    } else{
        easyEl.style.background = "lightgreen";
        normalEl.style.background = "lightgreen";
        hardEl.style.background = "lightgreen";
        expertEl.style.background = "white";
        expertEl.style.transition = "all 0.35s";
        lnum = 100;
    }
    holderEl.style.display = 'none';
    startEl.style.display = 'block';
}

easyEl.addEventListener("click", ()=>{
    newLevel(1);
});

normalEl.addEventListener("click", ()=>{
    newLevel(2);
    updateScoreTotal();
});

hardEl.addEventListener("click", ()=>{
    newLevel(3);
});

expertEl.addEventListener("click", ()=>{
    newLevel(4);
});

startEl.addEventListener('click', ()=>{
    holderEl.style.display = 'block';
    startEl.style.display = 'none';
    newQuestion();
    updateScoreTotal();
});