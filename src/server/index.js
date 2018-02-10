// Set up express server
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);

// Multer parses multipart form data
const multer = require('multer');

// Socket.io
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

// Controllers
const postController = require('./controllers/postController');
const commentController = require('./controllers/commentController');

// Start Server
server.listen(port, function () {
  console.log(`Server listening at port ${port}`);
});

// Serve all static files (index.html, image files, etc) from the root directory.
app.use(express.static(__dirname + './../../'));

// This "storage" definition is only necessary so that we can append the extension to the filename.
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    let extension = '.' + file.mimetype.split('/')[1]
    cb(null, Date.now() + extension);
  }
});
const upload = multer({ storage });
// if the client wants to access the file, they just navigate to '/uploads/:filename'



// ROUTES

// Create New Post (with image)
app.post('/newPost',
  upload.single('photo'),
  postController.create,
  function(req, res, next) {
    res.status(200).send(req.file.filename); // Send the new filename back to the client
  }
);


// Get all posts (to render on the homepage)
app.get('/getAllPosts',
  postController.read
)


// Comment on a Post (with image)
app.post('/newComment',
  upload.single('photo'),
  commentController.add
);


// Get all comments on a particular post
app.get('/:post_id',
  commentController.getAllComments
)


io.on('connection', function(socket) {
  socket.on('new post', function(data) {
  // listen for 'new post' from any client, then emit 'new post' to all subscribing clients so that they can append the new posts to the dom.
  });

  socket.on('new comment', function(data) {

  });
});
