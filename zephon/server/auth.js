
// @Virgil Security
// taken from https://github.com/VirgilSecurity/demo-backend-nodejs

const { generateUserToken, pseudoEncodeToken } = require('./validation');

const authenticate = (req, res) => {
  if (!req.body || !req.body.user) {
    res.statusMessage = 'You should specify identity in body';
    res.status(400).end();
    return;
  }
  const token = generateUserToken();

  pseudoEncodeToken(req.body.user, token);

  res.json({ authToken: token });
}

module.exports = { authenticate };