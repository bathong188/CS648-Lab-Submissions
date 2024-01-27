let rows = 7;

for (let i = 1; i <= rows; i++) {
    let row = "";
    for (let j = 1; j <= i; j++) {
        row += "#";
    }
    document.write(row + "<br>");
}