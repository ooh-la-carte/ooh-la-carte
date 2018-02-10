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
  /* eslint-disable */
  const image = profile._json.image.isDefault ? false : profile.photos[0].value;
  User.findUserByGoogleEmail(profile.id).then();
  const info = {
    type: 'google',
    name: profile.displayName,
    id: profile.id,
    img: image,
    email: profile.emails[0].value,
  };

  if (profile._json.placesLived) {
    let array = profile._json.placesLived[0].value.split(/,?\s+/);
    info.city = array[0];
    info.state = array[1];
    info.zip = array[2];
  }
  /* eslint-enable */

  User.insertOAuth(info);
  done(null, 1);
}));


module.exports = passport;
