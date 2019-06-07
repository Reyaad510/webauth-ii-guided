const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const SessionStore = require('connect-session-knex')(session);

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();
const sessionConfig = {
  name: 'monkey',
  secret: 'super secret string',
  resave: false,
  saveUninitialized: false, // prevent setting cookie automatically
  cookie: {
    maxAge: 60 * 60 * 1000,
    // secure: false,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    httpOnly: true
  },
  store: new SessionStore({
    knex: require('../database/dbConfig'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createTable: true, // if didn't have table
    clearInterval: 60 * 60 * 1000, // time in ms that will clear session
    
  })
}

server.use(session(sessionConfig))
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
