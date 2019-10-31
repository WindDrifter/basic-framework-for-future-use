var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
const mongoose = require('mongoose')
const session = require('express-session');
const passport = require('passport'), 
LocalStrategy = require('passport-local').Strategy;;
const MongoStore = require('connect-mongo')(session);
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const indexRouter = require('./controllers/index');
const usersRouter = require('./controllers/users');
const User = require('./models/user')
const MongoURI = config.MONGODB_URI
const uuidv4 = require('uuid/v4');

var app = express();
mongoose.connect(MongoURI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true 
 })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })
app.use(passport.initialize());

app.use(passport.session({
  store: new MongoStore(
    { mongooseConnection: mongoose.connection, 
      autoRemove: 'interval',
      touchAfter: 1, 
    }),
  genid: function(req) {
    return uuidv4()
  },
  secret: config.SESSION_SECRET,
  saveUninitialized: false,
  resave: false
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/client/build/index.html')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
passport.use('login', new LocalStrategy(
  function(username, password, done) {
    User.findOne().or({ username: username, email: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

module.exports = app;
