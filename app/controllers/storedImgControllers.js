const { promisify } = require("util");
const cloudinary = require("../../config/cloudinary");
const cloudinaryDelete = promisify(cloudinary.uploader.destroy);
const storedImgService = require("../services/storedImgServices");

module.exports = {
  async getAll(req, res) {
    try {
      const data = await storedImgService.getAll();
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
      const data = await storedImgService.getById(req.params.id);
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

  async getByUserId(req, res) {
    try {
      const data = await storedImgService.getByUserId(req.user.id);
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

  async deleteById(req, res) {
    try {
      const data = await storedImgService.getById(req.params.id);
      if (data) {
        const urlImage = data.linkImg;
        const folderImg = urlImage.split("/")[7] + "/";
        const getPublicId =
          folderImg + urlImage.split("/").pop().split(".")[0] + "";
        // hapus gambar di cloudinary
        await cloudinaryDelete(getPublicId);
        // hapus API
        await storedImgService.delete(req.params.id);
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
