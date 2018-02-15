const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const passport = require('../config/passportConfig.js');
const jwt = require('jsonwebtoken');

// -----------------------------------------
// consider moving the main login over here
//
// router.get('/login', (req, res) => {
//
// });

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// ------------------------------------------------------------------------------
// redirect processs. First passport.authenticate gets redirect with the code
// in the URI from google ?code=4/ddqPtIz1c2y_qcQsESwG91hHLwfZAIDw49kMoAi9plk
// then passport middle where takes it and asks for more info. ['profile'] in our
// case. The value returned will be filtered through the function passed into
// the google strategy. After which this handler will be called.
//
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  const src = fs.createReadStream(path.join(__dirname, '../../public/index.html'));
  src.pipe(res);
  src.on('end', () => res.end());
});

router.get('/verify', (req, res) => {
  const user = req.user[0];
  const token = jwt.sign({ id: user.id }, 'super-secret');
  // send the token back to the client
  res.json({
    token,
    userId: user.id,
    isChef: user.is_chef,
    username: user.username,
  });
});

module.exports = router;
