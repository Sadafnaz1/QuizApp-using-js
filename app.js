const questions = [
    {
        question: "What is the capital of india?",
        answers: [
            {text: 'Maharashtra', correct: 'false'},
            {text: 'Karnataka', correct: 'false'},
            {text: 'New Dehli', correct: 'true'},
            {text: 'Rajasthan', correct: 'false'},
        ]
    },
    {
        question: "Which is the largest state in  india by area?",
        answers: [
            {text: 'Maharashtra', correct: 'false'},
            {text: 'Karnataka', correct: 'false'},
            {text: 'New Dehli', correct: 'false'},
            {text: 'Rajasthan', correct: 'true'},
        ]
    },
    {
        question: "Which is the largest river in india?",
        answers: [
            {text: 'Ganges', correct: 'true'},
            {text: 'jamuna', correct: 'false'},
            {text: 'Godavari', correct: 'false'},
            {text: 'Brahmaputra', correct: 'false'},
        ]
    },
    {
        question: "What is the currency of india?",
        answers: [
            {text: 'Dollar', correct: 'false'},
            {text: 'Rupee', correct: 'true'},
            {text: 'Dirham', correct: 'false'},
            {text: 'Japanese yen', correct: 'false'},
        ]
    },
    {
        question: "The 'Slack Season'in the Indian economy is:",
        answers: [
            {text: 'January-june', correct: 'true'},
            {text: 'March-April', correct: 'false'},
            {text: 'Nov-Dec', correct: 'false'},
            {text: 'Jan-Feb', correct: 'false'},
        ]
    }
];

const questionElement = document.getElementById('questions');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;


    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}



function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("inCorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}




nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();