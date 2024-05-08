let x = parseInt(window.prompt("Enter first integer"));
let y = parseInt(window.prompt("Enter second integer"));
let result = x > y ? x : y;

if (result) {
    document.write("The larger integer is " + result + "<br>");
}
