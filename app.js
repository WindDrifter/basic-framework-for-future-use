var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('./utils/config')
const MongoURI = config.MONGODB_URI

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
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

app.use(session({
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: config.SESSION_SECRET,
  saveUninitialized: true,
  resave: false
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/client/build/index.html')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.use('/users', usersRouter);

module.exports = app;
