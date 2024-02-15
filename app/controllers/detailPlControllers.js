const { promisify } = require("util");
const cloudinary = require("../../config/cloudinary");
const cloudinaryUpload = promisify(cloudinary.uploader.upload);
// const cloudinaryDelete = promisify(cloudinary.uploader.destroy);
const detailPlService = require("../services/detailPlServices");
const storedImgService = require("../services/storedImgServices");

module.exports = {
  async getAll(req, res) {
    try {
      const data = await detailPlService.getAll();
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
      const data = await detailPlService.getById(req.params.id);
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

  async create(req, res) {
    try {
      const requestFile = req.file;
      if (
        requestFile === null ||
        requestFile === undefined ||
        requestFile === ""
      ) {
        const data = await detailPlService.create({
          ...req.body,
          image: null,
        });
        res.status(201).json({
          status: true,
          message: "Successfully create data",
          data,
        });
      } else {
        const fileBase64 = requestFile.buffer.toString("base64");
        const file = `data:${requestFile.mimetype};base64,${fileBase64}`;
        const result = await cloudinaryUpload(file, {
          folder: "linkImage",
          resource_type: "image",
          allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
        });
        const url = result.secure_url;
        // create API stored image
        await storedImgService.create(req.user.id, {
          linkImg: url,
        });
        const data = await detailPlService.create({
          ...req.body,
          image: url,
        });
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

  async update(req, res) {
    try {
      const getData = await detailPlService.getById(req.params.id);
      const urlImage = getData.image;
      const reqFile = req.file;
      if (getData === null) {
        res.status(404).json({
          status: false,
          message: "Data not found",
        });
      } else {
        if (urlImage === null) {
          if (reqFile === null || reqFile === undefined || reqFile === "") {
            // update data API
            await detailPlService.update(req.params.id, {
              ...req.body,
              image: null,
            });
            const data = await detailPlService.getById(req.params.id);
            res.status(200).json({
              status: true,
              message: "Successfully update data",
              data,
            });
          } else {
            const fileBase64 = reqFile.buffer.toString("base64");
            const file = `data:${reqFile.mimetype};base64,${fileBase64}`;
            const result = await cloudinaryUpload(file, {
              folder: "linkImage",
              resource_type: "image",
              allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
            });
            const url = result.secure_url;
            // create API stored image
            await storedImgService.create(req.user.id, {
              linkImg: url,
            });
            // update data API
            await detailPlService.update(req.params.id, {
              ...req.body,
              image: url,
            });
            const data = await detailPlService.getById(req.params.id);
            res.status(200).json({
              status: true,
              message: "Successfully update data",
              data,
            });
          }
        } else {
          if (reqFile === null || reqFile === undefined || reqFile === "") {
            // update data API
            await detailPlService.update(req.params.id, {
              ...req.body,
              image: urlImage,
            });
            const data = await detailPlService.getById(req.params.id);
            res.status(200).json({
              status: true,
              message: "Successfully update data",
              data,
            });
          } else {
            // upload link image ke cloudinary
            const fileBase64 = reqFile.buffer.toString("base64");
            const file = `data:${reqFile.mimetype};base64,${fileBase64}`;
            const result = await cloudinaryUpload(file, {
              folder: "linkImage",
              resource_type: "image",
              allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
            });
            const url = result.secure_url;
            // create API stored image
            await storedImgService.create(req.user.id, {
              linkImg: url,
            });
            // update data API
            await detailPlService.update(req.params.id, {
              ...req.body,
              image: url,
            });
            const data = await detailPlService.getById(req.params.id);
            res.status(200).json({
              status: true,
              message: "Successfully update data",
              data,
            });
          }
        }
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
      const data = await detailPlService.getById(req.params.id);
      if (data) {
        // menghapus seluruh data API-nya
        await detailPlService.delete(req.params.id);
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
