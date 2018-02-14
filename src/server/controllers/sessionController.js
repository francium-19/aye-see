
const sessionController = {};

/**
 * startSession - create a new Session model and then save the new session to the
 * database.
 *
 *
 */
sessionController.startSession = (req, res, next) => {
  //   if (res.locals.auth) {
  //       const newSession = new Session({
  //         cookieId: res.locals.user._id 
  //       });
  //     newSession.save((err, session) => {
  //       if (err) {
  //         res.locals.err = { error: 'Problem creating Session' }
  //       }
  //     });
  //   } 
       next();
  };

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*
*
*/
sessionController.isLoggedIn = (req, res, next) => {
  // console.log('req.cookies ' + req.cookies);
  if (req.cookies !== undefined && req.cookies.ssid !== undefined) { 
    // If they do, compare cookie on database against user _id
    console.log('sessionController.isLoggedIn - they have a cookie and are logged in');
    next();
  } else {
    let err = new Error('You have no cookies!!');
    err.functionName = 'sessionController.isLoggedIn - ';
    err.status = 400;
    next(err);
  }
  next();
};



module.exports = sessionController;
