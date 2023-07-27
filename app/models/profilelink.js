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
      displayName: DataTypes.STRING,
      description: DataTypes.STRING,
      profilePic: DataTypes.STRING,
      projectLink: DataTypes.ARRAY(DataTypes.STRING),
      design: DataTypes.JSON,
      facebook: DataTypes.STRING,
      instagram: DataTypes.STRING,
      youtube: DataTypes.STRING,
      tiktok: DataTypes.STRING,
      twitter: DataTypes.STRING,
      linkedin: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ProfileLink",
    }
  );
  return ProfileLink;
};
