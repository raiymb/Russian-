document.addEventListener('DOMContentLoaded', function() {
    let totalTime = 600; // 10 minutes
    const timerElement = document.getElementById('time');
    const submitButton = document.getElementById('submitQuiz');

    // Function to update the timer UI
    const updateTimer = () => {
        let minutes = Math.floor(totalTime / 60);
        let seconds = totalTime % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (totalTime <= 0) {
            clearInterval(timerInterval);
            submitQuiz(); // Function to handle quiz submission
        }
        totalTime--;
    };

    let timerInterval = setInterval(updateTimer, 1000);

    // Function to dynamically load quiz content (pseudo-code)
    const loadQuizContent = async () => {
        // Fetch quiz and reading content from backend
        // Populate quiz-container with fetched content
        // Show submit button when content is loaded
        submitButton.style.display = 'block';
    };

    // Call loadQuizContent to load the quiz
    loadQuizContent();

    // Submit Quiz function (pseudo-code)
    const submitQuiz = () => {
        // Handle quiz submission (e.g., collect answers, send to backend)
        alert("Time's up! Your quiz has been submitted.");
        clearInterval(timerInterval); // Stop the timer
    };

    submitButton.addEventListener('click', submitQuiz);
});
