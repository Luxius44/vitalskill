function checkAnswer(questionNumber, selectedAnswer) {
    const feedback = document.getElementById(`feedback${questionNumber}`);
    const questionOptions = document.querySelectorAll(`input[name="q${questionNumber}"]`);
  
    // Désactiver toutes les options de réponse
    questionOptions.forEach(option => {
      option.disabled = true;
    });
  
    // Vérification de la réponse et affichage du feedback
    const correctAnswers = {
      1: '1',
      2: '1',
      3: '2',
      4: '2',
      5: '2'
    };
  
    if (selectedAnswer === correctAnswers[questionNumber]) {
      feedback.innerHTML = "<p class='correct-answer'>Bravo ! C'est la bonne réponse.</p>";
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
      feedback.innerHTML = `<p class='incorrect-answer'>Incorrect. La bonne réponse est : <b>${correctAnswerText}</b>.</p>`;
    }
  
    // Mettre à jour la barre de progression
    const progressBar = document.getElementById('progress-bar');
    const progress = (questionNumber / 5) * 100;
    progressBar.style.width = `${progress}%`;
  }
  
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
    
    const nextQuestion = document.getElementById(`question${questionNumber}`);
    if (nextQuestion) {
      nextQuestion.style.display = "block";
    }
  
    const questionTitle = document.getElementById('question-title');
    questionTitle.textContent = `Question ${questionNumber}/5`;
  
    // Cacher la flèche pour la dernière question
    if (questionNumber === 5) {
      const nextArrow = document.querySelector(`#question${questionNumber} .next-arrow`);
      if (nextArrow) {
        nextArrow.style.display = 'none';
      }
    }
  }