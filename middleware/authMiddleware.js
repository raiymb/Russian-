const User = require('../models/User');

const isAuthenticated = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).redirect('/');
  }
  next();
};

const hasRole = role => async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).redirect('/');
  }
  try {
    const user = await User.findById(req.session.userId);
    if (!user || user.role !== role) {
      return res.status(403).send('Access denied');
    }
    next();
  } catch (error) {
    res.status(500).send('Server error');
  }
};

module.exports = { isAuthenticated, hasRole };
