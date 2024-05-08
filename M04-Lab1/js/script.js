let $ = (id) => {
    return document.getElementById(id);
};

// GET ADD EMPLOYEE FORM AND EMPLOYEE TABLE FROM THE DOM
let addEmployeeForm = $('addForm');
let employeeTable = $('employees');

// SET A COUNT VARIABLE TO DISPLAY NEXT TO EMPLOYEES HEADER
let numEmployees = 0;

// ADD EMPLOYEE
addEmployeeForm.addEventListener('submit', (e) => {
    "use strict";
    // PREVENT FORM SUBMISSION
    e.preventDefault();

    // GET THE VALUES FROM THE TEXT BOXES
    let id = $("id").value;
    let name = $("name").value;
    let extension = $("extension").value;
    let email = $("email").value;
    let department = $("department").value;

    // INSERT A NEW ROW AT THE END OF THE EMPLOYEES TABLE
    let row = employeeTable.insertRow();

    // INSERT A CELL FOR EACH ITEM WITHIN THE NEW ROW
    let cellId = row.insertCell(0);
    let cellName = row.insertCell(1);
    let cellExtension = row.insertCell(2);
    let cellEmail = row.insertCell(3);
    let cellDepartment = row.insertCell(4);

    // APPEND THE TEXT VALUES AS TEXT NODES WITHIN THE CELLS
    cellId.appendChild(document.createTextNode(id));
    cellName.appendChild(document.createTextNode(name));
    cellExtension.appendChild(document.createTextNode(extension));
    cellEmail.appendChild(document.createTextNode(email));
    cellDepartment.appendChild(document.createTextNode(department));

    // CREATE THE DELETE BUTTON
    let cellDelete = row.insertCell(5);
    let deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm";
    deleteBtn.textContent = "X";
    cellDelete.onclick = () => deleteEmployee(deleteBtn);   // set onclick event on delete button
    cellDelete.appendChild(deleteBtn);

    // RESET THE FORM
    addEmployeeForm.reset();

    // SET FOCUS BACK TO THE ID TEXT BOX
    $("id").focus();

    // INCREMENT THE NUMBER OF EMPLOYEES IN THE TABLE
    numEmployees++;
    updateNumEmployees();
});

// DELETE EMPLOYEE
let deleteEmployee = (btn) => {
    if (window.confirm("Confirm delete")) {
        let rowIdx = btn.closest("tr").rowIndex; // get the parentNode row's index in table
        console.log("Row index deleted: " + rowIdx);
        if (rowIdx) {
            employeeTable.deleteRow(rowIdx);
            numEmployees--;
            updateNumEmployees();
        }
    }
};

let updateNumEmployees = () => {
    $("empCount").textContent = "(" + numEmployees + ")";
};

// Populate fields with test values
let populateFields = () => {
    let randId = Math.floor(10000000 + Math.random() * 90000000);
    $("id").value = randId;
    $("name").value = "Test Name " + randId;
    $("extension").value = Math.floor(1000 + Math.random() * 9000);
    $("email").value = randId.toString() + "@email.com";
};

function createPopulateButton() {
    let populateButton = document.createElement('button');
    populateButton.textContent = 'Populate Fields';
    populateButton.type = 'button';
    populateButton.className = 'btn btn-info';
    populateButton.onclick = populateFields;

    let addButton = addEmployeeForm.querySelector('[type="submit"]');

    addButton.parentNode.appendChild(populateButton);
}
createPopulateButton();
