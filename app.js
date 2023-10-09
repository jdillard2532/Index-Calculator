const height = document.querySelectorAll(".height");
const weight = document.querySelectorAll(".weight");
const weightp = document.querySelector(".weightP");
const metricRadio = document.querySelector("#metricRadio");
const imperialRadio = document.querySelector("#imperialRadio");
const metricId = document.querySelector("#metricId");
const metricId2 = document.querySelector("#metricId2");
const imperialDiv = document.querySelector(".imperialDiv");
const imperialSpan = document.querySelectorAll(".imperialSpan");
const metricSpan = document.querySelectorAll(".metricSpan");
const resultsbtn = document.querySelector("#resultsBtn");
const bmiResults = document.querySelector("#bmiResults");
const introDiv = document.querySelector(".introDiv");
const bmiDiv = document.querySelector(".bmiDiv");
const bmiInfo = document.querySelector(".bmiInfo");
const range = document.querySelector(".range");
const classification = document.querySelector(".classification");
const imperialWeight2 = document.querySelector("#imperialWeight2");
const imperialWeight = document.querySelector("#imperialWeight");
const allInputs = document.querySelectorAll("input").forEach((item) => {
  item.addEventListener("keyup", (e) => {
    results(e);
  });
});
const inputList = document.querySelectorAll("input");
const metricGrid = document.querySelectorAll(".metricGrid");

weight.value = "";
height.value = "";

metricRadio.addEventListener("click", (e) => {
  clearInput();
  imperialDiv.style.display = "none";
  for (let x of metricSpan) {
    x.style.display = "inline";
  }
  for (let x of imperialSpan) {
    x.style.display = "none";
  }

  weightp.style.display = "block";

  changeGridWidth();
});

imperialRadio.addEventListener("click", (e) => {
  clearInput();

  imperialDiv.style.display = "grid";
  weightp.style.display = "block";
  for (let x of imperialSpan) {
    x.style.display = "inline";
  }
  for (let x of metricSpan) {
    x.style.display = "none";
  }

  weightp.style.display = "none";

  changeGridWidth();
});

//************ FUNCTIONS FUNCTIONS FUNCTIONS ********************

function clearInput() {
  for (let x of height) {
    x.value = "";
  }
  for (let x of weight) {
    x.value = "";
  }
  introDiv.style.display = "block";
  bmiDiv.style.display = "none";
  bmiInfo.style.display = "none";

  bmiResults.textContent = "";
} //Clears all inputs

function results() {
  if (metricRadio.checked === true) {
    if (checkInputs() === true) {
      let result =
        (metricId2.value / (metricId.value * metricId.value)) * 10000;
      numberValidation(result);
    }
  }

  if (imperialRadio.checked === true) {
    if (checkInputs() === true) {
      let imperialH = metricId.value * 12 + parseInt(metricId2.value);
      let imperialW =
        imperialWeight.value * 14 + parseInt(imperialWeight2.value);
      let result = (imperialW / (imperialH * imperialH)) * 703;
      numberValidation(result);
    }
  }
} // calculations + display of results

function checkInputs() {
  for (let input of inputList) {
    if ((input.value = "")) {
      return false;
    } else {
      introDiv.style.display = "none";
      bmiDiv.style.display = "block";
      bmiInfo.style.display = "block";
      return true;
    }
  }
} //clear all inputs

function numberValidation(result) {
  if (isNaN(result)) {
    introDiv.style.display = "block";
    bmiDiv.style.display = "none";
    bmiInfo.style.display = "none";
  } else {
    bmiResults.innerText = result.toFixed(1);
    bmiResultsFunction(result);
  }
} //check to make sure calculation is a number

function bmiResultsFunction(bmi) {
  let results = "";
  if (bmi < 18.5) {
    results = "Underweight";
  }

  if (bmi > 18.6 && bmi < 24.9) {
    results = "Healthy";
  }

  if (bmi > 25 && bmi < 29.9) {
    results = "Overweight";
  }

  if (bmi > 30) {
    results = "Obese";
  }
  classification.innerText = results;
  rangeCalculation();
} // returns bmi information

function rangeCalculation() {
  if (metricRadio.checked === true) {
    let metricHeight = metricId.value * metricId.value;
    let bmiLow = (metricHeight * 18.5) / 10000;
    let bmiHi = (metricHeight * 24.9) / 10000;
    let final = `${bmiLow.toFixed(1)}kgs - ${bmiHi.toFixed(1)}kgs`;
    range.textContent = final;
  }

  if (imperialRadio.checked === true) {
    let value = parseInt(metricId.value * 12) + parseInt(metricId2.value);
    let metricHeight = value * value;
    let calc = (18.5 / 703) * metricHeight;
    let stone = Math.floor(calc / 14);
    let pounds = Math.floor((calc / 14 - stone) * 14);

    let calcH = (24.9 / 703) * metricHeight;
    let stone2 = Math.floor(calcH / 14);
    let pounds2 = Math.floor((calcH / 14 - stone2) * 14);

    let final = `${stone}st ${pounds}lb - ${stone2}st ${pounds2}lb`;
    range.textContent = final;
  }
}

function changeGridWidth() {
  if (metricRadio.checked === true && window.innerWidth <= 375) {
    metricGrid[1].classList.replace("metricGrid", "updatedWidth");
    console.log(metricGrid[1].classList);
  }

  if (
    imperialRadio.checked === true &&
    metricGrid[1].classList.value === "updatedWidth"
  ) {
    metricGrid[1].classList.replace("updatedWidth", "metricGrid");
  }
} // change width of the first second 'metricGrid Class';
