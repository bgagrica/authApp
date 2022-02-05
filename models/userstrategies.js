'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserStrategies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users}) {
      // define association here
      this.belongsTo(Users, { foreignKey: 'userId', as: 'user' });

    }
  };
  UserStrategies.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: DataTypes.STRING,
    data: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserStrategies',
    logging: false
  });
  return UserStrategies;
};