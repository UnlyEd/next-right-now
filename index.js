const protect = require('static-auth');
const safeCompare = require('safe-compare');

const app = protect(
  '/',
  (username, password) => safeCompare(username, 'admin') && safeCompare(password, 'admin'),
);

module.exports = app;
