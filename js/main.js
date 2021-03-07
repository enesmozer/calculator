const calculate = (n1, operator, n2) => {
  let result = 0;
  n1 = parseFloat(n1);
  n2 = parseFloat(n2);
  switch (operator) {
    case "add":
      result = n1 + n2;
      break;
    case "subtract":
      result = n1 - n2;
      break;
    case "multiply":
      result = n1 * n2;
      break;
    case "divide":
      result = n1 / n2;
      break;
    default:
      return result;
  }
  isOperation = true;
  return result;
};

let number = 0;

const display = document.querySelector(".calculator-screen");
const calculator = document.querySelector(".calculator");
const clear = document.getElementById("clear");

let isOperation = false;
let isOperator = false;
const updateResult = (value) => {
  display.innerText = value;
};

updateResult(0);

document.querySelector(".calculator").addEventListener("click", (e) => {
  const el = e.target;
  const displayedNum = display.textContent;

  let pressedKey = el.dataset.key;

  Array.from(el.parentNode.children).forEach((k) =>
    k.classList.remove("clicked")
  );

  if (displayedNum === "0") {
    clear.innerText = "C";
  }
  //debugger;
  if (!isNaN(pressedKey)) {
    if (displayedNum === "0" || isOperation) {
      number = pressedKey;
    } else {
      number = number + pressedKey;
    }
    isOperation = false;
    isOperator = true;
  }
  debugger;
  if (
    pressedKey === "add" ||
    pressedKey === "subtract" ||
    pressedKey === "multiply" ||
    pressedKey === "divide"
  ) {
    const firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    const secondValue = displayedNum;
    if (firstValue && operator && isOperator) {
      const calcValue = calculate(firstValue, operator, secondValue);
      number = calcValue;
      calculator.dataset.firstValue = calcValue;
    } else {
      calculator.dataset.firstValue = displayedNum;
    }
    calculator.dataset.operator = pressedKey;
    isOperation = true;
    isOperator = false;
  }
  debugger;
  switch (pressedKey) {
    case "clear":
      number = 0;
      calculator.dataset.firstValue = "";
      calculator.dataset.operator = "";
      calculator.dataset.modValue ="";
      clear.innerText = "AC";
      break;
    case "reverse":
      number = calculate(number, "multiply", -1);
      break;
    case "percent":
      number = calculate(number, "multiply", 0.01);
      break;
    case "decimal":
      if (!displayedNum.includes(".")) {
        number = number + ".";
      } else if (isOperation) {
        number = "0.";
        isOperation = false;
      }
      break;
    case "equal":
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      let secondValue = displayedNum;
      if (firstValue) {
        if (isOperator) {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }
        number = calculate(firstValue, operator, secondValue);
      }
      calculator.dataset.modValue = secondValue;
      isOperation = true;
      isOperator = false;
      break;
  }

  updateResult(number);
  el.classList.add("clicked");
});
