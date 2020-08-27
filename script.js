class Number {
    constructor(previousDisplay, currentDisplay) {
        this.currentNumber = "";
        this.previousNumber = "";
        this.operator = "";
        this.resetInfo = false;
        this.previousDisplay = previousDisplay;
        this.currentDisplay = currentDisplay;
    }


    appendNumber(number) {
        if(this.curentNumber !== "" && this.previousNumber === "" && this.resetInfo) {
            this.reset()
        }

        this.currentNumber = this.currentNumber.toString() + number; 
    }


    chooseOperation(operator) {
        if(this.previousNumber != "" && this.currentNumber != "") {
            this.operator = operator;
            this.calculate();
        } else {
            this.operator = operator;
            this.previousNumber = this.currentNumber;
            this.currentNumber = "";
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
        if(isNaN(result)) {
            this.reset();
            return;
        }
        this.previousNumber = "";
        this.operator = "";
        this.currentNumber = result;
        this.resetInfo = true;
    }

    updateDisplay() {
        this.currentDisplay.innerHTML =this.createNumberFormat(this.currentNumber);
        let temp = this.createNumberFormat(this.previousNumber) + this.operator;
        this.previousDisplay.innerHTML = temp;
    }

    reset() {
        this.currentNumber = "";
        this.previousNumber = "";
        this.operator = "";
        this.resetInfo = false;
        this.updateDisplay();
    }

    deleteElement() {
        this.currentNumber = this.currentNumber.slice(0, -1);
        this.updateDisplay();
    }

    createNumberFormat(number) {
        console.log(number)
        if(number === ".") {
            return "."
        }
        let tempNumber = parseFloat(number);
        if(isNaN(tempNumber)) {
            return "";
        }

        let integerNumbers = number.toString().split(".")[0]

        if(number.toString().includes(".")) {
            let decimalNumbers = number.toString().split(".")[1]
            return integerNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + decimalNumbers;

        } else {
            return integerNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
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
            if(obj.previousNumber == " " || obj.curentNumber == " ") {
                obj.reset();
                return;
            } else {
                obj.calculate();
                obj.updateDisplay();
            }
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

