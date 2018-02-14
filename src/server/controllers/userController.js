let sql = require('../config.js');
let sqlstring = require('sqlstring');

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userController = {};

// Creates a new user in the database with bcrypt
userController.createUser = (req, res, next) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, SALT_WORK_FACTOR);
  sql.query(
    sqlstring.format(
      'INSERT INTO user (email, username, password) VALUES (?,?,?)',
      [email, username, hashedPassword]
    ),
    (error, results, fields) => {
      if (error) {
        err = new Error('Invalid credentials');
        err.functionName = 'userController.createUser';
        err.status = 400;
        next(err);
      }
      else {
        res.locals.auth = true;
        res.locals.userId = results.insertId; // Sends back primary key of created user
        next();
      }
    }
  );
}

// Verifies the user credentials
// Possible extension: For increased security, delay response if error or invalid credentials
userController.verifyUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log('userController.verifyUser: ' + username + ' ' + password);
  sql.query(
    sqlstring.format(
      'SELECT id, username, password FROM user WHERE username = ?',
      [username]
    ),
    (error, results, fields) => {
      if (error) {
        err = new Error('Database error');
        err.functionName = 'userController.verifyUser';
        err.status = 400;
        next(err);
      }
      if (results.length) {
        if (bcrypt.compareSync(password, results[0].password)) {
          res.locals.auth = true;
          res.locals.userId = results[0].id;
          next();
        }
        else {
          err = new Error('Invalid credentials');
          err.functionName = 'userController.verifyUser';
          err.status = 400;
          next(err);
        }
      }
      else {
        err = new Error('Invalid credentials');
        err.functionName = 'userController.verifyUser';
        err.status = 400;
        next(err);
      }
    }
  );
}

module.exports = userController;
