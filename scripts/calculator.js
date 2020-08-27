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

let lastButtonWasOperator = false;
let calculationMemory = [];
let screenString = "0";
let lastScreenString = "0";
let snarkyMessage = "Criminal!";

function displayInput(sym){
    if(sym === "."){
        if (screenString.includes(sym)){
            return;
        }
    }
    if (screenString === "0" || lastButtonWasOperator || screenString === snarkyMessage){
        screenString = sym;
    }
    else{
        screenString+=sym;
    }
    lastButtonWasOperator = false;
    screenInput.textContent = screenString;
}

function clearInput(){
    calculationMemory = [];
    screenString = "0";
    screenInput.textContent = "0";
}
function operatorPressed(operator){
    evaluate();
    calculationMemory[1] = operator;
    

    lastButtonWasOperator = true;
}
function evaluate(){
    
    let result;
    
    if (!calculationMemory[1]){
        calculationMemory[0] = parseFloat(screenString);
        result = calculationMemory[0];
    }

    else if (calculationMemory[1] && !calculationMemory[0]){
        calculationMemory[0] = parseFloat(screenString);
        result = calculationMemory[0];

    }

    else if (calculationMemory[1] && calculationMemory[0]){
        console.log(1);
        result = operate(calculationMemory[1], calculationMemory[0], parseFloat(screenString));
        calculationMemory[0] = result;
        calculationMemory.pop();
    }
    
    screenString = "";
    displayInput(result);


}
/*
    
   
*/ 

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
        return snarkyMessage;
    }
    else{
        return Math.round(((num1/num2) + Number.EPSILON) * 1000000) / 1000000;
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