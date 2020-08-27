const screenInput = document.getElementById("screen-input");
const buttons = Array.from(document.getElementById("button-holder").children);
const numberButtons = (buttons.filter((button)=>button.className=="int-btn"?true:false));
const operatorButtons = (buttons.filter((button)=>button.className=="op-btn"?true:false));
const clearButton = buttons.find(button=>button.className=="clear-btn");
const equalButton = buttons.find(button=>button.className=="equal-btn");
numberButtons.forEach(button => button.addEventListener("click", () => displayInput(button.textContent)));
operatorButtons.forEach(button => button.addEventListener("click", () => operatorPressed(button.textContent)));
clearButton.addEventListener("click", clearInput);
equalButton.addEventListener("click", evaluate);
let calculationValues = [];

function displayInput(sym){

    screenInput.textContent+=sym;
}

function clearInput(){
    screenInput.textContent = "";
    calculationValues = [];
}
function operatorPressed(operator){
    calculationValues.push(parseInt(screenInput.textContent));
    calculationValues.push(operator);
    screenInput.textContent = "";
}

function evaluate(){
    calculationValues.push(parseInt(screenInput.textContent));
    let result = 0;
    let currentOperator = "";
    let currentNum1 = 0;
    let currentNum2 = 0;
    let firstNumberAssigned = false;
    calculationValues.forEach(value => {
        if (!firstNumberAssigned){
            currentNum1 = value;
            firstNumberAssigned = true;
        }
        else if(typeof value != "number"){
            currentOperator = value;
        }
        else{
            currentNum2 = value;
            result = operate(currentOperator, currentNum1, currentNum2);
        }
    });
    clearInput();
    screenInput.textContent="";
    displayInput(result);
}


function add (num1, num2){
    return num1+num2;
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
            return multiply(num1,num2);
        case "/":
            return divide(num1,num2);
        default:
            return "Invalid operation";
    }
}