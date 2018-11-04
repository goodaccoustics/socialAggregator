var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
//var errorRouter = require('./routes/error');
// added by Justin Lim
var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new GoogleStrategy({
	clientID: '609318490070-2bau1106rjghkh3mp21npps6oi15ruk9.apps.googleusercontent.com',
	clientSecret: 'TjeiDLZPtDzX3lOD7AYZuaF7',
	callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	function(req, accessToken, refreshToken, profile, done){
		// set up user in your app database
		done(null, profile);
	}
));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//jl for passport
app.use(session({secret: 'anything'}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done){
	done(null, user);
}); //place user object into the session
passport.deserializeUser(function(user, done){
	done(null, user);
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
//app.user('/error', errorRouter);
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
