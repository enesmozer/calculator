/* eslint-disable no-restricted-globals */
// #region  Variables
let number = 0;
const display = document.querySelector('.calculator-screen');
const calc = document.querySelector('.calculator');
const clear = document.getElementById('clear');
const keyTypes = Object.freeze({
  OPERATOR: 'operator',
  EQUAL: 'equal',
  NUMBER: 'number',
  CLEAR: 'clear',
  DECIMAL: 'decimal',
  REVERSE: 'reverse',
  PERCENT: 'percent',
});

const operators = Object.freeze({
  ADD: 'add',
  SUBTRACT: 'subtract',
  MULTIPLY: 'multiply',
  DIVIDE: 'divide',
});
// #region Methods
const calculate = (n1, operator, n2) => {
  let result = 0;
  const operand1 = parseFloat(n1);
  const operand2 = parseFloat(n2);
  switch (operator) {
    case 'add':
      result = operand1 + operand2;
      break;
    case 'subtract':
      result = operand1 - operand2;
      break;
    case 'multiply':
      result = operand1 * operand2;
      break;
    case 'divide':
      result = operand1 / operand2;
      break;
    default:
      return result;
  }
  return result;
};
const getKeyType = (key) => {
  if (
    key === operators.ADD ||
    key === operators.SUBTRACT ||
    key === operators.MULTIPLY ||
    key === operators.DIVIDE
  )
    return keyTypes.OPERATOR;
  return key;
};
const createResultString = (pressedKey, displayedNum, state) => {
  const keyType = getKeyType(pressedKey);
  const { firstValue, operator, modValue, previousKeyType } = state;

  if (!isNaN(keyType)) {
    return displayedNum === '0' ||
      previousKeyType === keyTypes.OPERATOR ||
      previousKeyType === keyTypes.EQUAL
      ? pressedKey
      : number + pressedKey;
  }

  if (keyType === keyTypes.DECIMAL) {
    if (!displayedNum.includes('.')) return `${displayedNum}.`;
    if (previousKeyType === keyTypes.OPERATOR || previousKeyType === keyTypes.EQUAL) {
      return '0.';
    }
    return displayedNum;
  }

  if (pressedKey === keyTypes.CLEAR) {
    return 0;
  }
  if (keyType === keyTypes.REVERSE) {
    return calculate(number, 'multiply', -1);
  }

  if (keyType === keyTypes.PERCENT) {
    return calculate(number, 'multiply', 0.01);
  }

  if (keyType === keyTypes.OPERATOR) {
    return firstValue &&
      operator &&
      previousKeyType !== keyTypes.OPERATOR &&
      previousKeyType !== keyTypes.EQUAL
      ? calculate(firstValue, operator, displayedNum)
      : displayedNum;
  }

  if (keyType === keyTypes.EQUAL) {
    if (firstValue) {
      return previousKeyType === keyTypes.EQUAL
        ? calculate(displayedNum, operator, modValue)
        : calculate(firstValue, operator, displayedNum);
    }
    return displayedNum;
  }
  return displayedNum;
};

const updateCalculatorState = (pressedKey, calculator, calculatedValue, displayedNum) => {
  const keyType = getKeyType(pressedKey);
  const cal = calculator;
  const { firstValue, operator, modValue, previousKeyType } = calculator.dataset;

  cal.dataset.previousKeyType = keyType;

  if (keyType === keyTypes.OPERATOR) {
    cal.dataset.operator = pressedKey;
    cal.dataset.firstValue =
      firstValue &&
      operator &&
      previousKeyType !== keyTypes.OPERATOR &&
      previousKeyType !== keyTypes.EQUAL
        ? calculatedValue
        : displayedNum;
  }

  if (keyType === keyTypes.EQUAL) {
    cal.dataset.modValue =
      firstValue && previousKeyType === keyTypes.EQUAL ? modValue : displayedNum;
  }

  if (keyType === keyTypes.CLEAR && clear.innerText === 'AC') {
    cal.dataset.firstValue = '';
    cal.dataset.modValue = '';
    cal.dataset.operator = '';
    cal.dataset.previousKeyType = '';
  }
};

const updateResult = (value, button = null) => {
  if (button) {
    const keyType = getKeyType(button.dataset.key);
    Array.from(button.parentNode.children).forEach((k) => k.classList.remove('clicked'));
    if (keyType === keyTypes.OPERATOR) button.classList.add('clicked');
    if (keyType === keyTypes.CLEAR && clear.innerText !== 'AC') clear.innerText = 'AC';
    if (keyType !== keyTypes.CLEAR) {
      clear.innerText = 'CE';
    }
  }
  display.innerText = value;
};

updateResult(0);

// #region Event

document.querySelector('.calculator').addEventListener('click', (e) => {
  const button = e.target;
  const displayedNum = display.textContent;
  const pressedKey = button.dataset.key;
  number = createResultString(pressedKey, displayedNum, calc.dataset);
  updateCalculatorState(pressedKey, calc, number, displayedNum);
  updateResult(number, button);
});
