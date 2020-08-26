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
        let previous = parseFloat(this.previousNumber);
        let actual = parseFloat(this.currentNumber);
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

    updateDisplay() {
        this.currentDisplay.innerHTML = this.currentNumber;
        let temp = this.previousNumber + this.operator
        this.previousDisplay.innerHTML = temp;
    }

    reset() {
        this.currentNumber = " ";
        this.previousNumber = " ";
        this.operator = " ";
        this.updateDisplay();
    }

    deleteElement() {
        this.currentNumber = this.currentNumber.slice(0, -1);
        this.updateDisplay();
    }
}


const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const previousDisplay = document.querySelector("#previous-number");
const currentDisplay = document.querySelector("#current-number");
const options = document.querySelectorAll(".option");
const dot = document.querySelectorAll(".dot");


obj = new Number(previousDisplay, currentDisplay);

numbers.forEach(number => {
    number.addEventListener("click", () => {
        obj.appendNumber(number.value);
        obj.updateDisplay();
    })
})


operators.forEach(operator => {
    operator.addEventListener("click", () => {
        if(operator.value === "=") {
            obj.calculate();
            obj.updateDisplay();
        } else {
            obj.chooseOperation(operator.value);
            obj.updateDisplay();
        }
    })
})


options.forEach(button => {
    button.addEventListener("click", () => {
        if(button.value === "AC") {
            obj.reset();
        } else {
            obj.deleteElement();
        }
    })
})


dot.forEach(button => {
    button.addEventListener("click", () => {
        if(obj.currentNumber.includes(button.value)) {
            return
        } else {
            obj.appendNumber(button.value);
            obj.updateDisplay();
        }
    })
})




