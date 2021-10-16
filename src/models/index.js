const highlight = require("cli-highlight").highlight;
const dotenv = require("dotenv");
dotenv.config();

const dbConfig = require("../config/dbConf");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.STRING, {
  logging(log) {
    console.log(highlight(log, { language: "sql", ignoreIllegals: true }));
  },
});

const db = {
  Sequelize,
  sequelize,
};

db.User = require("./User")(sequelize, Sequelize);
db.Community = require("./Community")(sequelize, Sequelize);
db.Post = require("./Post")(sequelize, Sequelize);
db.Comment = require("./Comment")(sequelize, Sequelize);
db.Vote = require('./Vote')(sequelize,Sequelize)

//RELATIONSHIPS

/** One to many between user an community. Any user can have many
 * communities, and a community has one user.
 *
 */
db.User.hasMany(db.Community, { foreignKey: { allowNull: false } });
db.Community.belongsTo(db.User);

/**
 * Many to many between user and community. An user can follow many
 * communities, and a community can be followed by many users.
 */
db.User.belongsToMany(db.Community, { through: "user_community" });
db.Community.belongsToMany(db.User, { through: "user_community" });

/**
 * One to many between post and user. A post must have an user, and a user
 * can have many posts.
 */
db.User.hasMany(db.Post, { foreignKey: { allowNull: false } });
db.Post.belongsTo(db.User);

/**
 * One to many between comment and user. An user can have many comments, and
 * a comment must have an user.
 */
db.User.hasMany(db.Comment, { foreignKey: { allowNull: false } });
db.Comment.belongsTo(db.User);

/**
 * One to many between vote and user. An user can have many votes, and a 
 * vote must have an user.
 */
db.User.hasMany(db.Vote, { foreignKey: { allowNull: false } });
db.Vote.belongsTo(db.User);

/**
 * One to many between vote and post. A post can have many votes, and a 
 * vote can have a post. If the vote does not have any post associated to it,
 * it will have a comment.
 */
db.Post.hasMany(db.Vote);
db.Vote.belongsTo(db.Post);

/**
 * One to many between vote and comment. A comment can have many votes, and a 
 * vote can have a comment. If the vote does not have any comment associated to it,
 * it will have a Post.
 */
db.Comment.hasMany(db.Vote);
db.Vote.belongsTo(db.Comment);

/**
 * Many to many between comments. Each comment can have a subcomment.
 */
db.Comment.belongsToMany(db.User, {as: 'subComments', through: 'comment_comment'})

/**
 * One to many between a community and posts. Each community can have many
 * posts, and a post must have one community. 
 */
db.Community.hasMany(db.Post, { foreignKey: { allowNull: false } })
db.Post.belongsTo(db.Community)

/**
 * One to many between a post and comments. Each post can have many comments
 * and each comment must have a post
 */
db.Post.hasMany(db.Comment, { foreignKey: { allowNull: false } })
db.Comment.belongsTo(db.Post)
module.exports = db;

