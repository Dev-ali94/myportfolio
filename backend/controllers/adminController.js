const adminUser = require('../models/adminModel');

const login = (req, res) => {
  const { email, password } = req.body;
  if (email !== adminUser.email || password !== adminUser.password) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  return res.status(200).json({
    message: 'Login successful',
    role: adminUser.role,
    username: adminUser.username
  });
};

module.exports = { login };
