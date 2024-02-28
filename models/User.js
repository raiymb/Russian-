const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
  deletionDate: { type: Date, default: null },
  isAdmin: { type: Boolean, default: false },
  role: { type: String, default: 'user' }, 
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;