const express = require('express');
const getYandexTranslations = require('../controllers/dictionaryController');
const translateController = require('../controllers/translateController');
const router = express.Router();

router.get('/dictionary/:word', async (req, res) => {
    try {
        const word = req.params.word;
        const translations = await getYandexTranslations(word);
        res.json(translations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/explain-in-russian', translateController.explainInRussian);
router.get('/translate-to-english', translateController.translateToEnglish);

module.exports = router;


module.exports = router;
