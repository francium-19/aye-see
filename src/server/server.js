// Set up express server
const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);

// Multer parses multipart form data makes image uploading possible
const multer = require("multer");
const multerStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    let extension = "." + file.mimetype.split("/")[1];
    cb(null, Date.now() + extension);
  }
});
const multerUpload = multer({ storage: multerStorage });

// Body Parsing
const bodyParser = require("body-parser");

// Cookie Handling
const cookieParser = require("cookie-parser");

// Socket.io
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

// Controllers
const userController = require("./controllers/userController");
const postController = require("./controllers/postController");
const commentController = require("./controllers/commentController");
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');

// Body parser Config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cookie parser
app.use(cookieParser());

// Serve all static files (index.html, image files, etc) from the root directory.
app.use(express.static(__dirname + "/../../"));
app.use(express.static(__dirname + "/../../uploads/"));

// ROUTES

// Creates a new user in database
app.post("/signup", 
  userController.createUser, 
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
  res.status(200).json(res.locals.userId);
});

// Verifies credentials for user login
app.post("/login", 
  userController.verifyUser, 
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
  res.status(200).json(res.locals.userId);
});

// Create New Post (with image)
// newPost
app.post("/post/create",
  // sessionController.isLoggedIn,
  multerUpload.single("photo"),
  postController.create,
  postController.read,
  // socketController.postCreated
  (req, res) => {
    res.status(200).json(res.locals.post);
  }
);

// Get specific posts
app.get(
  "/post/:id",
  // sessionController.isLoggedIn,
  postController.paramsToLocal,
  postController.read,
  (req, res) => {
    res.status(200).json(res.locals.post);
  }
);

// old route name - getAllPosts
app.get("/posts", 
  // sessionController.isLoggedIn,
  postController.getAllPosts, 
  (req, res) => {
  res.status(200).json(res.locals.posts);
});

// old route name - newComment
app.post("/post/comment/create",
  // sessionController.isLoggedIn,
  multerUpload.single("photo"),
  commentController.create,
  commentController.read,
  // socketController.commentCreated
  (req, res) => {
    res.status(200).json(res.locals.comment);
  }
);

app.get("/comment/:id",
  // sessionController.isLoggedIn,
  commentController.paramsToLocal,
  commentController.read,
  (req, res) => {
    res.status(200).json(res.locals.comment);
  }
);

app.get("/post/:id/comments",
  // sessionController.isLoggedIn,
  commentController.getPostComments, (req, res) => {
    res.status(200).json(res.locals.comments);
  });

// INTERCEPTS ALL STRAY REQUESTS
app.all("*", (req, res, next) => {
  console.log("catch all on the root");
  err = new Error("Server.js - default catch all route - not found");
  err.functionName = 'app.all("*" catch';
  err.status = 404;
  next(err);
});

// GLOBAL ERROR CATCHER
app.use((err, req, res, next) => {
  const error = err.functionName ? `${err.functionName} ${err}` : err;
  const errorStatus = err.status ? err.status : 500;
  res.status(errorStatus).json(`server.js - ${error}`);
}); 

// socket stuff
io.on("connection", function(socket) {
  socket.on("postCreated", function(data) {
    // listen for 'new post' from any client, then emit 'newPost' to all subscribing clients so that they can append the new posts to the dom.
  });

  socket.on("commentCreated", function(data) {
    // listen for 'new comment' from any client, then emit 'newComment' to all subscribing clients so that they can append the new posts to the dom.
  });
});

// Start Server
server.listen(port, function() {
  console.log(`upload directory path: ${__dirname}`);
  console.log(`Server listening at port ${port}`);
});
