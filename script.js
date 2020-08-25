class Number {
    constructor(previousDisplay, currentDisplay) {
        this.currentNumber = " ";
        this.previousNumber = " ";
        this.operator= " ";
        this.previousDisplay = previousDisplay;
        this.currentDisplay = currentDisplay;
    }

    appendNumber(number) {
        this.currentNumber = this.currentNumber.toString() + number; 
        this.currentDisplay.innerHTML = this.currentNumber;   
    }

    chooseOperation(operator) {
        if(this.previousNumber != " " && this.currentNumber != " ") {
            this.operator = operator;
            this.calculate();
        } else {
            this.operator = operator;
            this.previousNumber = this.currentNumber;
            this.currentNumber = " ";
        }
    }

    calculate() {
        let previous = parseInt(this.previousNumber);
        let actual = parseInt(this.currentNumber);
        let result;
        switch(this.operator) {
            case "+":
                result = previous + actual;
                break;
            case "-":
                result = previous - actual;
                break;
            case "*":
                result = previous * actual;
                break;
            case "/":
                result = previous / actual;
                break;
        }
        console.log("Resul", result);
        this.previousNumber = " ";
        this.operator = " ";
        this.currentNumber = result;
    }
}


const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const previousDisplay = document.querySelector("#previous-number");
const currentDisplay = document.querySelector("#current-number");

obj = new Number(previousDisplay, currentDisplay);

numbers.forEach(number => {
    number.addEventListener("click", () => {
        obj.appendNumber(number.value);
    })
})


operators.forEach(operator => {
    operator.addEventListener("click", () => {
        if(operator.value === "=") {
            obj.calculate();
        } else {
            obj.chooseOperation(operator.value);
        }
    })
})





