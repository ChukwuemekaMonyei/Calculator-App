document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.querySelector('.input-box input');
    const buttons = document.querySelectorAll('button');
    let currentValue = '';
    let storedValue = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.value;

            if (value === 'clear') {
                currentValue = '';
                storedValue = '';
                operator = '';
                inputField.value = '0';
            } else if (value === 'BACKSPC') {
                currentValue = currentValue.slice(0, -1);
                inputField.value = currentValue || '0';
            } else if (value === 'equal') {
                if (operator && storedValue) {
                    currentValue = evaluate(storedValue, currentValue, operator);
                    inputField.value = currentValue;
                    storedValue = '';
                    operator = '';
                }
            } else if (isOperator(value)) {
                if (currentValue) {
                    if (storedValue) {
                        storedValue = evaluate(storedValue, currentValue, operator);
                    } else {
                        storedValue = currentValue;
                    }
                    operator = value;
                    currentValue = '';
                }
            } else {
                currentValue += value;
                inputField.value = currentValue;
            }
        });
    });

    function isOperator(value) {
        return ['+', '-', '*', '/', '%'].includes(value);
    }

    function evaluate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);

        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            case '%':
                return a % b;
            default:
                return b;
        }
    }
});
