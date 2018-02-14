


const cookieController = {};

/**
* setCookie - set a cookie with a random number
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
* @param next - Callback with signature ([err])
*/
cookieController.setCookie = (req, res, next) => {
    const cookieValue = res.locals.userId;
    console.log('cookie time');
    res.cookie('ssid', cookieValue, { httpOnly: true });
    next();
}

/**
* setSSIDCookie - store the supplied id in a cookie
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
* @param next - Callback with signature ([err])
*/
cookieController.setSSIDCookie = (req, res, next) => {
    if (res.locals.userId !== undefined) {
        res.cookie('ssid', res.locals.userId, { httpOnly: true });
        console.log('Cookie being set', res.locals.userId);
    }
    next();
}

module.exports = cookieController;
