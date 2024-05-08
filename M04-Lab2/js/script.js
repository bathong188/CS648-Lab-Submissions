let $ = (id) => {
    return document.getElementById(id);
};

// CREATE AN ARRAY OF EMPLOYEES
let employeeArray = [];

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
window.onload = (event) => {
    if (localStorage.getItem("employeeData")) {
        employeeArray = JSON.parse(localStorage.getItem("employeeData"));
    }
    // BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
    buildGrid();
};

// GET DOM ELEMENTS
let addEmployeeForm = $("addForm");
let employeeTable = $("empTable");

// ADD EMPLOYEE
addEmployeeForm.addEventListener('submit', (event) => {
    // PREVENT FORM SUBMISSION
    event.preventDefault();

    // GET THE VALUES FROM THE TEXT BOXES
    let id = $("id").value;
    let name = $("name").value;
    let extension = $("extension").value;
    let email = $("email").value;
    let department = $("department").value;

    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    let employeeObject = {id, name, extension, email, department};

    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employeeArray.push(employeeObject);

    // BUILD THE GRID
    buildGrid();

    // RESET THE FORM
    addEmployeeForm.reset();

    // SET FOCUS BACK TO THE ID TEXT BOX
    $("id").focus();
});

// DELETE EMPLOYEE
employeeTable.addEventListener('click', (e) => {
    // CONFIRM THE DELETE
    if (window.confirm("Confirm delete")) {
        // GET THE SELECTED ROWINDEX FOR THE TR
        let rowIndex = e.target.closest("tr").rowIndex;

        // REMOVE EMPLOYEE FROM ARRAY
        console.log(rowIndex);
        console.log(employeeArray);
        employeeArray.splice(rowIndex - 1, 1);  // offset rowIndex to match employeeArray

        // BUILD THE GRID
        buildGrid();
    }
});

// BUILD THE EMPLOYEES GRID
function buildGrid() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    let tbody = document.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";

    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    employeeArray.forEach(function(employee) {
        tbody.innerHTML += `<tr>
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.extension}</td>
            <td>${employee.email}</td>
            <td>${employee.department}</td>
            <td><button class="btn btn-danger">Delete</button></td>
        </tr>`;
    });

    // UPDATE EMPLOYEE COUNT
    $("empCount").textContent = employeeArray.length;

    // STORE THE ARRAY IN STORAGE
    localStorage.setItem("employeeData", JSON.stringify(employeeArray));
}

// Populate fields with test values
function populateFields()  {
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
