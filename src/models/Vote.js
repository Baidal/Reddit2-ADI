module.exports = (sequelize, Sequelize) => {
    const Vote = sequelize.define("Vote", {
      value: {
          type: Sequelize.INTEGER,
          allowNull: false
      }
    })
  
    return Vote
  }