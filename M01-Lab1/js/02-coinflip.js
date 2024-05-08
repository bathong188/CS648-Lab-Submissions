let coinFlip = Math.round(Math.random());
let choice = window.prompt("Heads or Tails").toLowerCase();
let result = coinFlip == 0 ? "heads" : "tails";

if (result == choice) {
    window.alert(`The flip was ${result} and you chose ${choice}...you win!`);
}
else {
    window.alert(`The flip was ${result} and you chose ${choice}...you lose!`);
}