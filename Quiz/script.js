const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true },
            { text: "Bhutan", correct: false },
            { text: "Nepal", correct: false },
            { text: "Sri Lanka", correct: false },
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Antarctica", correct: true },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Antarctica", correct: true },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false },
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false },
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Venus", correct: false },
            { text: "Jupiter", correct: false },
        ]
    },
    {
        question: "Who wrote 'Hamlet'?",
        answers: [
            { text: "Charles Dickens", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "Leo Tolstoy", correct: false },
            { text: "Mark Twain", correct: false },
        ]
    },
    {
        question: "What is the boiling point of water?",
        answers: [
            { text: "100°C", correct: true },
            { text: "90°C", correct: false },
            { text: "80°C", correct: false },
            { text: "120°C", correct: false },
        ]
    },
    {
        question: "Which is the fastest land animal?",
        answers: [
            { text: "Lion", correct: false },
            { text: "Cheetah", correct: true },
            { text: "Horse", correct: false },
            { text: "Leopard", correct: false },
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            { text: "H2O", correct: true },
            { text: "O2", correct: false },
            { text: "CO2", correct: false },
            { text: "HO", correct: false },
        ]
    },
    {
        question: "Which is the longest river in the world?",
        answers: [
            { text: "Amazon", correct: true },
            { text: "Nile", correct: false },
            { text: "Yangtze", correct: false },
            { text: "Mississippi", correct: false },
        ]
    },
    {
        question: "Who discovered gravity?",
        answers: [
            { text: "Albert Einstein", correct: false },
            { text: "Isaac Newton", correct: true },
            { text: "Galileo Galilei", correct: false },
            { text: "Nikola Tesla", correct: false },
        ]
    },
    {
        question: "What is the speed of light?",
        answers: [
            { text: "300,000 km/s", correct: true },
            { text: "150,000 km/s", correct: false },
            { text: "500,000 km/s", correct: false },
            { text: "100,000 km/s", correct: false },
        ]
    },
    {
        question: "Which is the national flower of Japan?",
        answers: [
            { text: "Lotus", correct: false },
            { text: "Cherry Blossom", correct: true },
            { text: "Tulip", correct: false },
            { text: "Rose", correct: false },
        ]
    },
    {
        question: "Which is the hardest natural substance?",
        answers: [
            { text: "Gold", correct: false },
            { text: "Diamond", correct: true },
            { text: "Iron", correct: false },
            { text: "Platinum", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];

// Function to shuffle the questions array
function shuffleQuestions() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
}

function startQuiz() {
    shuffleQuestions(); // Shuffle the questions before starting
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = shuffledQuestions[currentQuestionIndex];
    let questionNO = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNO + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

    if (currentQuestionIndex === shuffledQuestions.length - 1) {
        nextButton.innerHTML = "Submit";
    } else {
        nextButton.innerHTML = "Next";
    }
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    nextButton.onclick = () => {
        window.location.href = "/project 2/index.html"; // Replace with actual path
    };
    questionElement.innerHTML = `You scored ${score} out of ${shuffledQuestions.length}!`;
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < shuffledQuestions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
