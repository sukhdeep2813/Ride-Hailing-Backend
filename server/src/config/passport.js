import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();


passport.use(new GoogleStrategy({
    clientID : clientID.process.env.VITE_GOOGLE_CLIENT_ID,
    clientSecret : clientSecret.process.env.VITE_GOOGLE_CLIENT_SECRET,
    callbackURL : "/auth/google/callback",
},
async(accessToken, refreshToken, Profiler, donne) =>{
    try {
        const user = await User.findOne({googleId : profile.id});

        if(!user){
            const newUser = await User.create({
                googleId : profile.id,
                displayName : profile.displayName,
                email : profile.emails[0].value,
            });
        }

        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}
));

//serilize and deserialize user
