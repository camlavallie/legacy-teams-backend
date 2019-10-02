const cors = require("cors");

module.exports = function(app) {
  // Set up a whitelist and check against it:
  var whitelist = ['http://www.legacyteams.net']
  var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

  // Then pass them to cors:
  app.use(cors(corsOptions));
};
