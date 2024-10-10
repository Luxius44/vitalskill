// Variable pour suivre le score
let score = 0;

// Vérifier les réponses
function checkAnswer(questionNumber, selectedAnswer) {
  const feedback = document.getElementById(`feedback${questionNumber}`);
  const questionOptions = document.querySelectorAll(`input[name="q${questionNumber}"]`);

  questionOptions.forEach(option => {
    option.disabled = true;
  });

  const correctAnswers = {
    1: '1',
    2: '1',
    3: '2',
    4: '3',
    5: '2'
  };

  if (selectedAnswer === correctAnswers[questionNumber]) {
    feedback.innerHTML = "<p class='correct-answer'>Bravo ! C'est la bonne réponse.</p>";
    score++;
  } else {
    const correctAnswerText = questionNumber === 1 
      ? "Chaleur, électricité, frottement, substances chimiques"
      : questionNumber === 2
      ? "Les contacts avec des liquides chauds"
      : questionNumber === 3
      ? "La peau est rouge, sans cloques"
      : questionNumber === 4
      ? "Lorsque sa surface est supérieure à la paume de la main de la victime"
      : "Les yeux, le nez, les mains, les organes génitaux";
    feedback.innerHTML = `<p class='incorrect-answer'>Incorrect. La bonne réponse est : <span class='correct-answer'>${correctAnswerText}</span>.</p>`;
  }

  const progressBar = document.getElementById('progress-bar');
  const progress = (questionNumber / 5) * 100;
  progressBar.style.width = `${progress}%`;

}

// Voir la question suivante
function showNextQuestion(questionNumber) {
  const currentQuestion = document.getElementById(`question${questionNumber - 1}`);
  const selectedOption = document.querySelector(`input[name="q${questionNumber - 1}"]:checked`);

  if (!selectedOption) {
    alert("Veuillez répondre à la question avant de continuer.");
    return;
  }

  if (currentQuestion) {
    currentQuestion.style.display = "none";
  }

  if (questionNumber <= 5) {
    const nextQuestion = document.getElementById(`question${questionNumber}`);
    if (nextQuestion) {
      nextQuestion.style.display = "block";
    }

    const questionTitle = document.getElementById('question-title');
    questionTitle.textContent = `Question ${questionNumber}/5`;
  }

  if (questionNumber === 5) {
    const nextArrow = document.querySelector(`#question${questionNumber} .next-arrow`);
    nextArrow.onclick = showFinalScore;
  }
}



// Score
function showFinalScore() {
  const quizContainer = document.querySelector('.quiz-container');
  const percentageScore = (score / 5) * 100;
  quizContainer.innerHTML = `
    <h2>Votre score : ${percentageScore}%</h2>
    <p>${percentageScore >= 80 ? "Bravo ! Vous avez obtenu votre certification ! 🥳" : "<span style='color:#d93526;'>Malheureusement, vous n'avez pas atteint le seuil de certification. 😔</span>"}</p>
    ${percentageScore >= 80 
      ? '<button class="showcert" onclick="showCertificate()">Voir ma certification</button>' 
      : '<button class="comeback" onclick="goToTraining()"> Continuer </button>'}
  `;
}

  
// Retour à la home page
function goToTraining() {
  window.location.href = "home.html";
}

// Voir la certification
function showCertificate() {
  const quizContainer = document.querySelector('.quiz-container');
  quizContainer.remove();
  const link = document.createElement('a');
  link.href = 'img/Certificat.png'; 
  link.download = 'Certification.png'; 
  link.style.display = 'none'; 
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}