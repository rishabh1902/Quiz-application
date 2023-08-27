const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const submitButton = document.getElementById('submit');
const timerElement = document.getElementById('timer');
const skipButton = document.getElementById('skip');

const exitButton = document.getElementById('exit');
const quizData = [
    {
        question: "Which programming language is known as the 'mother of all languages'?",
        options: ["Java", "C++", "COBOL", "Assembly"],
        answer: 3
    },
    {
        question: "What is the correct syntax for a 'for' loop in JavaScript?",
        options: ["for (i = 0; i <= 5)", "for i = 1 to 5", "for (i <= 5; i++)", "for (i = 0; i < 5; i++)"],
        answer: 3
    },
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Technology Modern Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
        answer: 0
    },
    {
        question: "In Python, what is the result of the following code?\n\nprint(2 ** 3)",
        options: ["6", "8", "9", "16"],
        answer: 1
    },
    {
        question: "Which data structure follows the Last-In-First-Out (LIFO) principle?",
        options: ["Queue", "Stack", "Tree", "Heap"],
        answer: 1
    },
    {
        question: "What is the output of the following C++ code?\n\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 10;\n    if (x > 5)\n        cout << 'A';\n    else if (x > 7)\n        cout << 'B';\n    else\n        cout << 'C';\n    return 0;\n}",
        options: ["A", "B", "C", "AB"],
        answer: 0
    },
    {
        question: "Which of the following is not a valid variable name in most programming languages?",
        options: ["myVariable", "MyVariable", "my_variable", "1variable"],
        answer: 3
    },
    {
        question: "What is the purpose of CSS?",
        options: ["To create dynamic web pages", "To structure the content of a web page", "To define the visual appearance of a web page", "To store data on the client-side"],
        answer: 2
    },
    {
        question: "In Java, what is the parent class of all classes?",
        options: ["Object", "Parent", "SuperClass", "ParentClass"],
        answer: 0
    },
    {
        question: "What is the symbol used for single-line comments in most programming languages?",
        options: ["#", "//", "/*", "*"],
        answer: 1
    },
    // Add more questions here...
];


let currentQuestionIndex = 0;
let userResponses = []; // To store user's selected options
let correctAnswers = 0; // To keep track of correct answers
let incorrectAnswers = 0; // To keep track of incorrect answers
let totalPoints = 0; // To keep track of total points scored
let timeLeft = 300; // Total time for the quiz in seconds
let timer;
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}
shuffleArray(quizData);
function loadNextShuffledQuestion() {
    currentQuestionIndex++;
    userResponses[currentQuestionIndex] = undefined;
    skipButton.disabled = true;
    submitButton.disabled = true;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } 
}
function loadQuestion() {
    resetTimer();
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = `Que.${currentQuestionIndex + 1}: ${currentQuestion.question}`;

    optionsElement.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index));
        optionsElement.appendChild(optionElement);
    });

    submitButton.disabled = true;
    skipButton.disabled = false;
    startTimer();
}


function selectOption(selectedIndex) {
    clearTimeout(timer);

    if (selectedIndex === -1) {
        userResponses[currentQuestionIndex] = -1;
        skipButton.disabled = true;
    } else {
        userResponses[currentQuestionIndex] = selectedIndex;
        skipButton.disabled = false;

        // Apply green color to the selected option
        const selectedOption = optionsElement.querySelector('.option.selected');
        if (selectedOption) {
            selectedOption.classList.remove('selected');
        }
        optionsElement.querySelectorAll('.option')[selectedIndex].classList.add('selected');
    }

    submitButton.disabled = false;
    loadNextQuestion();
}



function loadNextQuestion() {
    currentQuestionIndex++;
    userResponses[currentQuestionIndex] = undefined;
    skipButton.disabled = true; 
    submitButton.disabled = true; // Disable the submit button before loading the next question

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } 
}
function createQuestionNav() {
    const questionNav = document.querySelector('.question-nav');

    for (let i = 0; i < quizData.length; i++) {
        const questionNumberButton = document.createElement('button');
        questionNumberButton.textContent = i + 1;
        questionNumberButton.addEventListener('click', () => jumpToQuestion(i));
        questionNav.appendChild(questionNumberButton);
    }
}

function jumpToQuestion(questionIndex) {
    currentQuestionIndex = questionIndex;
    loadQuestion();
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearTimeout(timer);
            selectOption(-1); // Time's up, move to the next question
            displayResults(); // Immediately show results when timer ends
        } else {
            const hours = Math.floor(timeLeft / 3600);
            const minutes = Math.floor((timeLeft % 3600) / 60);
            const seconds = timeLeft % 60;
            
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            timerElement.textContent = `Time left: ${formattedTime}`;
            timeLeft--;
        }
    }, 1000);
}



function resetTimer() {
    clearTimeout(timer);
    timerElement.textContent = '';
}

function displayResults() {
    questionElement.textContent = "Quiz Completed!";
    optionsElement.innerHTML = '';
   // optionsElement.appendChild(resultElement);

    submitButton.style.display = 'none';
        skipButton.style.display = 'none';
         clearTimeout(timer);
    for (let i = 0; i < quizData.length; i++) {
        if (userResponses[i] !== undefined) {
            if (userResponses[i] === quizData[i].answer) {
                correctAnswers++;
                totalPoints += 4;
            } else if (userResponses[i] !== -1) {
                incorrectAnswers++;
            }
        }
    }

    const attemptedQuestions = correctAnswers + incorrectAnswers;
    const unansweredQuestions = quizData.length - attemptedQuestions;
    
    const resultElement = document.createElement('div');
    resultElement.className = 'result';
    resultElement.innerHTML = `
        <p>Attempted: ${attemptedQuestions}</p>
        <p>Unanswered: ${unansweredQuestions}</p>
        <p>Correct Answers: ${correctAnswers}</p>
        <p>Incorrect Answers: ${incorrectAnswers}</p>
        <p>Total Points: ${totalPoints-incorrectAnswers} out of ${(attemptedQuestions+unansweredQuestions) * 4}</p>
    `;
    
    optionsElement.appendChild(resultElement);
    exitButton.removeEventListener('click', exitButtonClickHandler);
    exitButton.style.display = 'none';

}
function exitButtonClickHandler() {
    const exitConfirmation = confirm("Are you sure you want to exit the test?");
    if (exitConfirmation) {
        clearTimeout(timer);
        displayResults();
    }
}
skipButton.addEventListener('click', () => {
    userResponses[currentQuestionIndex] = -1; // Use -1 to indicate a skipped question
    loadNextQuestion();
});
submitButton.addEventListener('click', () => {
    selectOption();
    loadNextQuestion();
});
exitButton.addEventListener('click', () => {
    const exitConfirmation = confirm("Are you sure you want to exit the test?");
    if (exitConfirmation) {
        clearTimeout(timer);
        displayResults();
    }
});


loadQuestion();
createQuestionNav(); 