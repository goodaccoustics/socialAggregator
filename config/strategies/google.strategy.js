var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../models/userModel');

module.exports = function () {
	passport.use(new GoogleStrategy({
        	clientID: '609318490070-2bau1106rjghkh3mp21npps6oi15ruk9.apps.googleusercontent.com',
        	clientSecret: 'TjeiDLZPtDzX3lOD7AYZuaF7',
        	callbackURL: 'http://localhost:3000/auth/google/callback'
        	},
        	function(req, accessToken, refreshToken, profile, done){
                	// set up user in your app database

			var user = {};

			var query = {
				'google.id': profile.id
			};
			User.findOne(query, function(error, user) {
				if (user) {
					console.log('found');
					done(null, user);
				} else {
					console.log('not found');
					var user = new User;
                        		user.email = profile.emails[0];
                        		user.image = profile._json.image.url;
                        		user.displayName = profile.displayName;
                        		user.google = {};
                        		user.google.id = profile.id;
                        		user.google.token = accessToken;
					user.save();
                        		done(null, user);
				}
			});


        	}
	));
};
