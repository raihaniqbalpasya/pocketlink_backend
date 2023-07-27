'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Custom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Custom.init({
    color: DataTypes.STRING,
    shape: DataTypes.STRING,
    theme: DataTypes.STRING,
    iconSM: DataTypes.STRING,
    font: DataTypes.STRING,
    border: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Custom',
  });
  return Custom;
};