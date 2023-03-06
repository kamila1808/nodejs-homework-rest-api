// const passport = require("passport");
// const passportJWT = require("passport-jwt");

// const Users = require("../db/userModel");

// const secret = process.env.SECRET;

// const ExtractJwt = passportJWT.ExtractJwt;
// const Strategy = passportJWT.Strategy;

// const params = {
//   secretOrKey: secret,
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// };
// passport.use(
//   new Strategy(params, async (payload, done) => {
//     Users.find({ _id: payload.id })
//       .token(([user]) => {
//         if (!user) {
//           return done(new Error("User not found"));
//         }
//         return done(null, user);
//       })
//       .catch((err) => done(err));
//   })
// );

// module.exports = secret;

