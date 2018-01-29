const fakeUsers = [{
  id: 1,
  name: 'Jason',
  email: 'jason@mail.com',
  password: 'jasonpass',
}, {
  id: 2,
  name: 'Jake',
  email: 'jake@mail.com',
  password: 'jakepass',
}, {
  id: 3,
  name: 'Rick',
  email: 'rick@mail.com',
  password: 'rickpass',
}, {
  id: 4,
  name: 'Mark',
  email: 'mark@mail.com',
  password: 'markpass',
}];

const ensureToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

const jwtConfig = {
  jwtSecret: 'super-secret',
  jwtSession: { session: false },
};

const fakeVerifyUser = (username) => {
  let isValidUser;
  fakeUsers.forEach((user) => {
    isValidUser = user.name.toLowerCase() === username || isValidUser;
  });
  return isValidUser;
};

module.exports.ensureToken = ensureToken;
module.exports.jwtConfig = jwtConfig;
module.exports.fakeUsers = fakeUsers;
module.exports.fakeVerifyUser = fakeVerifyUser;
