function CalucatorFunction() {
  const inputParam1 = document.getElementById("param_1").value;
  const inputParam2 = document.getElementById("param_2").value;

  const operation = document.getElementById("operation").value;
  let output = 0;
  switch (operation) {
    case "Add":
      output = add(inputParam1, inputParam2);
      break;

    case "Substract":
      output = subtraction(inputParam1, inputParam2);
      break;

    case "Multiply":
      output = multiplication(inputParam1, inputParam2);
      break;

    case "Division":
      output = division(inputParam1, inputParam2);
      break;
  }

  document.getElementById("result").innerText = output;
}

function add(a = 0, b = 0) {
  return Number(Number(a) + Number(b));
}

function subtraction(a, b) {
  return Number(Number(a) - Number(b));
}

function multiplication(a, b) {
  return Number(Number(a) * Number(b));
}

function division(a, b) {
  return Number(Number(a) / Number(b));
}
