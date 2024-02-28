const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).send('Username already exists');
    }
    user = new User({ username, password });
    await user.save();
    req.session.userId = user._id; 
    res.redirect('/main');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Authentication failed');
    }
    req.session.userId = user._id;
    res.redirect('/main');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.redirect('/'); 
  });
};
