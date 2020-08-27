const buttons = Array.from(document.getElementById("button-holder").children);
const screenInput = document.getElementById("screen-input");
buttons.forEach(button => button.addEventListener("click", () => button.textContent !="C" ? enterInput(button.textContent) : clear()));


function enterInput(sym){
    screenInput.textContent+=sym;
}

function clear(){
    screenInput.textContent = "";
}


function add (num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1-num2;
}

function multiply(num1, num2){
    return num1*num2;
}

function divide(num1, num2){
    if (num2 == 0){
        return "That's illegal!";
    }
    else{
        return Math.round(((num1/num2) + Number.EPSILON) * 10000000) / 10000000;
    }
}

function operate(operator, num1, num2){
    switch(operator){
        case "+":
            return add(num1,num2);
        case "-":
            return subtract(num1,num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1/num2);
        default:
            return "Invalid operation";
    }
}