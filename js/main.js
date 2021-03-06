const calculate = (n1, operator, n2) => {
  let result = 0;
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
  console.log(result);
  return result;
};

let number = 0;

const display = document.querySelector(".screen");
const calculator = document.querySelector(".calculator");

const updateResult = (value) => {
  display.innerText = value;
};

updateResult(0);

document.querySelector(".calculator").addEventListener("click", (e) => {
  const el = e.target;
  const previousKeyType = calculator.dataset.previousKeyType;
  const displayedNum = display.textContent
  let pressedKey = el.dataset.key;
  el.classList.remove("clicked");
  //debugger;
  if (!isNaN(pressedKey)) {
    debugger;
    if (displayedNum === '0' || previousKeyType === 'operator') {
      number = pressedKey
    } else {
      number = number + pressedKey
    }
  }

  switch (pressedKey) {
    case "clear":
      number = 0;
      break;
    case "reverse":
      number = number * -1;
      break;
    case "percent":
      number = number * 0.01;
      break;
    case "decimal":
      number = number + ".";
      break;
    case "equal":
      const firstValue = parseFloat(calculator.dataset.firstValue);
      const operator = calculator.dataset.operator;
      const secondValue = parseFloat(number);
      number = calculate(firstValue, operator, secondValue);
      //updateResult(number);
  }
  if (
    pressedKey === "add" ||
    pressedKey === "subtract" ||
    pressedKey === "multiply" ||
    pressedKey === "divide"
  ) {
    el.classList.add("clicked");
    calculator.dataset.previousKeyType = "operator";
    calculator.dataset.firstValue = number;
    calculator.dataset.operator = pressedKey;
  }
  updateResult(number);
  el.classList.add("clicked");
});
