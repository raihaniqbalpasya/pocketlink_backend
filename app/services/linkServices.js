const { Link } = require("../models");

module.exports = {
  getAll() {
    try {
      return Link.findAll();
    } catch (error) {
      throw error;
    }
  },

  getAllByUserId(userId) {
    try {
      return Link.findAll({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  getById(id) {
    try {
      return Link.findOne({
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
      return Link.create({
        ...createArgs,
        userId: userId,
      });
    } catch (error) {
      throw error;
    }
  },

  update(id, userId, updateArgs) {
    try {
      return Link.update(updateArgs, {
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
      return Link.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  },
};
