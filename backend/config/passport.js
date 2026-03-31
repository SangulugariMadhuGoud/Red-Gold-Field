// Passport configuration for Google OAuth
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import env from "./env.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";

if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/public/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });
          if (user) {
            return done(null, user);
          }

          user = await User.findOne({ email: profile.emails[0].value });
          if (user) {
            user.googleId = profile.id;
            user.photo = profile.photos[0].value;
            user.emailVerified = true;
            user.authProvider = "google";
            await user.save();
            return done(null, user);
          }

          // Create new user
          const randomPassword = crypto.randomBytes(16).toString("hex");
          const hashedPassword = bcrypt.hashSync(randomPassword, 10);

          user = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            fullName: profile.displayName,
            photo: profile.photos[0].value,
            emailVerified: true,
            authProvider: "google",
            password: hashedPassword,
          });

          await user.save();
          done(null, user);
        } catch (error) {
          done(error, null);
        }
      },
    ),
  );
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
