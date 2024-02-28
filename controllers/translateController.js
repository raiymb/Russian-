const { OpenAI } = require("openai");

const openai = new OpenAI({apiKey:"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"});

exports.explainInRussian = async (req, res) => {
    const { word } = req.query;
  
    if (!word) {
      return res.status(400).send('Please provide a word to explain in Russian.');
    }
  
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0301",
        temperature: 0.7,
        messages: [{"role": "user", "content": `Объясните значение следующего русского слова на русском языке коротко: "${word}"`}],
        max_tokens: 100,
        stop: ["\n\n"],
      });
  
      if (response && response.choices && response.choices.length > 0 && response.choices[0].message) {
        const explanation = response.choices[0].message.content || "No explanation found."; 
        res.json({ explanation: explanation.trim() });
      } else {
        throw new Error('Unexpected response structure from OpenAI API.');
      }
    } catch (error) {
      console.error('Error explaining word in Russian:', error);
      res.status(500).send('Failed to explain the word in Russian.');
    }
  };
exports.translateToEnglish = async (req, res) => {
  const { word } = req.query;

  if (!word) {
    return res.status(400).send('Please provide a word to translate to English.');
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0301",
      temperature: 0.7,
      messages: [{"role": "user", "content": `Explain the following russian word in english: "${word}"`}],
      max_tokens: 100,
      stop: ["\n\n"],
    });

    if (response && response.choices && response.choices.length > 0 && response.choices[0].message) {
      const explanation = response.choices[0].message.content || "No explanation found."; 
      res.json({ explanation: explanation.trim() });
    } else {
      throw new Error('Unexpected response structure from OpenAI API.');
    }
  } catch (error) {
    console.error('Error explaining word in Russian:', error);
    res.status(500).send('Failed to explain the word in Russian.');
  }
};
