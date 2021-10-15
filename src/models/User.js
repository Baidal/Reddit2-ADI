const bcrypt = require("bcrypt");

function hashPass(user) {
  const SALT_FACTOR = 8;

  if (!user.changed("password")) return;

  return bcrypt
    .genSalt(SALT_FACTOR)
    .then((salt) => bcrypt.hash(user.password, salt))
    .then((hash) => {
      user.setDataValue("password", hash);
    });
}

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    nick: {
      type: Sequelize.STRING(40),
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    url_image: {
      type: Sequelize.STRING,
      allowNull: true
    },
    description: {
      type: Sequelize.STRING(1000),
      allowNull: true
    }

  },
  {
    hooks: {
      beforeCreate: hashPass,
      beforeUpdate: hashPass
    }
  })

  return User
}
