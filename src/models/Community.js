module.exports = (sequelize, Sequelize) => {
  const Community = sequelize.define("Community", {
    name: {
      type: Sequelize.STRING(40),
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(2000)
    }
  })

  return Community
}