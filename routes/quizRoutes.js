const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz'); 
const Reading = require('../models/Reading'); 

router.get('/quiz', async (req, res) => {
    try {
        const quizzesPromise = Quiz.aggregate([{ $sample: { size: 18 } }]);
        const readingPromise = Reading.aggregate([{ $sample: { size: 1 } }]);

        const [quizzes, readings] = await Promise.all([quizzesPromise, readingPromise]);

        if (readings[0] && readings[0].questions.length > 6) {
            readings[0].questions = readings[0].questions.sort(() => 0.5 - Math.random()).slice(0, 6);
        }

        const mixedQuestions = [...quizzes, ...readings[0].questions].sort(() => 0.5 - Math.random());

        res.render('quiz', { mixedQuestions: mixedQuestions });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
