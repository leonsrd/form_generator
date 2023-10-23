const optionsList = document.getElementById("optionsList");
const inputLabel = document.getElementById("inputLabel");
const formFields = document.getElementById("mainForm");
const saveButton = document.getElementById("submitBtn");
const addToMemoryContainer = document.getElementById("addToMemoryContainer");

let fieldCounter = 0;

//Checking if there is a label field and calling the addTextField function
function addField() {
  if (inputLabel.value !== "") {
    addTextField(inputLabel.value);
    inputLabel.value = "";
  } else {
    alert("Please fill in an input label");
  }
}

// Show or hide select input fields depending on input mode (text/select)
function optionChange(value) {
  const textBtn = document.getElementById("addFieldButton");
  const newOption = document.getElementById("newOption");
  inputLabel.value = "";

  if (value === "select") {
    textBtn.style.display = "none";
    newOption.style.display = "block";
  } else {
    textBtn.style.display = "inline";
    newOption.style.display = "none";
  }
}

// Add new option to selection field
let options = [];
function addOption() {
  const optionText = document.getElementById("newInput");

  if (optionText.value !== "") {
    options.push(optionText.value);
    optionText.value = "";
    optionsList.textContent = options;
  } else {
    alert("Please fill in an option text");
  }
}

// Remove added option form selection field
function removeOption() {
  options.pop();
  optionsList.textContent = options;
}

// Add text field to form
function addTextField(label) {
  const div = document.createElement("div");
  div.id = "newField";
  div.innerHTML = `
  <label class='newLabel' id='label${fieldCounter}'  for="${label}">${label}</label>
  <input class='newInput' type="text" id="input${fieldCounter}" required>
  <button id='btn${fieldCounter}' type="button" class="rmBtn" onclick="removeField(this)"><img id='delX' src="./images/delX.png" /></button>`;
  formFields.insertBefore(div, addToMemoryContainer);

  fieldCounter++;
}

// Add select field to form
function addSelectionField() {
  const inputLabel = document.getElementById("inputLabel");
  let optionsString = "";

  if (options.length < 2 || inputLabel.value === "") {
    alert("You need to add at least 2 options and fill an Input Label");
  } else {
    const div = document.createElement("div");
    div.id = "newField";

    for (let i = 0; i < options.length; i++) {
      optionsString += `<option value="${options[i]}">${options[i]}</option>`;
    }

    div.innerHTML = `<label class='newLabel' id='label${fieldCounter}' ">${inputLabel.value}</label>
    <select id="input${fieldCounter}">
    ${optionsString}
    </select>
    <button id='btn${fieldCounter}' type="button" class="rmBtn" onclick="removeField(this)"><img id='delX' src="./images/delX.png" /></button>`;

    formFields.insertBefore(div, addToMemoryContainer);
    inputLabel.value = "";
    options = [];
    optionsList.textContent = options;
    fieldCounter++;
  }
}

// Remove added field from the form
function removeField(button) {
  button.parentElement.remove();
}

// Save form data on form submission
formFields.addEventListener("submit", (e) => {
  e.preventDefault();

  if (fieldCounter > 0) {
    const table = document.getElementById("dataTable");
    const thead = table.querySelector("thead");
    thead.innerHTML = "";
    const trHead = document.createElement("tr");
    const tbody = table.querySelector("tbody");
    tbody.innerHTML = "";
    const trBody = document.createElement("tr");
    table.style.display = "block";
    const addToMemory = document.getElementById("addToMemory");
    let currentFields = [];

    for (i = 0; i < fieldCounter; i++) {
      let label = "label" + i;
      let input = "input" + i;
      let btn = "btn" + i;

      const fieldLabel = document.getElementById(label);
      const fieldValue = document.getElementById(input);
      const curBtn = document.getElementById(btn);

      const th = document.createElement("th");
      th.textContent = fieldLabel.textContent;
      trHead.appendChild(th);

      const td = document.createElement("td");
      td.textContent = fieldValue.value;
      trBody.appendChild(td);

      if (addToMemory.checked) {
        let currentField = {
          fieldNumber: i,
          fieldLabel: fieldLabel.textContent,
          fieldValue: fieldValue.value,
        };
        currentFields.push(currentField);
      }
      fieldLabel.remove();
      fieldValue.remove();
      curBtn.remove();
    }

    if (currentFields.length > 0) {
      let num = Math.floor(Math.random() * 1000 + 1);

      for (i = 0; i < currentFields.length; i++) {
        currentFields[i].formID = num;
      }
      localStorage.setItem("formId:" + num, JSON.stringify(currentFields));
      checkLocalStorage();
    }

    thead.appendChild(trHead);
    tbody.appendChild(trBody);
    fieldCounter = 0;
  }
});

document.addEventListener("DOMContentLoaded", checkLocalStorage());
// Check local storage for saved data, and list them through a select field
function checkLocalStorage() {
  if (localStorage.length > 0) {
    const savedTables = document.getElementById("savedTables");
    savedTables.style.display = "block";
    let optionsString = "";
    for (let i = 0; i < localStorage.length; i++) {
      optionsString += `<option value="${localStorage.key(
        i
      )}">${localStorage.key(i)}</option>`;
    }
    savedTables.innerHTML = `
    <h3>Saved forms</h3>

    <label class='newLabel' ">Show Form:</label>
    <select onchange="updateForm(this.value)" id="savedFormsList">
    ${optionsString}
    </select>
    <table id="savedTable">
    <thead>
    </thead>
    <tbody>
    </tbody>
  </table>`;

    const formOption = document.getElementById("savedFormsList");
    updateForm(formOption.value);
  }
}

// Update the visible saved form to the one selected from the user
function updateForm(formValue) {
  const savedTable = document.getElementById("savedTable");
  const thead = savedTable.querySelector("thead");
  thead.innerHTML = "";
  const trHead = document.createElement("tr");
  const tbody = savedTable.querySelector("tbody");
  tbody.innerHTML = "";
  const trBody = document.createElement("tr");
  const form = JSON.parse(localStorage.getItem(formValue));

  for (let i = 0; i < form.length; i++) {
    const th = document.createElement("th");
    th.textContent = form[i].fieldLabel;
    trHead.appendChild(th);

    const td = document.createElement("td");
    td.textContent = form[i].fieldValue;
    trBody.appendChild(td);
  }
  thead.appendChild(trHead);
  tbody.appendChild(trBody);
}
