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

        // state for differentiating how appendNumber and chooseOperation
        // should behave if currentOperand is a result of compute
        this.operandJustComputedState = false
    }

    delete() {
        if (this.operandJustComputedState) {
            this.operandJustComputedState = false
        }

        if (this.currentOperand === '') {
            this.currentOperand = String(this.previousOperand).slice(0, -1)
            this.previousOperand = ''
        }

        this.currentOperand = String(this.currentOperand).slice(0, -1)
    }

    appendNumber(number) {
        // don't append number, if currentOperand is a result of compute
        if (this.operandJustComputedState || this.currentOperand === 'ERROR') {
            this.currentOperand = String(number)
            this.operandJustComputedState = false
            return
        }

        if (String(this.currentOperand).includes('.') && number === '.') return
        this.currentOperand = String(this.currentOperand) + String(number)
    }

    chooseOperation(operation) {
        if (this.currentOperand === 'ERROR') {
            this.currentOperand = ''
            return
        }

        if (this.operandJustComputedState) {
            this.operandJustComputedState = false
        }

        if (this.previousOperand !== '') {
            this.compute()
        }

        this.operation = operation
        
        if (this.operation === '√' ) {
            this.compute()
            return
        }

        if ((this.previousOperand.includes('+') ||
            this.previousOperand.includes('-') ||
            this.previousOperand.includes('√') ||
            this.previousOperand.includes('^') ||
            this.previousOperand.includes('*') ||
            this.previousOperand.includes('÷')) && 
            (this.currentOperand === '')) {
                this.previousOperand = 
                    this.previousOperand.slice(0,-2) + ' ' + this.operation
                return
        }

        if (this.currentOperand === '') return

        this.previousOperand = this.currentOperand + ' ' + this.operation
        this.currentOperand = ''
    }
    
    changeSign() {
        if (this.currentOperand) this.currentOperand = -+this.currentOperand
    }

    compute() {
        function floatify(number){
            return parseFloat((number).toFixed(10))
    }

        switch (this.operation) {
            case '√':
                if (+this.currentOperand < 0) {
                    this.currentOperand = 'ERROR'
                    return
                }
                this.currentOperand = Math.sqrt(+this.currentOperand)
                this.previousOperand = ''
                this.operandJustComputedState = true
                break
            case '^':
                this.currentOperand = 
                    floatify((+this.previousOperand.slice(0,-1)) ** +this.currentOperand)
                this.previousOperand = ''
                this.operandJustComputedState = true
                break
            case '+':
                this.currentOperand = 
                    floatify(+this.previousOperand.slice(0,-1) + +this.currentOperand)
                this.previousOperand = ''
                this.operandJustComputedState = true
                break
            case '-':
                this.currentOperand = 
                    floatify(+this.previousOperand.slice(0,-1) - +this.currentOperand)
                this.previousOperand = ''
                this.operandJustComputedState = true
                break
            case '*':
                this.currentOperand = 
                    floatify(+this.previousOperand.slice(0,-1) * +this.currentOperand)
                this.previousOperand = ''
                this.operandJustComputedState = true
                break
            case '÷':
                this.currentOperand = 
                    floatify(+this.previousOperand.slice(0,-1) / +this.currentOperand)
                this.previousOperand = ''
                this.operandJustComputedState = true
                break
            default:
                return
        }
    }

    updateDisplay() {
        this.currentOperandDisplay.innerText = this.currentOperand
        this.previousOperandDisplay.innerText = this.previousOperand
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')

const changeSign = document.querySelector('[data-change-sign]')
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

changeSign.addEventListener('click', button => {
    calculator.changeSign()
    calculator.updateDisplay()
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