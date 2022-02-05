'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users,Comments}) {
      // define association here
      this.belongsTo(Users, { foreignKey: 'userId', as: 'user' });
      this.hasMany(Comments, { foreignKey: 'blogId', as: 'comments', onDelete: 'cascade', hooks: true });
    }
  };
  Blogs.init({
    name: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    body: DataTypes.STRING,
    category: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Blogs',
    logging: false
  });
  return Blogs;
};