const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const ejs=require("ejs");
const cookieParser = require('cookie-parser');
const cookieSession=require("cookie-session")
const logger = require('morgan');
const mysql=require("mysql");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const goodsRouter=require('./routes/goods')
const multer=require("multer")
const consolidate=require("consolidate")

let app = express();


// view engine setup;
app.set("view engine","html");
app.set("views","views");
app.engine("html",consolidate.ejs);

//文件上传模块;
let multerMiddleware = multer({dest:"./upload"}).any();
app.use(multerMiddleware);

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//cookieSession
let keys=[]
for(let i=0;i<20000;i++){
  keys.push("A"+Math.random()*1000)
}
app.use(cookieSession({
    name:"session",
    keys,
    maxAge:30*60*1000
}))

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goods',goodsRouter);

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
