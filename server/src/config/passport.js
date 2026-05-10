import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from './db.js'; 

// const prisma = new PrismaClient();

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
        let user = await prisma.user.findUnique({
          where: { googleId: profile.id },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              role: "RIDER",
            },
          });
        }
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
  const user = await prisma.user.findUnique({
    where: { id },
  });
  done(null, user);
});

export default passport;
