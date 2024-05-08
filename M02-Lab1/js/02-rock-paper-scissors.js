function getUserChoice() {
    let userChoice = window.prompt("Enter choice:").toLowerCase();

    if (userChoice.toLowerCase() === "rock" ||
        userChoice.toLowerCase() === "paper" ||
        userChoice.toLowerCase() === "scissors") {
        return userChoice;
    }
    else {
        window.alert("Invalid choice.");
        return getUserChoice();
    }
}

function getComputerChoice() {
    let compChoice = Math.floor(Math.random() * 3);
    switch (compChoice) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
}

function compareChoices(userChoice, compChoice) {
    console.log(`You: ${userChoice}. Computer: ${compChoice}.`)
    if (userChoice === compChoice) {
        console.log("Tied");
    }
    else if (userChoice === "rock") {
        if (compChoice === "paper") {
            console.log("You lost!");
        }
        else if (compChoice === "scissors") {
            console.log("You won!");
        }
    }
    else if (userChoice === "paper") {
        if (compChoice === "rock") {
            console.log("You won!");
        }
        else if (compChoice === "scissors") {
            console.log("You lost!");
        }
    }
    else if (userChoice === "scissors") {
        if (compChoice === "rock") {
            console.log("You lost!");
        }
        else if (compChoice === "paper") {
            console.log("You won!");
        }
    }
}

function main() {
    let userChoice = getUserChoice();
    let compChoice = getComputerChoice();
    compareChoices(userChoice, compChoice);
}

main();