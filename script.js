// ============================================
// QUESTIONS ARRAY
// ============================================
let questions = [
    { q: "What is the capital of Pakistan?", options: ["Karachi","Islamabad","Peshawar","Multan"], answer: 1 },
    { q: "Who wrote the national anthem of Pakistan?", options: ["Allama Iqbal","Faiz Ahmed","Hafeez Jalandhri","Quaid-e-Azam"], answer: 2 },
    { q: "In which year did Pakistan get independence?", options: ["1947","1948","1949","1950"], answer: 0 },
    { q: "What is the largest ocean in the world?", options: ["Indian ocean","Atlantic ocean","Arctic ocean","Pacific ocean"], answer: 3 },
    { q: "Who was the founder of Pakistan?", options: ["Liaquat Ali Khan","Allama Iqbal","Quaid-e-Azam Muhammad Ali Jinnah","Sir Syed Ahmed Khan"], answer: 2 },
    { q: "What is the chemical formula of water?", options: ["H2O","CO2","NaCl","O2"], answer: 0 },
    { q: "How many colors are there in a rainbow?", options: ["5","6","7","8"], answer: 2 },
    { q: "What is the national language of Pakistan?", options: ["Sindhi","Urdu","Punjabi","English"], answer: 1 },
    { q: "What is the national flower of Pakistan?", options: ["Rose","Sunflower","Jasmine","Tulip"], answer: 2 },
    { q: "What is the currency of Korea?", options: ["Yen","Won","Yuan","Ringgit"], answer: 1 },
    { q: "What is the capital city of South Korea?", options: ["Seoul","Busan","Incheon","Daegu"], answer: 0 },
    { q: "Which Korean company makes galaxy smartphones?", options: ["LG","Samsung","Apple","Huawei"], answer: 1 },
    { q: "What is the national language of South Korea?", options: ["Korean","Chinese","Japanese","English"], answer: 0 },
    { q: "Which Korean dish is made from fermented vegetables, usually cabbage and radish?", options: ["Bibimbap","Kimchi","Ramen","Sushi"], answer: 1 },
    { q: "What is the traditional Korean dress called?", options: ["Hanbok","Kimono","Ao Dai","Cheongsam"], answer: 0 },
    { q: "Which Korean festival celebrates harvest and family reunion?", options: ["Seollal","Holi","Chuseok","Lunar festival"], answer: 2 },
    { q: "What is the Korean word for 'hello'?", options: ["Annyeonghaseyo","Bye Bye","Saranghaeyo","Ni hao"], answer: 0 },
    { q: "What is the Korean word for 'Thank You'?", options: ["Xié Xié","Kamsahamnida","Duì Bu Qî","Wô Ài Nì"], answer: 1 },
    { q: "Which boyband became famous for their song 'DYNAMITE'?", options: ["BTS","Stray Kids","EXO","Enhypen"], answer: 0 },
    { q: "Who invented the light bulb?", options: ["Alexander Graham Bell","Thomas Edison","Nikola Tesla","Isaac Newton"], answer: 1 }
];

// ============================================
// STATE VARIABLES
// ============================================
let currentQuestion = 0;
let score = 0;
let currentStreak = 0;
let bestStreak = 0;
let timeLeft = 10;
let timerInterval = null;
let isAnswered = false;

// ============================================
// DOM ELEMENTS
// ============================================
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const timerDisplay = document.getElementById("timerDisplay");
const progressBar = document.getElementById("progressBar");
const scoreValue = document.getElementById("score");
const streakValue = document.getElementById("streak");
const questionCounter = document.getElementById("questionCounter");
const questionBadge = document.getElementById("questionBadge");
const quizResult = document.getElementById("quizResult");
const quizFinished = document.getElementById("quizFinished");
const resultIcon = document.getElementById("resultIcon");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");
const resultCountdown = document.getElementById("resultCountdown");
const nextTimer = document.getElementById("nextTimer");
const btnNext = document.getElementById("btnNext");
const finalScore = document.getElementById("finalScore");
const bestStreakDisplay = document.getElementById("bestStreak");
const smartRemark = document.getElementById("smartRemark");
const finishedIcon = document.getElementById("finishedIcon");
const restartBtn = document.getElementById("restartBtn");

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Fisher-Yates shuffle algorithm
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Create confetti effect
 */
function createConfetti() {
    const confettiContainer = document.getElementById("confetti");
    confettiContainer.innerHTML = "";
    
    const colors = ["#00f5ff", "#7c3aed", "#ff006e", "#4ade80", "#fbbf24", "#f472b6"];
    const confettiCount = 60;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement("div");
        confetti.style.position = "fixed";
        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.top = "-10px";
        confetti.style.width = "10px";
        confetti.style.height = "10px";
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
        confetti.style.pointerEvents = "none";
        confetti.style.zIndex = "999";
        confetti.style.opacity = "1";
        confetti.style.transition = "all 2s ease-in";
        
        confettiContainer.appendChild(confetti);
        
        const duration = 2000;
        const delay = Math.random() * 200;
        const xMovement = (Math.random() - 0.5) * 300;
        const rotation = Math.random() * 360;
        
        setTimeout(() => {
            confetti.style.transform = `translateX(${xMovement}px) translateY(800px) rotate(${rotation}deg)`;
            confetti.style.opacity = "0";
        }, 50);
        
        setTimeout(() => {
            confetti.remove();
        }, duration + delay);
    }
}

/**
 * Shuffle options and display them
 */
function displayQuestion() {
    isAnswered = false;
    const question = questions[currentQuestion];
    
    // Update question text and badge
    questionText.textContent = question.q;
    questionBadge.textContent = `Q${currentQuestion + 1}`;
    questionCounter.textContent = `${currentQuestion + 1}/${questions.length}`;
    
    // Shuffle and display options
    const shuffledOptions = shuffleArray(question.options);
    optionsContainer.innerHTML = "";
    
    shuffledOptions.forEach((option, index) => {
        const originalIndex = question.options.indexOf(option);
        const optionDiv = document.createElement("div");
        optionDiv.className = "option";
        optionDiv.textContent = option;
        optionDiv.onclick = () => handleAnswer(optionDiv, originalIndex);
        optionsContainer.appendChild(optionDiv);
    });
}

/**
 * Start 10-second timer with smooth progress bar
 */
function startTimer() {
    timeLeft = 10;
    timerDisplay.textContent = "10";
    timerDisplay.classList.remove("critical");
    progressBar.style.width = "100%";
    
    clearInterval(timerInterval);
    
    const startTime = Date.now();
    const duration = 10000; // 10 seconds
    
    timerInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, duration - elapsed);
        const remainingSeconds = remaining / 1000;
        
        // Update timer display (rounded to 1 decimal)
        timerDisplay.textContent = Math.ceil(remainingSeconds);
        
        // Update progress bar (linear decrease)
        const progressPercent = (remaining / duration) * 100;
        progressBar.style.width = progressPercent + "%";
        
        // Add critical class when 3 seconds or less
        if (remainingSeconds <= 3) {
            timerDisplay.classList.add("critical");
        }
        
        // Time's up
        if (remaining <= 0) {
            clearInterval(timerInterval);
            handleTimeout();
        }
    }, 50); // Update frequently for smooth progress bar
}

/**
 * Handle answer selection
 */
function handleAnswer(selectedOption, selectedIndex) {
    if (isAnswered) return;
    isAnswered = true;
    
    clearInterval(timerInterval);
    
    const question = questions[currentQuestion];
    const correctIndex = question.answer;
    const allOptions = document.querySelectorAll(".option");
    
    // Disable all options
    allOptions.forEach(opt => {
        opt.classList.add("disabled");
        opt.style.pointerEvents = "none";
    });
    
    // Check if answer is correct
    const isCorrect = selectedIndex === correctIndex;
    
    if (isCorrect) {
        selectedOption.classList.add("correct");
        score += 5;
        currentStreak += 1;
        if (currentStreak > bestStreak) {
            bestStreak = currentStreak;
        }
        scoreValue.textContent = score;
        streakValue.textContent = currentStreak;
        createConfetti();
        showResultModal(true);
    } else {
        selectedOption.classList.add("wrong");
        // Highlight correct answer
        allOptions.forEach(opt => {
            const optionIndex = question.options.indexOf(opt.textContent);
            if (optionIndex === correctIndex) {
                opt.classList.add("correct");
            }
        });
        currentStreak = 0;
        streakValue.textContent = currentStreak;
        showResultModal(false);
    }
}

/**
 * Handle timeout - show correct answer and move to next
 */
function handleTimeout() {
    if (isAnswered) return;
    isAnswered = true;
    
    const question = questions[currentQuestion];
    const correctIndex = question.answer;
    const allOptions = document.querySelectorAll(".option");
    
    // Disable all options
    allOptions.forEach(opt => {
        opt.classList.add("disabled");
        opt.style.pointerEvents = "none";
    });
    
    // Highlight correct answer
    allOptions.forEach(opt => {
        const optionIndex = question.options.indexOf(opt.textContent);
        if (optionIndex === correctIndex) {
            opt.classList.add("correct");
        }
    });
    
    currentStreak = 0;
    streakValue.textContent = currentStreak;
    showResultModal(false, true);
}

/**
 * Show result modal
 */
function showResultModal(isCorrect, isTimeout = false) {
    if (isCorrect) {
        resultIcon.textContent = "🎉";
        resultTitle.textContent = "Correct!";
        resultMessage.textContent = "Great answer!";
        resultCountdown.innerHTML = "Next question in <span id='nextTimer'>1.4</span>s";
        btnNext.classList.add("hidden");
        
        // Auto-advance after 1.4 seconds
        let countdown = 1.4;
        const countdownInterval = setInterval(() => {
            countdown = Math.max(0, countdown - 0.1);
            const nextTimerEl = document.getElementById("nextTimer");
            if (nextTimerEl) {
                nextTimerEl.textContent = countdown.toFixed(1);
            }
            
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                quizResult.classList.add("hidden");
                moveToNextQuestion();
            }
        }, 100);
    } else {
        resultIcon.textContent = isTimeout ? "⏱️" : "❌";
        resultTitle.textContent = isTimeout ? "Time's Up!" : "Oops!";
        resultMessage.textContent = `The correct answer was: ${questions[currentQuestion].options[questions[currentQuestion].answer]}`;
        resultCountdown.textContent = "";
        btnNext.classList.remove("hidden");
        btnNext.onclick = () => {
            quizResult.classList.add("hidden");
            moveToNextQuestion();
        };
    }
    
    quizResult.classList.remove("hidden");
}

/**
 * Move to next question
 */
function moveToNextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        displayQuestion();
        startTimer();
    } else {
        endQuiz();
    }
}

/**
 * Get smart remark based on final score
 */
function getSmartRemark(finalScore) {
    if (finalScore >= 80) {
        return "🌟 Excellent! You did amazingly well!";
    } else if (finalScore >= 60) {
        return "👍 Good Job! You performed well. Keep practicing to improve further.";
    } else if (finalScore >= 40) {
        return "🙂 Not Bad! You have good potential.";
    } else {
        return "📚 You should learn more about general knowledge. Keep trying and you'll improve!";
    }
}

/**
 * Get finished icon based on final score
 */
function getFinishedIcon(finalScore) {
    if (finalScore >= 80) {
        return "🏆";
    } else if (finalScore >= 60) {
        return "🎖️";
    } else if (finalScore >= 40) {
        return "⭐";
    } else {
        return "📖";
    }
}

/**
 * End quiz and show final score
 */
function endQuiz() {
    finalScore.textContent = score;
    bestStreakDisplay.textContent = bestStreak;
    smartRemark.textContent = getSmartRemark(score);
    finishedIcon.textContent = getFinishedIcon(score);
    quizFinished.classList.remove("hidden");
}

/**
 * Restart quiz
 */
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    currentStreak = 0;
    bestStreak = 0;
    timeLeft = 10;
    isAnswered = false;
    clearInterval(timerInterval);
    
    scoreValue.textContent = "0";
    streakValue.textContent = "0";
    quizFinished.classList.add("hidden");
    
    displayQuestion();
    startTimer();
}

// ============================================
// EVENT LISTENERS
// ============================================
restartBtn.addEventListener("click", restartQuiz);

// Handle window resize for confetti
window.addEventListener("resize", () => {
    // Confetti will be recreated as needed
});

// ============================================
// INITIALIZE QUIZ
// ============================================
window.addEventListener("DOMContentLoaded", () => {
    displayQuestion();
    startTimer();
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Fisher-Yates shuffle algorithm
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Create confetti effect
 */
function createConfetti() {
    const confettiContainer = document.getElementById("confetti");
    confettiContainer.innerHTML = "";
    
    const colors = ["#00f5ff", "#7c3aed", "#ff006e", "#4ade80", "#fbbf24", "#f472b6"];
    const confettiCount = 60;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement("div");
        confetti.style.position = "fixed";
        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.top = "-10px";
        confetti.style.width = "10px";
        confetti.style.height = "10px";
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
        confetti.style.pointerEvents = "none";
        confetti.style.zIndex = "999";
        confetti.style.opacity = "1";
        confetti.style.transition = "all 2s ease-in";
        
        confettiContainer.appendChild(confetti);
        
        const duration = 2000;
        const delay = Math.random() * 200;
        const xMovement = (Math.random() - 0.5) * 300;
        const rotation = Math.random() * 360;
        
        setTimeout(() => {
            confetti.style.transform = `translateX(${xMovement}px) translateY(800px) rotate(${rotation}deg)`;
            confetti.style.opacity = "0";
        }, 50);
        
        setTimeout(() => {
            confetti.remove();
        }, duration + delay);
    }
}

/**
 * Shuffle options and display them
 */
function displayQuestion() {
    isAnswered = false;
    const question = questions[currentQuestion];
    
    // Update question text and badge
    questionText.textContent = question.q;
    questionBadge.textContent = `Q${currentQuestion + 1}`;
    questionCounter.textContent = `${currentQuestion + 1}/${questions.length}`;
    
    // Shuffle and display options
    const shuffledOptions = shuffleArray(question.options);
    optionsContainer.innerHTML = "";
    
    shuffledOptions.forEach((option, index) => {
        const originalIndex = question.options.indexOf(option);
        const optionDiv = document.createElement("div");
        optionDiv.className = "option";
        optionDiv.textContent = option;
        optionDiv.onclick = () => handleAnswer(optionDiv, originalIndex);
        optionsContainer.appendChild(optionDiv);
    });
}

/**
 * Start 10-second timer with smooth progress bar
 */
function startTimer() {
    timeLeft = 10;
    timerDisplay.textContent = "10";
    timerDisplay.classList.remove("critical");
    progressBar.style.width = "100%";
    
    clearInterval(timerInterval);
    
    const startTime = Date.now();
    const duration = 10000; // 10 seconds
    
    timerInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, duration - elapsed);
        const remainingSeconds = remaining / 1000;
        
        // Update timer display (rounded to 1 decimal)
        timerDisplay.textContent = Math.ceil(remainingSeconds);
        
        // Update progress bar (linear decrease)
        const progressPercent = (remaining / duration) * 100;
        progressBar.style.width = progressPercent + "%";
        
        // Add critical class when 3 seconds or less
        if (remainingSeconds <= 3) {
            timerDisplay.classList.add("critical");
        }
        
        // Time's up
        if (remaining <= 0) {
            clearInterval(timerInterval);
            handleTimeout();
        }
    }, 50); // Update frequently for smooth progress bar
}

// ============================================
// EVENT LISTENERS
// ============================================
restartBtn.addEventListener("click", restartQuiz);

// Handle window resize for confetti
window.addEventListener("resize", () => {
    // Confetti will be recreated as needed
});

// ============================================
// INITIALIZE QUIZ
// ============================================
window.addEventListener("DOMContentLoaded", () => {
    displayQuestion();
    startTimer();
});