const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const moment = require('moment');
const jwt = require("jwt-simple");
const passport = require('passport');
const jwtExpirationInterval = 1440;
const pwEncruptionKey = 'iLkJSGhPi_sjjKIUWBCV_QWEFjkIKJHDFGlSgfsF';
const LocalStrategy = require("passport-local").Strategy;

exports.signup = async (req, res, next) => {
	try {
		let { firstname, lastname, email, password, repeatPassword } = req.body;

		if (email && password && repeatPassword) {
			if (password != repeatPassword)
				return res
					.status(400)
					.send({ status: false, message: "Password do not match" });
			email = email.toLowerCase();
			let user = await User.findOne({ email });
			if (user) {
				return res
					.status(409)
					.send({ status: false, message: "User already exists" });
			}

            password = await bcrypt.hash(password, 10);
			let payload = {
                firstname,
                lastname,
				email,
				password,
			};

			user = await User.create(payload);


            const tokenMeta = {
                exp: moment().add(jwtExpirationInterval, "minutes").unix(),
                iat: moment().unix(),
                sub: user._id,
            };
            var accessToken = jwt.encode(tokenMeta, pwEncruptionKey);
            user.accessToken = accessToken;


            const decode = await jwt.decode(accessToken, pwEncruptionKey);
            console.log("decode", decode);

			return res.status(200).send({
				status: true,
				message:
					"User registered successfully. Please check your email to verify.",
				data: user,
			});
		} else
			return res.status(400).send({
				status: false,
				message: "Required fields are missing",
			});
	} catch (error) {
		next(error);
	}
};

exports.login = async (req, res, next) => {
	try {
		let { email, password } = req.body;
		passport.use(
			new LocalStrategy(
				{ usernameField: "email" },
				(username, password, done) => {
					User.findOne(
						{ email: username },
						(err, user) => {
							if (err) return done(err);
							else if (!user)
								// unregistered email
								return done(null, false, {
									success: false,
									message: "Incorrect email or password",
								});
							else if (!bcrypt.compareSync(password, user.password))
								// wrong password
								return done(null, false, {
									success: false,
									message: "Incorrect email or password",
								});
							else return done(null, user);
						}
					);
				}
			)
		);

		// call for passport authentication
		passport.authenticate("local", async (err, user, info) => {

			if (err)
				return res.status(400).send({
					err,
					success: false,
					message: "Oops! Something went wrong while authenticating",
				});
			// registered user
			else if (user) {

                const tokenMeta = {
                    exp: moment().add(jwtExpirationInterval, "minutes").unix(),
                    iat: moment().unix(),
                    sub: user._id,
                };
                var accessToken = jwt.encode(tokenMeta, pwEncruptionKey);
                user.accessToken = accessToken;
                return res.status(200).send({
					user,
					success: true,
					message: "Logged In successfully",
				});
			}
			// unknown user or wrong password
			else
				return res.status(400).send({
					success: false,
					message: "Incorrect email or password",
				});
		})(req, res);
	} catch (error) {
		return next(error);
	}
};




