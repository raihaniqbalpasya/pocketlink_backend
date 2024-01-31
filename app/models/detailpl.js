"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DetailPL extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.ProfileLink, { foreignKey: "profileLinkId" });
    }
  }
  DetailPL.init(
    {
      profileLinkId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      directLink: DataTypes.STRING,
      designPattern: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "DetailPL",
    }
  );
  return DetailPL;
};
