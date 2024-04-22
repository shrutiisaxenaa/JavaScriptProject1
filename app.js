let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newGameButton = document.querySelector("#new-gameButton");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;  //playerX , playerO
let count=0; // to track draw match
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];
const resetGame = ()=> {
    turnO = true;
    count = 0;
    enableBox();
    msgContainer.classList.add("hide");
};
newGameButton.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
boxes.forEach((box) => {
    box.addEventListener("click", ()=>{
        //console.log("box was clicked");
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }else{
            box.innerText = "X";
            turnO= true;
        } 
        box.disabled = true ; //it is done so that the value of X and O doesn't change after clicking on the box; 
        count++;
        let isWinner = checkWinner();
        if(count === 9 && !isWinner){
            gameDraw();
        }
    });
});
const gameDraw= () => {
    msg.innerText = `game was a draw`;
    msgContainer.classList.remove("hide");
    disableBox();
}
const disableBox =() => {
    for(let box of boxes){
        box.disabled = true;
    }
}
const enableBox =() => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
        //msgContainer.classList.add("hide");
    }
}

const showWinner = (winner) =>{
    msg.innerText= `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");  //it will show the hidden msg
    disableBox();
}
const checkWinner = () => {
    for(let patterns of winPatterns){
        /*console.log([patterns[0]],[patterns[1]],[patterns[2]]);
        console.log(
            boxes[patterns[0]].innerText,
            boxes[patterns[1]].innerText,
            boxes[patterns[2]].innerText);*/
        let pos1Val = boxes[patterns[0]].innerText;
        let pos2Val = boxes[patterns[1]].innerText;
        let pos3Val = boxes[patterns[2]].innerText;
        if(pos1Val  != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                //console.log("Winner", pos1Val);
                showWinner(pos1Val);
                return true;
            }
        }
    }
};
 
