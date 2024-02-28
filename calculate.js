const Reading = require('./models/Reading'); 
const Quiz = require('./models/Quiz'); 

// This is a placeholder function. You need to implement the logic based on your database schema and data structure.
async function calculateScore(submissions) {
  let quizScore = 0;
  let readingScore = 0;

  // Example logic for calculating quiz and reading scores separately
  for (const submission of submissions.answers) {
    const question = await findQuestionById(submission.questionId); // You need to implement this function
    if (question.isQuiz) {
      quizScore += (submission.answer === question.correctAnswer) ? 1 : 0;
    } else {
      readingScore += (submission.answer === question.correctAnswer) ? 1 : 0;
    }
  }

  const totalScore = quizScore + readingScore;
  return { quizScore, readingScore, totalScore };
}

async function findQuestionById(questionId) {
  // First, try to find the question in the Quiz collection
  let question = await Quiz.findById(questionId).exec();
  if (question) {
    return { ...question.toObject(), isQuiz: true };
  } else {
    // If not found in Quiz, search in the Reading collection
    // Since questions are nested within readings, we have to search through all readings
    const reading = await Reading.findOne({ "questions._id": questionId }, { "questions.$": 1 }).exec();
    if (reading && reading.questions && reading.questions.length > 0) {
      return { ...reading.questions[0].toObject(), isQuiz: false };
    }
  }

  // If the question is not found in either collection, return null or throw an error
  return null;
}



module.exports = calculateScore;