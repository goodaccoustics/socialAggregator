var passport = require('passport');

module.exports = function(app) {
	app.use(passport.initialize());
	app.use(passport.session());
	passport.serializeUser(function(user, done){
        	done(null, user);
	}); //place user object into the session
	passport.deserializeUser(function(user, done){
        	done(null, user);
	});

	require('./strategies/google.strategy')();
	require('./strategies/line.strategy')();
};
