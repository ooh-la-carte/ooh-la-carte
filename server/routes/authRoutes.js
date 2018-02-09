const router = require('express').Router();
const passport = require('../config/passportConfig.js');

// -----------------------------------------
// consider moving the main login over here
//
// router.get('/login', (req, res) => {
//
// });

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// ------------------------------------------------------------------------------
// redirect processs. First passport.authenticate gets redirect with the code
// in the URI from google ?code=4/ddqPtIz1c2y_qcQsESwG91hHLwfZAIDw49kMoAi9plk
// then passport middle where takes it and asks for more info. ['profile'] in our
// case. The value returned will be filtered through the function passed into
// the google strategy. After which this handler will be called.
//
router.get('/google/redirect', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/',
}));

module.exports = router;
