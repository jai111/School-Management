const { User } = require('../models/User');

function auth(role) {
  return auth[role] || (auth[role] = function(req, res, next) {
    let token = req.cookies.w_auth;

    User.findByToken(token, (err, user) => {
      if (err) throw err;
      if (!user)
        return res.json({
          isAuth: false,
          error: true,
          message: 'Authentication failed'
        });
      if(user.role != role){
        return res.json({
          isAuth: false,
          error: true
        })
      }
  
      req.token = token;
      req.user = user;
      next();
    });
  })
}


module.exports = { auth };
