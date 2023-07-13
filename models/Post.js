const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");

//Initialize the Post model by extending off Sequelize's Model class
class Post extends Model {}

//Set up the fields and rules for the Post model
Post.init(
  {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
  },
  {
    sequelize,
  }
);

module.exports = Post;
