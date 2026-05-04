import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.VITE_GOOGLE_CLIENT_ID,
      clientSecret: process.env.VITE_GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google profile:", profile);
       /*  console.log("Hello", profile.displayName); */
        /*   const user = await User.findOne({ googleId: profile.id });


        if (!user) {
          const newUser = await User.create({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          });
        }
 */
        return done(null, profile);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

//serilize and deserialize user
passport.serializeUser((user, done) => done(null, user.id)); //saving userId to session

//retrieving user from session using the userId
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default passport;
