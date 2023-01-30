const GoogleStrategy = require("passport-google-oauth20").Strategy;
import mongoose = require("mongoose");
import { User } from "../models/user";
import { getAccessToken, getRefreshToken } from "../utils/helpers/genJwt";

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/register/google/callback",
      },
      async (accessTokenGoogle, refreshTokenGoogle, profile, done) => {
        //get the user data from google
        const newUser = {
          _id: profile.id,
          username: profile.displayName,
          pfp: profile.photos[0].value,
          email: profile.emails[0].value,
        };

        const accessToken = getAccessToken(newUser);
        const refreshToken = getRefreshToken(newUser);

        try {
          let user = await User.findOne({ _id: profile.id });

          if (user) {
            done(null, { ...user, accessToken, refreshToken });
          } else {
            user = await User.create(newUser);
            done(null, { ...user, accessToken, refreshToken });
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
