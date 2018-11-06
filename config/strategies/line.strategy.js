var passport = require('passport');
var LineStrategy = require('passport-line').Strategy;

module.exports = function() {
	passport.use(new LineStrategy({
				channelID: '1619516064',
				channelSecret: '6f284dc464f550b77afd4ea4a95cd8a1',
				callbackURL: 'http://localhost:3000/auth/line/callback'
			}, function(accessToken, refreshToken, profile, done){
				console.log(profile);

				var user = {};
				user.email = '';
				user.image = profile.pictureUrl;
				user.displayName = profile.displayName;
				user.line = {};
				user.line.id = profile.id;
				user.line.token = accessToken;
				done(null, user);
			}
	));

};
