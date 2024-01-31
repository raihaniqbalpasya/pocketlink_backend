const { DetailPL } = require("../models");

module.exports = {
  getAll() {
    try {
      return DetailPL.findAll();
    } catch (error) {
      throw error;
    }
  },

  getById(id) {
    try {
      return DetailPL.findOne({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  create(createArgs) {
    try {
      return DetailPL.create(createArgs);
    } catch (error) {
      throw error;
    }
  },

  update(id, updateArgs) {
    try {
      return DetailPL.update(updateArgs, {
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  delete(id) {
    try {
      return DetailPL.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  },
};
