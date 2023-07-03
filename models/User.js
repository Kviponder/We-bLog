//Set up const as {} because we don't need the whole sequelize library, just the Model and DataTypes
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");

//Bcrypt is a password hashing function
const bcrypt = require("bcrypt");

class User extends Model {
  //This checks the password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password); //This returns true or false
  }
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4], //This means the password must be at least 4 characters long
      },
    },
  },
  {
    hooks: {
      //This will hash the password before the information is sent to the database
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      //This will hash the password before the information is updated in the database
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        ); //10 is the number of times the password is hashed
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
