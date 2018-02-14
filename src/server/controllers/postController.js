let sql = require("../config.js");
let sqlstring = require("sqlstring");

const postController = {};

postController.paramsToLocal = (req, res, next) => {
  res.locals.id = req.params.id;
  console.log(`postController.paramsToLocal  ${req.params.id}`);
  next();
}

postController.create = (req, res, next) => {
  const { user_id, title, link } = req.body;
  const img = req.file.filename;
  // multer creates the req.file object
  // console.log("postController.create: req.file ", req.file);
  sql.query(
    sqlstring.format(
      "INSERT INTO post (user_id,title,link,img) VALUES (?,?,?,?)",
      [user_id, title, link, img]
    ),
    function(error, results, fields) {
      if (error) {
        err = new Error('Database Error');
        err.functionName = 'postController.create';
        err.status = 400;
        next(err);
      }
      res.locals.id = results.insertId;
      next();
    }
  );
}

postController.read = (req, res, next) => {
  const postId = res.locals.id;
  console.log(`postController.read  ${res.locals.id}`)
  sql.query(
    sqlstring.format("SELECT * FROM post WHERE post_id=?", [postId]),
    function(error, results, fields) {
      if (error) {
        err = new Error('Database Error');
        err.functionName = 'postController.read';
        err.status = 400;
        next(err);
      }
      res.locals.post = results;
      console.log(`postController.read  ${results}`);
      next();
    }
  );
}

postController.getAllPosts = (req, res, next) => {
  sql.query(sqlstring.format("SELECT * FROM post"), function(
    error,
    results,
    fields
  ) {
    if (error) {
      err = new Error('Database Error');
      err.functionName = 'postController.getAllPosts';
      err.status = 400;
      next(err);
    }
    res.locals.posts = results;
    next();
  });
}

module.exports = postController;
