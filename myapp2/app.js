var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser=require('body-parser')
const pug=require('pug');

var indexRouter = require('./routes/index');
var marketRouter = require('./routes/market');
var adminRouter = require('./routes/admin');
// var usersRouter = require('./routes/users');

var controlDB=require('./js/handleDB.js');
var db=require('./js/db.js');

var app = express();
const {sequelize}=require('./models');
sequelize.sync();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


//app.use('*', indexRouter);


app.use('/', indexRouter); 
app.use('/market', marketRouter);
app.use('/admin', adminRouter);
// app.use('./searching',searchRoute);
// app.use('/searching', usersRouter);
 //#2 시퀼라이즈 세팅


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
