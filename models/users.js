'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({UserStrategies,Blogs}) {
      // define association here
      this.hasMany(UserStrategies, { foreignKey: 'userId', as: 'strategies', onDelete: 'cascade', hooks: true });
      this.hasMany(Blogs, { foreignKey: 'userId', as: 'blogs', onDelete: 'cascade', hooks: true });

    }
  };
  Users.init({
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Must be a valid email'
        }
      }
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: DataTypes.STRING,
    canMakeBlogs: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    role:DataTypes.STRING,//user/moderator/admin
  }, {
    sequelize,
    modelName: 'Users',
    logging: false
  });
  return Users;
};