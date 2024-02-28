const fs = require('fs');
const path = require('path');

function languageSelection(req, res, next) {
  const defaultLang = 'en';

  if (req.query.lang) {
    req.session.lang = req.query.lang;
  }

  const lang = req.session.lang || defaultLang;
  const localePath = path.join(__dirname, '..', 'locales', `${lang}.json`);

  try {
    req.locale = JSON.parse(fs.readFileSync(localePath, 'utf8'));
  } catch (error) {
    const defaultLocalePath = path.join(__dirname, '..', 'locales', `${defaultLang}.json`);
    req.locale = JSON.parse(fs.readFileSync(defaultLocalePath, 'utf8'));
  }

  next();
}
module.exports = languageSelection;
