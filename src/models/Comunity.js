module.exports = (sequelize, Sequelize) => {
  const Comunity = sequelize.define("Comunity", {
    name: {
      type: Sequelize.STRING(40),
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    }
  })

  return Comunity
}