const words = [
    "plasma",
    "recipient",
    "platelets",
    "donor",
    "transfusion",
];

const hints = [
    "This component of blood helps with clotting and is often used in medical treatments.",
    "This person receives the donated blood or its components.",
    "These tiny cell fragments help in blood clotting to prevent excessive bleeding.",
    "The person who gives blood voluntarily to help others in need.",
    "The process of transferring blood or blood components from one person into another person's bloodstream.",
];

let currentQuestion = 0;
let score = 0;

function shuffle(str) {
    strArray = Array.from(str);
    for (let i = 0; i < strArray.length - 1; ++i) {
        let j = Math.floor(Math.random() * strArray.length);
        let temp = strArray[i];
        strArray[i] = strArray[j];
        strArray[j] = temp;
    }
    return strArray.join(" ");
}

function check() {
    let input = document.getElementById("input");
    let output = document.getElementById("output");
    let currentWord = words[currentQuestion];
    if (input.value.toLocaleLowerCase() === currentWord.toLocaleLowerCase()) {
        output.innerHTML = "Result: Correct";
        score++; // Increase score if correct
         // Update the score value displayed on the page
         document.getElementById("score").innerText = score;
    } else {
        output.innerHTML = "Result: Incorrect";
    }
    // Set a timeout of 2500 milliseconds (2.5 seconds) to display the result
    setTimeout(() => {
        // Move to the next question
        //if questions==5, call endgame 
        currentQuestion++;
        if (currentQuestion >= words.length) {
            endGame(); // Call endGame() if all questions are checked
        } else {
            refresh(); // Show the next question after the timeout
        }
    }, 2500);
         
}

function refresh() {
    let currentWord = words[currentQuestion];
    let currentHint = hints[currentQuestion];
    let scrambleWord = document.getElementById("scrambleWord");
    scrambleWord.innerText = shuffle(currentWord).toUpperCase();
    let hint = document.getElementById("hint");
    hint.innerHTML = "<b>Hint:</b> " + currentHint;
    document.getElementById("output").innerText = "Result:";
    document.getElementById("input").value = ""; // Clear previous input
}

refresh(); // Call refresh to show the first question when the page loads

function endGame() {

    // Play win sound
    document.getElementById("win-sound").play();

    // Clear scrambled, form, hint, output, foot 
    document.getElementById('scrambled').innerHTML = '';
    document.getElementById('form').innerHTML = '';
    document.getElementById('hint').innerHTML = '';
    document.getElementById('output').innerHTML = '';
    document.querySelector('.foot').style.display = 'none';
    document.getElementById('score-container').innerHTML = '';
    

    // Add completion message to the #completion-message div
    const completionMessage = document.getElementById('completion-message');
    completionMessage.innerText = 'Questions Completed!\nThis is your score: ' + score + '\n\nKeep it up!\n\n';

    // Display the completion message 
    completionMessage.style.display = 'block';

    // Display the end container
    const endContainer = document.querySelector('.end-container');
    endContainer.style.display = 'block';
}

/*function restart() {
    // Reset currentQuestion and score
    // hide completion message
    // hide end-container
    // Reset currentQuestion and score
    // display root scrambled, scrambleWord, form, input, hint, output, score-container, foot
    currentQuestion = 0;
    score = 0;
}*/

function goHome() {
    window.location.href = 'http://localhost/fyp/interactive.php'; // Navigate to index.php

}

// Function to update score on table 'highscore' based on session ID
function updateScores(score) {
    var http = new XMLHttpRequest();
    var url = 'ws-scoreserver.php'; // Link to PHP server file
    
    // Parameters to be sent in the POST request
    var params = 'wscramble_score=' + score;
    
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            alert(http.responseText); // Alert the response from the server
        }
    }
    
    http.send(params); // Send the POST request with parameters
}

function restart() {
    window.location.href = 'index.html';
}



