let sql = require('../config.js');
let sanatize = require('sqlstring');
module.exports = {
  create: function(req, res, next) {
    const { user_id, title, link} = req.body;
    const img = req.file.filename;
    sql.query(
      sanatize.format(
        'INSERT INTO post (user_id,title,link,img) VALUES (?,?,?,?)',
        [user_id, title, link, img]
      ),
      function(err, results, fields) {
        if (err) return res.send(err);
        next();
      }
    );
  },

  read: function(req, res, next) {
    sql.query(sanatize.format('SELECT * FROM post'), function(
      err,
      results,
      fields
    ) {
      if (err) {
        return res.send(err);
      }
      res.json(results);
    });
  },

  readOne: function(req,res,next){
    sql.query(sanatize.format('SELECT * FROM post WHERE post_id=?',[req.params.id]), function(
      err,
      results,
      fields
    ) {
      if (err) {
        return res.send(err);
      }
      res.send(results[0]);
    });
  },

  end: function(req, res, next) {
    sql.end();
    res.json('closed');
  }
};
