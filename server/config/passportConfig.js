const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../../database/models/user.js');

passport.serializeUser((userId, done) => {
  done(null, userId);
});

passport.deserializeUser((id, done) => {
  console.log('in deserialize');
  User.findUserById(id).then(user => done(null, user));
});

const googleConfig = {
  clientID: process.env.GOOGLE_APP_ID,
  clientSecret: process.env.GOOGLE_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/redirect',
};

passport.use(new GoogleStrategy(googleConfig, (accessToken, refreshToken, profile, done) => {
  User.findUserByEmail(profile.emails[0].value).then((users) => {
    if (users.length === 0) {
      /* eslint-disable */
      const image = profile._json.image.isDefault ? false : profile.photos[0].value;
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
      return User.insertOAuth(info).then(ids => ids[0]);
    } else if (!users[0].google_id) {
      User.update({
        id: users[0].id,
        google_id: profile.id,
      });
    }
    return users[0].id;
  }).then(id => done(null, id));
}));


module.exports = passport;
