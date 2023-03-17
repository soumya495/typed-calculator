const previousOperandText = document.querySelector('[data-previous]') as HTMLParagraphElement;
const currentOperandText = document.querySelector('[data-current]') as HTMLParagraphElement;
const clearBtn = document.querySelector('[data-clear]') as HTMLButtonElement;
const deleteBtn = document.querySelector('[data-delete]') as HTMLButtonElement;
const equalsBtn = document.querySelector('[data-equals]') as HTMLButtonElement;
const operators = document.querySelectorAll<HTMLButtonElement>('[data-operator]');
const numbers = document.querySelectorAll<HTMLButtonElement>('[data-number]');

class Calculator {
    // DOM elements to display previous and current operand
    previousOperandElement: HTMLParagraphElement;
    currentOperandElement: HTMLParagraphElement;
    // Variables to store previous and current operand
    previousOperand: string;
    currentOperand: string;
    // Keep track of operation to be performed
    operator: string | undefined;

    constructor(previousOperandElement: HTMLParagraphElement, currentOperandElement: HTMLParagraphElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.previousOperand = '';
        this.currentOperand = '';
        this.operator = undefined;
    }

    // Form number from user input
    appendNumber(num: string) {
        // Allow single decimal-point(.) in the number
        if (this.currentOperand.includes('.') && num === '.') return;
        this.currentOperand += num;
        // Display current operand
        this.currentOperandElement.innerHTML = this.currentOperand;
    }

    // Choose what operation to perform
    chooseOperation(operator: string) {
        // No current operand is selected
        if (this.currentOperand === '') return
        if (this.currentOperand) {
            this.compute();
        }
        this.operator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.currentOperandElement.innerHTML = '';
        this.previousOperandElement.innerHTML = this.previousOperand + ' ' + this.operator;
    }

    // Compute the result
    compute() {
        if (this.previousOperand === '' ||
            this.currentOperand === '' ||
            this.operator === undefined) return;
        let result;
        const num1 = parseFloat(this.previousOperand);
        const num2 = parseFloat(this.currentOperand);

        switch (this.operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '÷':
                result = num1 / num2;
                break;
            default:
                return;
        }

        console.log('Result ', result);

        this.previousOperandElement.innerHTML = '';
        this.currentOperandElement.innerHTML = result.toString();
        this.currentOperand = result.toString();
        this.previousOperand = '';
        this.operator = undefined;
    }

}

const calc = new Calculator(previousOperandText, currentOperandText);

// Event Listeners
numbers.forEach((number) => {
    number.addEventListener('click', () => {
        calc.appendNumber(number.innerText);
    })
})

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        calc.chooseOperation(operator.innerText);
    })
})

equalsBtn.addEventListener('click', () => {
    calc.compute()
})