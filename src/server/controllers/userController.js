let sql = require('../config.js');
let sqlstring = require('sqlstring');

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userController = {};

// Creates a new user in the database with bcrypt
userController.createUser = (req, res, next) => {
  console.log(req.body)
  const hashedPassword = bcrypt.hashSync(req.body.password, SALT_WORK_FACTOR);
  sql.query(
    sqlstring.format(
      'INSERT INTO user (email, username, password) VALUES (?,?,?)',
      [req.body.email, req.body.username, hashedPassword]
    ),
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      else {
        res.locals.userId = results.insertId; // Sends back primary key of created user
        return next();
      }
    }
  );
};

// Verifies the user credentials
// Possible extension: For increased security, delay response if error or invalid credentials
userController.verifyUser = (req, res, next) => {
  sql.query(
    sqlstring.format(
      'SELECT id, username, password FROM user WHERE username = ?',
      [req.body.username]
    ),
    (err, results, fields) => {
      if (err) return res.status(500).send(err);
      if (results.length) {
        if (bcrypt.compareSync(req.body.password, results[0].password)) {
          res.locals.userId = results[0].id;
          return next();
        }
      }
      return res.status(400).send('Invalid credentials');
    }
  );
};

module.exports = userController;
