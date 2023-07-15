const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");

//Initialize the Post model by extending off Sequelize's Model class
class Post extends Model {}

//Set up the fields and rules for the Post model
Post.init(
  {
    title: DataTypes.STRING(255),
    body: DataTypes.STRING(1000),
  },
  {
    sequelize,
  }
);

module.exports = Post;
