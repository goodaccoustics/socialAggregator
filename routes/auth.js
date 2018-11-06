var express = require('express');
var passport = require('passport');
var router = express.Router();

router.route('/google/callback')
	.get(passport.authenticate('google', {
		successRedirect: '/users/',
		failure: '/error/'
	}));


router.route('/google')
	.get(passport.authenticate('google', {
		scope: [
		'profile',
		'email'
		]
	}));

router.route('/line/callback')
	.get(passport.authenticate('line',{
		failureRedirect: '/error/',
		successRedirect: '/users/'
	}));

router.route('/line')
	.get(passport.authenticate('line'));





module.exports = router;
