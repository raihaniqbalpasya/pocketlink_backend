const { StoredImg } = require("../models");

module.exports = {
  getAll() {
    try {
      return StoredImg.findAll();
    } catch (error) {
      throw error;
    }
  },

  getById(id) {
    try {
      return StoredImg.findOne({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  getByUserId(userId) {
    try {
      return StoredImg.findOne({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  create(userId, createArgs) {
    try {
      return StoredImg.create({
        ...createArgs,
        userId: userId,
      });
    } catch (error) {
      throw error;
    }
  },

  delete(id) {
    try {
      return StoredImg.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  },
};
