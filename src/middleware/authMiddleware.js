const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');

exports.auth = async (req, res, next) => {

const token = req.cookies['token'];

if (token) {
try {
   const decodedToken =  await jwt.verify(token, SECRET);
    req.user = decodedToken;
    res.locals.user = decodedToken;
    res.locals.isAuthenticated = true;
   next();
    
} catch (error) {
    res.clearCookie('token')
    res.redirect('/users/login')
}


} else {
    next();
}


}


// use when u need to hide information from non-users
exports.isAuth =  (req, res, next) => {

if(!req.user){
    res.redirect('/users/login');
}

next();

}