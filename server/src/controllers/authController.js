import express from "express";
import passport from "passport";

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleAuthCallback = [
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect to the desired page
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  },
];

export default { googleAuth, googleAuthCallback };
