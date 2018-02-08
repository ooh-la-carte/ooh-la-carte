const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../../database/models/user.js');

passport.serializeUser((user, done) => {
  console.log('The serializeUser was called');
  done(null, 2);
});

const googleConfig = {
  clientID: process.env.GOOGLE_APP_ID,
  clientSecret: process.env.GOOGLE_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/redirect',
};

passport.use(new GoogleStrategy(googleConfig, (accessToken, refreshToken, profile, done) => {
  // at this point profile has part of the information we want
  console.log('passport callback function fired');
  done(null, 1);
  // User.insertOAuth({
  //   type: 'google_id',
  //   name: profile.displayName,
  //   id: profile.id,
  // }).then(() => {
  //   console.log('added person');
  //   console.log(accessToken);
  // }, () => {
  //   console.log('already exists');
  //   done();
  // });
}));


module.exports = passport;
