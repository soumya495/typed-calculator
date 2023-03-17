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
    // Keep track of error
    error: boolean;

    constructor(previousOperandElement: HTMLParagraphElement, currentOperandElement: HTMLParagraphElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.previousOperand = '';
        this.currentOperand = '';
        this.operator = undefined;
        this.error = false;
    }

    // Form number from user input
    appendNumber(num: string) {
        // If Error is there, remove and proceed
        if (this.error) {
            this.clear();
        }
        // Allow single decimal-point(.) in the number
        if (this.currentOperand.includes('.') && num === '.') return;
        this.currentOperand += num;
        // Display current operand
        this.currentOperandElement.innerHTML = this.currentOperand;
    }

    // Choose what operation to perform
    chooseOperation(operator: string) {
        // Do not proceed with Error
        if (this.error) return;
        // No current operand is selected
        if (this.currentOperand === '') return
        // Choosing operation without equals button
        // Compute and then add the operator
        if (this.previousOperand && this.currentOperand) {
            this.compute();
            if (this.error) return;
        }
        this.operator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.currentOperandElement.innerHTML = '';
        this.previousOperandElement.innerHTML = this.previousOperand + ' ' + this.operator;
    }

    // Compute the result
    compute() {
        // No operand or operator is selected
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

        if (isNaN(result) || !isFinite(result)) {
            this.error = true;
            this.currentOperandElement.innerHTML = 'ERROR'
            this.previousOperandElement.innerHTML = ''
            this.previousOperand = '';
            this.currentOperand = '';
            this.operator = undefined;
            return;
        }

        this.previousOperandElement.innerHTML = '';
        this.currentOperandElement.innerHTML = result.toString();
        this.currentOperand = result.toString();
        this.previousOperand = '';
        this.operator = undefined;
    }

    // Remove single digit from end
    deleteNum() {
        if (this.error) {
            this.clear();
        }
        this.currentOperand = this.currentOperand.slice(0, -1);
        this.currentOperandElement.innerHTML = this.currentOperand;
    }

    // reset the display
    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operator = undefined;
        this.error = false;
        this.currentOperandElement.innerHTML = ''
        this.previousOperandElement.innerHTML = ''
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

deleteBtn.addEventListener('click', () => {
    calc.deleteNum()
})

clearBtn.addEventListener('click', () => {
    calc.clear()
})