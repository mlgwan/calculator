const screenInput = document.getElementById("screen-input");
const buttons = Array.from(document.getElementById("button-holder").children);
const numberButtons = (buttons.filter((button)=>button.className=="int-btn"?true:false));
const numberButtonKeyboardKeys = numberButtons.map((button)=>button.textContent);
const operatorButtons = (buttons.filter((button)=>button.className=="op-btn"?true:false));
const operatorButtonKeyboardKeys = operatorButtons.map((button)=>button.textContent);
const clearButton = buttons.find(button=>button.className=="clear-btn");
const equalButton = buttons.find(button=>button.className=="equal-btn");
numberButtons.forEach(button => button.addEventListener("click", () => displayInput(button.textContent)));
operatorButtons.forEach(button => button.addEventListener("click", () => operatorPressed(button.textContent)));
clearButton.addEventListener("click", clearInput);
equalButton.addEventListener("click", ()=>evaluate(true));

let lastButtonWasOperator = false;
let calculationMemory = [];
let screenString = "0";
let lastScreenString = "0";
let snarkyMessage = "That is Illegal!";

document.onkeydown = (e) => {
    if (numberButtonKeyboardKeys.find((key) => key == e.key)){
        displayInput(e.key);
    }
    else if (operatorButtonKeyboardKeys.find((key) => key == e.key)){
        operatorPressed(e.key);
    }
    else if (e.key === "Escape"){
        clearInput();
    }

    else if (e.key === "Enter"){
        evaluate(true);
    }
};

function displayInput(sym){
    if(sym === "."){
        if (screenString.includes(sym)){
            return;
        }
    }
    if (screenString === "0" || lastButtonWasOperator || screenString === snarkyMessage || screenString === "Infinity"){
        screenString = sym;
    }
    else{
        screenString+=sym;
    }
    lastButtonWasOperator = false;
    screenInput.textContent = screenString;
}

function clearInput(){
    lastButtonWasOperator = false;
    calculationMemory = [];
    screenString = "0";
    screenInput.textContent = "0";
}
function operatorPressed(operator){
    evaluate(false);
    calculationMemory[1] = operator;
    

    lastButtonWasOperator = true;
}
function evaluate(equalWasPressed){
    
    let result;
    if(equalWasPressed){
        lastButtonWasOperator = false;
    }
    
    if (!calculationMemory[1]){
        calculationMemory[0] = parseFloat(screenString);
        result = calculationMemory[0];
    }

    else if (calculationMemory[1] && !calculationMemory[0]){
        calculationMemory[0] = parseFloat(screenString);
        result = calculationMemory[0];

    }

    else if (calculationMemory[1] && calculationMemory[0]){
        result = operate(calculationMemory[1], calculationMemory[0], parseFloat(screenString));
        calculationMemory[0] = result;
        calculationMemory.pop();
    }
    
    screenString = "";
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
        return snarkyMessage;
    }
    else{
        return Math.round(((num1/num2) + Number.EPSILON) * 100000) / 100000;
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