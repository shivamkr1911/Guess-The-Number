// Selecting key elements from the DOM
const enterbtn = document.querySelector("#enter-btn");
const resetbtn = document.querySelector("#reset-btn");
const response = document.querySelector("#response");
const guessInput = document.querySelector("#guess-input");
const rangeInput = document.querySelector('#range');
const rangeMessage = document.querySelector('#range-message');

// Generate initial target number
let target = generateTarget(parseInt(rangeInput.value));
let guess = ''; // Variable to store user's guess

// Function to generate a random target number within the range
function generateTarget(maxValue) {
    return Math.floor(Math.random() * maxValue) + 1; // Random number between 1 and maxValue
}

// Function to reset the game to the initial state
function resetGame() {
    target = generateTarget(parseInt(rangeInput.value)); // Generate a new target based on selected range
    guessInput.value = ''; // Clear the guess input field
    guessInput.disabled = false; // Enable the input for a new guess
    enterbtn.disabled = false; // Enable the enter button
    response.classList.remove('correct-guess', 'wrong-guess'); // Reset guess feedback styles
    response.textContent = 'The game has been reset.'; // Reset response message
    setTimeout(function () {
        response.textContent = 'All the best!'; // Update response after a brief delay
    }, 1000);
}

// Function to update the max value of the guess input based on selected range
function updateGuessInputMax() {
    const rangeValue = parseInt(rangeInput.value); // Get selected range value
    guessInput.setAttribute('max', rangeValue); // Update the max attribute of the input field
    guessInput.value = ''; // Clear input field when range changes
}

// Function to update the range message dynamically
function updateRangeMessage() {
    const rangeValue = rangeInput.value; // Get selected range value
    rangeMessage.textContent = `Guess a number between 1 and ${rangeValue}`; // Update range message
}

// Event listener for the 'Enter' button
enterbtn.addEventListener('click', function () {
    const rangeValue = parseInt(rangeInput.value); // Get the current range
    const guessValue = Number(guessInput.value.trim()); // Parse the guess
    if (guessInput.value.trim() === '') { // If input is empty, show a prompt
        response.textContent = 'Please make a guess first.';
        setTimeout(function () {
            response.textContent = 'All the best!';
        }, 1000);
        return;
    }

    if (guessValue < 1 || guessValue > rangeValue) {
        alert(`Please enter a number between 1 and ${rangeValue}.`); // Show alert if out of range
        guessInput.value = '';
        return;
    }

    guess = guessValue
    if (target !== guess) { // Check if guess is incorrect
        response.textContent = 'Wrong guess! Try again.';
        guessInput.value = '';
        response.classList.remove('correct-guess');
        response.classList.add('wrong-guess');
    } else { // If guess is correct
        response.textContent = 'Congratulations! You guessed correctly.';
        guessInput.value = '';
        response.classList.remove('wrong-guess');
        response.classList.add('correct-guess');
        guessInput.disabled = true; // Disable input after correct guess
        enterbtn.disabled = true; // Disable enter button after correct guess
    }
});

// Event listener for the 'Reset' button
resetbtn.addEventListener('click', resetGame);

// Event listener to handle changes in the range input
rangeInput.addEventListener('change', function () {
    resetGame();
    updateGuessInputMax();
    updateRangeMessage();
});

updateGuessInputMax(); // Set initial max guess value
updateRangeMessage(); // Set initial range message
