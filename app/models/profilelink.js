"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProfileLink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProfileLink.init(
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      profileImage: DataTypes.STRING,
      description: DataTypes.STRING,
      backgroundImage: DataTypes.STRING,
      designPattern: DataTypes.JSON,
      listOfLinks: DataTypes.JSON,
      socialMedia: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "ProfileLink",
    }
  );
  return ProfileLink;
};
