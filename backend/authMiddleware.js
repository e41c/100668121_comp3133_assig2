const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = '123456'; 

function generateToken(userId) {
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
}

function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

module.exports = {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword
};
