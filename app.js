const input = document.querySelector('.billinp');
const button = document.querySelectorAll('.percentage');
const custom = document.querySelector('.tipinp');
const error = document.querySelector('.error')
const people = document.querySelector('.peopleInp');
const total = document.querySelectorAll('.value');
const reset = document.getElementById('btn-reset');

let billVal = 0;
let peopleVal = 1;
let tipVal = 0.15;

input.addEventListener('input', validateBill);

function validateBill() {
  if (input.value.includes(',')) {
    input.value.replace(',', '.')
  }
  billVal = parseFloat(input.value);
  calculate()
  console.log(billVal)
}

custom.addEventListener('input', tipCustomVal);
people.addEventListener('input', setPeopleVal);
reset.addEventListener('click', handleReset);


button.forEach(percentage => {
  percentage.addEventListener('click', handleClick)
});



function handleClick(event) {
  button.forEach(percentage => {
    percentage.classList.remove('active')
    if (event.target.innerHTML === percentage.innerHTML) {
      percentage.classList.add('active');
      tipVal = parseFloat(percentage.innerHTML) / 100
      console.log(tipVal)
    }
  })
  custom.value = ''
  calculate()
}

function tipCustomVal() {
  tipVal = parseFloat(custom.value / 100)
  button.forEach(percentage => {
    percentage.classList.remove('active');
  })
  if (custom.value !== 0) {
    calculate();
  }
  console.log(tipVal)
}

function setPeopleVal() {
  peopleVal = parseFloat(people.value)
  if (peopleVal <= 0) {
    error.classList.remove('hide');
    people.classList.add('errorInp');
  }
  else {
    error.classList.add('hide');
    people.classList.remove('errorInp');
  }
  console.log(peopleVal)
  calculate()
}

function calculate() {
  if (peopleVal >= 1) {
    let tip = billVal * tipVal / peopleVal;
    let Amount = billVal * (tipVal + 1) / peopleVal;

    total[0].innerHTML = '$' + tip.toFixed(2);
    total[1].innerHTML = '$' + Amount.toFixed(2);
  }
}

function handleReset() {
  input.value = 0;
  validateBill()

  button[2].click();
  people.value = 1;
  setPeopleVal()
}