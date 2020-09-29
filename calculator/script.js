class Calculator {
    constructor(previousOperandDisplay, currentOperandDisplay) {
        this.previousOperandDisplay = previousOperandDisplay
        this.currentOperandDisplay = currentOperandDisplay
        this.clear()
    }

    clear() {
        this.previousOperand = ''
        this.currentOperand = ''
        this.operator = undefined
        this.operandJustComputedState = false
    }

    delete() {
        if (this.operandJustComputedState) {
            this.operandJustComputedState = false
        }

        if (this.currentOperand == '') {
            this.currentOperand = String(this.previousOperand).slice(0, -1)
            this.previousOperand = ''
        }
        this.currentOperand = String(this.currentOperand).slice(0, -1)
    }

    appendNumber(number) {
        if (this.operandJustComputedState) {
            this.currentOperand = String(number)
            this.operandJustComputedState = false
            return
        }
        if (String(this.currentOperand).includes('.') && number == '.') return
        this.currentOperand = String(this.currentOperand) + String(number)
    }

    chooseOperation(operation) {
        if (this.operandJustComputedState) {
            this.operandJustComputedState = false
        }
        this.operation = operation
        if (this.previousOperand.includes('+') ||
            this.previousOperand.includes('-') ||
            this.previousOperand.includes('*') ||
            this.previousOperand.includes('÷')) {
                this.previousOperand = this.previousOperand.slice(0,-2) + ' ' + this.operation
        }
        else this.previousOperand = this.currentOperand + ' ' + this.operation
        this.currentOperand = ''
    }

    compute() {
        if (this.operation == '+') {
            this.currentOperand = +this.previousOperand.slice(0,-1) + +this.currentOperand
            this.previousOperand = ''
            this.operandJustComputedState = true
        }

        if (this.operation == '÷') {
            this.currentOperand = +this.previousOperand.slice(0,-1) / +this.currentOperand
            this.previousOperand = ''
            this.operandJustComputedState = true
        }

        if (this.operation == '*') {
            this.currentOperand = +this.previousOperand.slice(0,-1) * +this.currentOperand
            this.previousOperand = ''
            this.operandJustComputedState = true
        }

        if (this.operation == '-') {
            this.currentOperand = +this.previousOperand.slice(0,-1) - +this.currentOperand
            this.previousOperand = ''
            this.operandJustComputedState = true
        }
    }

    updateDisplay() {
        this.currentOperandDisplay.innerText = this.currentOperand
        this.previousOperandDisplay.innerText = this.previousOperand
    }

}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')

const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')

const previousOperandDisplay = document.querySelector('[data-previous-operand]')
const currentOperandDisplay = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandDisplay, currentOperandDisplay)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.textContent)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.textContent)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})