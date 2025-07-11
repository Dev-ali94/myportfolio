require('dotenv').config();

const adminUser = {
  email: process.env.ADMIN_EMAIL,
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD,
  role: process.env.ADMIN_ROLE || 'admin'
};

module.exports = adminUser;
