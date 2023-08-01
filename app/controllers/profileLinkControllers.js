const { promisify } = require("util");
const cloudinary = require("../../config/cloudinary");
const cloudinaryUpload = promisify(cloudinary.uploader.upload);
const cloudinaryDelete = promisify(cloudinary.uploader.destroy);
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
      const requestFile = req.file;
      const getData = await profileLinkService.getMyProfile(req.user.id);
      if (getData === null || getData.userId !== req.user.id) {
        res.status(404).json({
          status: false,
          message: "Data not found",
        });
      } else {
        const urlImage = getData.profilePic;
        if (urlImage === null || urlImage === "") {
          if (
            requestFile === null ||
            requestFile === undefined ||
            requestFile === ""
          ) {
            await profileLinkService.update(req.user.id, {
              ...req.body,
              profilePic: null,
            });
            const data = await profileLinkService.getMyProfile(req.user.id);
            res.status(200).json({
              status: true,
              message: "Successfully update data",
              data,
            });
          } else {
            const fileBase64 = requestFile.buffer.toString("base64");
            const file = `data:${requestFile.mimetype};base64,${fileBase64}`;
            const result = await cloudinaryUpload(file, {
              folder: "linkProfilePic",
              resource_type: "image",
              allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
            });
            const url = result.secure_url;
            await profileLinkService.update(req.user.id, {
              ...req.body,
              profilePic: url,
            });
            const data = await profileLinkService.getMyProfile(req.user.id);
            res.status(200).json({
              status: true,
              message: "Successfully update data",
              data,
            });
          }
        } else {
          // mengambil url gambar dari cloudinary dan menghapusnya
          const getPublicId =
            "linkProfilePic/" + urlImage.split("/").pop().split(".")[0] + "";
          await cloudinaryDelete(getPublicId);
          if (requestFile === null || requestFile === undefined) {
            await profileLinkService.update(req.user.id, {
              ...req.body,
              profilePic: null,
            });
            const data = await profileLinkService.getMyProfile(req.user.id);
            res.status(200).json({
              status: true,
              message: "Successfully update data",
              data,
            });
          } else {
            // mengambil url gambar dari cloudinary dan menghapusnya
            const getPublicId =
              "linkProfilePic/" + urlImage.split("/").pop().split(".")[0] + "";
            await cloudinaryDelete(getPublicId);

            const fileBase64 = requestFile.buffer.toString("base64");
            const file = `data:${requestFile.mimetype};base64,${fileBase64}`;
            const result = await cloudinaryUpload(file, {
              folder: "linkProfilePic",
              resource_type: "image",
              allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
            });
            const url = result.secure_url;
            await profileLinkService.update(req.user.id, {
              ...req.body,
              profilePic: url,
            });
            const data = await profileLinkService.getMyProfile(req.user.id);
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
