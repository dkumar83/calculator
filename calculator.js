function add(x, y) {
    return x + y;
}

function minus(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function factorial(x) {
    let total = 1;
    for (let i = 1; i <= x; i++) {
        total *= i;
    }
    return total;
}

function fibonacci(number) {
    let num = +number;
    const fibArray = [1,1];
    if (num < 0) {
        return "OOPS";
    }
    else if (num === 0) {
        return 0;
    }
    else if (num <= 2) {
        for (let j = 0; j < num; j++) {
            fibArray.push(j);
        }
        return 1;
    } else {
            for (let i = 2; i <= num - 1; i++) {
        fibArray.push(fibArray[i - 2] + fibArray[i-1]);
        }
    return fibArray[num - 1];

    }
};

function oneRepMax (weight, reps) {
    //RM = w / (1.0278 - (0.0278 × r)) , where w = weight lifted , r = reps performed
    return weight/ (1.0278 - (0.0278 * reps));
}

console.log(fibonacci(8));

function operate(action, x, y) {
    switch (action) {
        case "+":
            return add(x, y);
            break;
        case "-":
            return minus(x, y);
            break;
        case "*":
            return multiply(x, y);
            break;
        case "/":
            return divide(x, y);
            break;
        case "!":
            return factorial(x);
            break;
        case "f":
            return fibonacci(x);
            break;
        case "o":
            return oneRepMax(x,y);
            break;
    }
}

const digits = "0123456789+-*/=.!fo";
const digitsArray = digits.split("");

const operatorSymbols = "+-*/!fo";
const operatorArray = operatorSymbols.split("");

const styleButtons = {
    "0": "zero",
    "1": "one",
    "2": "two",
    "3": "three",
    "4": "four",
    "5": "five",
    "6": "six",
    "7": "seven",
    "8": "eight",
    "9": "nine",
    "+": "plus",
    "-": "minus",
    "*": "multiply",
    "/": "divide",
    "=": "equals",
    ".": "dot",
    "!": "factorial",
    "f": "fibonacci",
    "o": "oneRepMax"
};


const inputArray = {
    x: "",
    y: "",
    yCount: 0,
    operator: "",
    xCount: 0,
    operatorCount: 0,
    equalsCount: 0,
    answerExists: false,
    previous: "",
    xDot: 0,
    yDot: 0,
    solution: "",
    dotTotal: 0
};

const display = document.querySelector(".display");
display.innerText = "Input: ";

const displayAnswer = document.querySelector(".answer");
displayAnswer.innerText = "0";

const container = document.querySelector(".container");

function clear(answerText = "0", operator = "", x = "") {
    inputArray.x = "";
    inputArray.y = "";
    inputArray.yCount = 0;
    inputArray.xCount = 0;
    inputArray.operator = "";
    inputArray.operatorCount = 0;
    display.innerText = "Input: " + x + operator;
    inputArray.equalsCount = 0;
    inputArray.answerExists = false;
    displayAnswer.innerText = answerText;
    inputArray.xDot = 0;
    inputArray.yDot = 0;
    inputArray.solution = "";
    inputArray.dotTotal = 0;
    console.clear();
}

function truncate(number) {
    if (!checkIfInteger(number) && number.length > 10) {
        return setDecimalPoint(number, 10);
    } else {
        return number;
    }
}


function updateSum() {
    const truncX = truncate(inputArray.x);
    const truncY = truncate(inputArray.y);
    if (+inputArray.solution === NaN || +inputArray.solution === Infinity) {
        console.log("infinity");
        displayAnswer.innerText = "Error: Cannot compute.";
        display.innerText = "To infinity";
    }
    else if (inputArray.solution && inputArray.equalsCount !== 0) {
        if (inputArray.operator === "+") {
            display.innerText = `Input: ${minus(truncX, truncY)} ${inputArray.operator} ${truncY}`;
        } else if (inputArray.operator === "-") {
            display.innerText = `Input: ${add(truncX, truncY)} ${inputArray.operator} ${truncY}`;
        } else if (inputArray.operator === "/") {
            display.innerText = `Input: ${multiply(truncX, truncY)} ${inputArray.operator} ${truncY}`;
        } else if (inputArray.operator === "*") {
            display.innerText = `Input: ${divide(truncX, truncY)} ${inputArray.operator} ${truncY}`;
        }

    } else {
        display.innerText = `Input: ${inputArray.x} ${inputArray.operator} ${inputArray.y}`;

    }
    //display.innerText = `Input: ${inputArray.x}`;
}

function populateInputArray(item, bool, equals) {
    let equalsStatus = false;

    // if equals is true run the calculation.
    if (equals) {
        console.log("equals", equals);
        inputArray.solution = setDecimalPoint(operate(inputArray.operator, +inputArray.x, +inputArray.y), 9).toString();
        inputArray.answerExists = true;

        console.log(inputArray.solution);

        displayAnswer.innerText = inputArray.solution;

        inputArray.x = inputArray.solution;
        inputArray.xCount = 1;
        console.log("equals count: ", inputArray.equalsCount);

        inputArray.yCount = 0;
        equalsStatus = true;

    }
    // populate the LHS and RHS numbers
    else if (bool) {
        if (inputArray.xCount === 0) {
            inputArray.x += item.toString();
        } else if (inputArray.xCount === 1) {
            if (equalsStatus) {
                inputArray.y = inputArray.solution.toString();
                equalsStatus = !equalsStatus;

            } else {
                inputArray.y += item.toString();
                console.log(inputArray.yCount, "test");
                inputArray.yCount++;
            }
        }
    } else {
        // populate the operator
        if (!inputArray.operator) {
            inputArray.operator = item;
            inputArray.xCount = 1;
            inputArray.operatorCount = 1;

        } else if (inputArray.xCount === 1) {
            inputArray.operatorCount++;

            if (inputArray.operatorCount > 1 && inputArray.yCount > 0) {
                console.log(`Do ${inputArray.x} ${inputArray.operator} ${inputArray.y}`);
                populateInputArray("", false, true);
            }
            // reset counters to zero when chaining operators without pressing equals
            inputArray.y = "";
            inputArray.dotTotal = 0;
            inputArray.xDot = 0;
            inputArray.yDot = 0;
            inputArray.operator = item;

        }
    }
    console.log(inputArray);
    updateSum();


}

// Set up buttons 1 - 10
for (i = 0, row = 2; i < 10; row++, i++) {
    let appendRow = ".row" + Math.round(row / 3);
    if (i === 0) {
        row = 4;
    }
    const rowElement = document.querySelector(appendRow);

    const newButton = document.createElement("button");
    newButton.innerText = i;
    newButton.className = styleButtons[i];
    newButton.value = i;

    rowElement.appendChild(newButton);


    newButton.addEventListener("click", (e) => {
        console.log(`${e.target.value} was clicked`);
        if (inputArray.equalsCount > 0) {
            //inputArray.answerExists = true;
            console.log("reset the geese");
            clear();
            displayAnswer.innerText = "0";

        }
        populateInputArray(e.target.value, true, false);
    });

}

// Set up operator buttons
const operators = document.querySelector(".operators");

operatorArray.forEach(element => {
    const newButton = document.createElement("button");
    newButton.innerText = element;
    newButton.className = styleButtons[element];
    newButton.value = element;
    operators.appendChild(newButton);

    newButton.addEventListener("click", (e) => {
        console.log(`${e.target.value} was clicked`);
        inputArray.equalsCount = 0;
        populateInputArray(e.target.value, false, false);

        if ((e.target.value === "!" || e.target.value === "f")) {
            if (inputArray.x === "") {
                e.preventDefault();
                clear();
            } else {
                const bangFib = inputArray.solution = operate(e.target.value, Math.floor(+inputArray.x)).toString();
                
                // comment below
                inputArray.x = bangFib;
                // comment below
                inputArray.operatorCount = 0;

                displayAnswer.innerHTML = bangFib;
                
                //clear(inputArray.solution, e.target.value, Math.floor(inputArray.x));
            }
        }

    });
});

const flex = document.querySelector(".oneRepMax");
flex.innerText = "💪";

const bottomRow = document.querySelector(".row1");

// Create . button
const decimalButton = document.createElement("button");
decimalButton.innerText = ".";
decimalButton.className = "dot";
decimalButton.value = ".";
bottomRow.appendChild(decimalButton);

decimalButton.addEventListener("click", (element) => {

    if ((!inputArray.xDot || !inputArray.yDot) && inputArray.dotTotal < 2) {
        // lhs
        if (!inputArray.xDot && !inputArray.xCount) {
            inputArray.xDot = true;
            inputArray.dotTotal++;
            populateInputArray(".", true, false);
            console.log("1a", inputArray.dotTotal)
        }
        // rhs
        else if (!inputArray.yDot && inputArray.xCount) {
            inputArray.dotTotal = 2;
            inputArray.yDot = true;
            populateInputArray(".", true, false);
            console.log("1b", inputArray.dotTotal);


        }

        // 2 + .2.

    }
});

// Create equals = button
const newButton = document.createElement("button");
newButton.innerText = "=";
newButton.className = "equals";
newButton.value = "=";
bottomRow.appendChild(newButton);

newButton.addEventListener("click", (e) => {
    if ((inputArray.x === "" || inputArray.y === "") && !inputArray.answerExists) {
        e.preventDefault();
        console.log("prevent default equals button")
    } else {
        console.log(`${e.target.value} was clicked`);
        inputArray.equalsCount += 1;
        console.log("= count", inputArray);
        populateInputArray("", false, true);
    }

});

// Create clear button
const clearButton = document.createElement("button");
clearButton.innerText = "A/C";
clearButton.className = "A/C";
clearButton.value = "A/C";
operators.appendChild(clearButton);

clearButton.addEventListener("click", (e) => {
    clear();
});

document.querySelector("body").addEventListener("keydown", (e) => {
    const ifValidKey = simulateClick(e.key);
    if (ifValidKey) {
        const buttonStyle = "." + styleButtons[simulateClick(e.key)];
        document.querySelector(buttonStyle).style = "background:lightgray; background-color: lightgray; transform: translateY(3px) translateX(3px); box-shadow: inset 2px 2px #666;";
        
    } else if (e.key === "Enter") {
        document.querySelector(".equals").style = "background:lightgray; background-color: lightgray; transform: translateY(3px) translateX(3px); box-shadow: inset 2px 2px #666;";
        e.preventDefault();
    }
});

document.querySelector("body").addEventListener("keyup", (e) => {
    const ifValidKey = simulateClick(e.key);
    if (ifValidKey) {
        const buttonStyle = "." + styleButtons[simulateClick(e.key)];
        document.querySelector(buttonStyle).style = "background:#f0f0f0";
        document.querySelector(buttonStyle).click();

    } else if (e.key === "Enter") {
        document.querySelector(".equals").style = "background:#f0f0f0";
        document.querySelector(".equals").click();
    }
});


function simulateClick(key) {
    const filteredKey = digitsArray.filter(element => element === key);
    if (filteredKey.length) {
        return filteredKey;
    }
}


function setDecimalPoint(number, decimalPoints) {
    if (!checkIfInteger(number)) {
        console.log("num with decimals: ", number);
        return Math.round(number * 10 ** decimalPoints) / 10 ** decimalPoints;
    } else {
        console.log("num integer: ", number);
        return number;
    }
}

function checkIfInteger(number) {
    return Math.round(number) - number === 0;
}