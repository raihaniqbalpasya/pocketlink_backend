'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QRCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  QRCode.init({
    userId: DataTypes.INTEGER,
    qrValue: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'QRCode',
  });
  return QRCode;
};