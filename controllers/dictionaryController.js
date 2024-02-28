const axios = require('axios');

async function getYandexTranslations(word) {
    const apiKey = 'dict.1.1.20240225T083822Z.839f21adc40f3a4e.17a526384be46cff0841b6e4ddafaaf36841800e';
    const apiUrl = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${apiKey}&lang=en-ru&text=${encodeURIComponent(word)}`;

    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch translations from Yandex Dictionary API', error);
        throw error;
    }
}

module.exports = getYandexTranslations;
