const bcrypt = require('bcrypt')

module.exports = {
  comparePasswords(plainPass, encrypedPass) {
    return bcrypt.compare(plainPass, encrypedPass);
  },
};
