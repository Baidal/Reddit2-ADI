module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("Post", {
    title: {
      type: Sequelize.STRING(250),
      allowNull: false,
    },
    text: {
      type: Sequelize.STRING(2000),
    },
    url_image: {
      type: Sequelize.STRING,
    },
    votes: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  });

  return Post;
};
