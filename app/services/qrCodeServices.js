const { QRCode } = require("../models");

module.exports = {
  getAll() {
    try {
      return QRCode.findAll();
    } catch (error) {
      throw error;
    }
  },

  getById(id) {
    try {
      return QRCode.findOne({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  create(userId, createArgs) {
    try {
      return QRCode.create({
        ...createArgs,
        userId: userId,
      });
    } catch (error) {
      throw error;
    }
  },

  update(id, userId, updateArgs) {
    try {
      return QRCode.update(updateArgs, {
        where: {
          id: id,
          userId: userId,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  delete(id) {
    try {
      return QRCode.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  },
};
