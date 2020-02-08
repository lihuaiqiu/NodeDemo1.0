var bodyParser = require('body-parser');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongo = require('mongodb');
var monk = require('monk');
var multer  = require('multer');
var db = monk('localhost:27017:/demo1');
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(multer({
  dest: './public/doc',
  rename: function (fieldname, filename) {
    //test=filename;
    return filename;
  }
}));
app.use(session({
  name: 'session-name', // 这里是cookie的name，默认是connect.sid
  secret: 'the_S3cret_y0u_Ne1ver_know', // 建议使用 128 个字符的随机字符串
  resave: true,
  saveUninitialized: false,
  // cookie: { maxAge: 60 * 1000, httpOnly: true }
}));
app.use(function (req, res ,next) {  //先进行中间件处理操作
  req.db=db;
  next();

});
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render("error");
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
