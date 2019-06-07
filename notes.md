
- yarn add express-session
- register a user
- do login
- Go to server and do below
- const session = require('express-session');
- const sessionConfig = {
  name: 'monkey',
  secret: 'super secret string',
  resave: false,
  saveUninitialized: false, // prevent setting cookie automatically
  cookie: {
    maxAge: 60 * 60 * 1000,
    // secure: false,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    httpOnly: true
  }
}
- server.use(session(sessionConfig))
- go to restricted auth
- module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'You are not authorized' })
  }
}
- create logout -> go to auth-router
- router.get('/logout', restricted, (req, res) => {
  req.session.destroy(err => {
    if(err) {
      console.log(err);
      return res.status(500).json({ message: 'There was an error' });
    }
    res.end();
  })
})
- import restricted to use it in auth-router
- const restricted = require('../auth/restricted-middleware.js');
- npm i connect-session-knex