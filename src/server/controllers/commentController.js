// MySQL db connection
let sql = require('../config.js');
let sqlstring = require('sqlstring');

const commentController = {};

commentController.paramsToLocal = (req, res, next) => {
  res.locals.id = req.params.id;
  console.log(`commentController.paramsToLocal  ${req.params.id}`);
  next();
}

commentController.create = (req, res, next) => {
    // add post_id, user_id, img (name as stored on server), caption. created_at will default to current time.
    const postId = req.body.post_id;
    const userId = req.body.user_id;
    const img = req.file.filename;
    const caption = req.body.caption;
    sql.query(
      sqlstring.format(
        'INSERT INTO comments (post_id, user_id, img, caption) VALUES (?,?,?,?)',
        [postId, userId, img, caption]
      ),
      (error, result) => {
        if (error) {
          err = new Error('Database Error');
          err.functionName = 'commentController.create';
          err.status = 400;
          next(err);
        }
        if (result) {
          res.locals.id = result.insertId;
          next();
        } 
        //the id of the comment is stored in result.insertId
        // we probably also want to send the image name, so that the client can display the image.
      }
    );
  }

  commentController.read = (req,res,next) =>{
    const commentId = res.locals.id;
    sql.query(sqlstring.format('SELECT * FROM comments WHERE id=?',[commentId]), function(
      error,
      results,
      fields
    ) {
      if (error) {
        err = new Error('Database Error');
        err.functionName = 'commentController.read';
        err.status = 400;
        next(err);
      }
      console.log(`commentController.read ${results}`)
      res.locals.comment = results[0];
      next()
    });
  }

  commentController.getPostComments = (req, res, next) => {
    const postId = req.params.id;
    sql.query(
      sqlstring.format('SELECT * FROM comments WHERE post_id=?', [postId]),
      function(error, results, fields) {
        if (error) {
          err = new Error('Database Error');
          err.functionName = 'commentController.getPostComments';
          err.status = 400;
          next(err);
        }
        if (results) {
          res.locals.comments = results;
          next();
        }
      }
    );
  }

  module.exports = commentController;
