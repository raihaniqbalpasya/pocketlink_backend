const profileLinkService = require("../services/profileLinkServices");

module.exports = {
  async getAll(req, res) {
    try {
      const data = await profileLinkService.getAll(); // Seluruh data tanpa paginasi
      // Respon yang akan ditampilkan jika datanya ada
      if (data.length >= 1) {
        res.status(200).json({
          status: true,
          message: "Successfully get all data",
          data,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "Data empty, Please input some data!",
        });
      }
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },

  async getById(req, res) {
    try {
      const data = await profileLinkService.getById(req.params.id);
      if (data !== null) {
        res.status(200).json({
          status: true,
          message: "Successfully get data by id",
          data,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "Data not found",
        });
      }
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },

  async getMyProfile(req, res) {
    try {
      const data = await profileLinkService.getMyProfile(req.user.id);
      if (data !== null) {
        res.status(200).json({
          status: true,
          message: "Successfully get my profile",
          data,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "Data empty, Please input some data!",
        });
      }
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },

  async searchByProfileLink(req, res) {
    try {
      const data = await profileLinkService.searchByProfileLink(
        req.query.profileLink
      );
      if (data.length >= 1) {
        res.status(200).json({
          status: true,
          message: "Successfully get all data",
          data,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "Data not found",
        });
      }
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },

  async create(req, res) {
    try {
      const getData = await profileLinkService.getMyProfile(req.user.id);
      if (getData !== null) {
        res.status(409).json({
          status: false,
          message: "Data already exist",
        });
      } else {
        const data = await profileLinkService.create(req.user.id, req.body);
        res.status(201).json({
          status: true,
          message: "Successfully create data",
          data,
        });
      }
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },

  async updateMyProfile(req, res) {
    try {
      const getData = await profileLinkService.getMyProfile(req.user.id);
      if (getData === null || getData.userId !== req.user.id) {
        res.status(404).json({
          status: false,
          message: "Data not found",
        });
      } else {
        await profileLinkService.update(req.user.id, req.body);
        const data = await profileLinkService.getMyProfile(req.user.id);
        res.status(200).json({
          status: true,
          message: "Successfully update data",
          data,
        });
      }
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },

  async deleteById(req, res) {
    try {
      const data = await profileLinkService.delete(req.params.id);
      if (data === 1) {
        res.status(200).json({
          status: true,
          message: "Successfully delete data",
        });
      } else {
        res.status(404).json({
          status: false,
          message: "Data not found",
        });
      }
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },
};
