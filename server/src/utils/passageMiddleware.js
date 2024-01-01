const Passage = require('@passageidentity/passage-node');
require('dotenv').config();

const passageConfig = {
  appID: process.env.PASSAGE_APP_ID,
  apiKey: process.env.PASSAGE_API_KEY,
};

// example of passage middleware
let passage = new Passage(passageConfig);
let passageAuthMiddleware = (() => {

  return async (req, res, next) => {
    try {
      let userId = await passage.authenticateRequest(req);
      let user = await passage.user.get(userId);
      if (user) {
        // user authenticated
        res.user = user;
        next();
      }
    } catch (e) {
      // failed to authenticate
      console.log(e);
      res.status(401).send('Could not authenticate user!');
    }
  }
})();

module.exports = passageAuthMiddleware;