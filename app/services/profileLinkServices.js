const { ProfileLink } = require("../models");

module.exports = {
  getAll() {
    try {
      return ProfileLink.findAll();
    } catch (error) {
      throw error;
    }
  },

  getById(id) {
    try {
      return ProfileLink.findOne({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  getMyProfile(userId) {
    try {
      return ProfileLink.findOne({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  // ------ Sementara gak dipakai ------
  // searchByProfileLink(profileLink) {
  //   try {
  //     return ProfileLink.findAll({
  //       where: {
  //         profileLink: profileLink,
  //       },
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  create(userId, createArgs) {
    try {
      return ProfileLink.create({
        ...createArgs,
        userId: userId,
      });
    } catch (error) {
      throw error;
    }
  },

  update(userId, updateArgs) {
    try {
      return ProfileLink.update(updateArgs, {
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  delete(userId) {
    try {
      return ProfileLink.destroy({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      throw error;
    }
  },
};
