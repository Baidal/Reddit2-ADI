module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("Comment", {
    text: {
      type: Sequelize.STRING(2000),
    },
    votes: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    is_subComment: {
      type: Sequelize.BOOLEAN,
      required: true
    }
  });

  return Comment;
};
