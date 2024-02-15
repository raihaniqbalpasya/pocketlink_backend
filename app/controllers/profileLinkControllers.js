const { promisify } = require("util");
const cloudinary = require("../../config/cloudinary");
const cloudinaryUpload = promisify(cloudinary.uploader.upload);
// const cloudinaryDelete = promisify(cloudinary.uploader.destroy);
const profileLinkService = require("../services/profileLinkServices");
const storedImgService = require("../services/storedImgServices");

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

  // ------ Sementara gak dipakai ------
  // async searchByProfileLink(req, res) {
  //   try {
  //     const data = await profileLinkService.searchByProfileLink(
  //       req.query.profileLink
  //     );
  //     if (data.length >= 1) {
  //       res.status(200).json({
  //         status: true,
  //         message: "Successfully get all data",
  //         data,
  //       });
  //     } else {
  //       res.status(404).json({
  //         status: false,
  //         message: "Data not found",
  //       });
  //     }
  //   } catch (err) {
  //     res.status(422).json({
  //       status: false,
  //       message: err.message,
  //     });
  //   }
  // },

  async create(req, res) {
    try {
      const reqProfileImg =
        req.files["profileImage"] && req.files["profileImage"][0];
      const reqBgImg =
        req.files["backgroundImage"] && req.files["backgroundImage"][0];
      const getData = await profileLinkService.getMyProfile(req.user.id);
      if (getData !== null) {
        res.status(409).json({
          status: false,
          message: "Data already exist",
        });
      } else if (reqProfileImg && reqBgImg) {
        // upload gambar profile link ke cloudinary
        const fileBase64PI = reqProfileImg.buffer.toString("base64");
        const filePI = `data:${reqProfileImg.mimetype};base64,${fileBase64PI}`;
        const profileImg = await cloudinaryUpload(filePI, {
          folder: "linkProfilePic",
          resource_type: "image",
          allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
        });
        const urlProfileImg = profileImg.secure_url;
        // create API stored image
        await storedImgService.create(req.user.id, {
          linkImg: urlProfileImg,
        });
        // upload gambar background link ke cloudinary
        const fileBase64BI = reqBgImg.buffer.toString("base64");
        const fileBI = `data:${reqBgImg.mimetype};base64,${fileBase64BI}`;
        const BgImg = await cloudinaryUpload(fileBI, {
          folder: "linkBgImg",
          resource_type: "image",
          allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
        });
        const urlBgImg = BgImg.secure_url;
        // create API stored image
        await storedImgService.create(req.user.id, {
          linkImg: urlBgImg,
        });
        const data = await profileLinkService.create(req.user.id, {
          ...req.body,
          profileImage: urlProfileImg,
          backgroundImage: urlBgImg,
        });
        res.status(201).json({
          status: true,
          message: "Successfully create data",
          data,
        });
      } else if (
        reqProfileImg &&
        (reqBgImg == null || reqBgImg == undefined || reqBgImg == "")
      ) {
        // upload gambar profile link ke cloudinary
        const fileBase64PI = reqProfileImg.buffer.toString("base64");
        const filePI = `data:${reqProfileImg.mimetype};base64,${fileBase64PI}`;
        const profileImg = await cloudinaryUpload(filePI, {
          folder: "linkProfilePic",
          resource_type: "image",
          allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
        });
        const urlProfileImg = profileImg.secure_url;
        // create API stored image
        await storedImgService.create(req.user.id, {
          linkImg: urlProfileImg,
        });
        const data = await profileLinkService.create(req.user.id, {
          ...req.body,
          profileImage: urlProfileImg,
          backgroundImage: null,
        });
        res.status(201).json({
          status: true,
          message: "Successfully create data",
          data,
        });
      } else if (
        reqBgImg &&
        (reqProfileImg == null ||
          reqProfileImg == undefined ||
          reqProfileImg == "")
      ) {
        // upload gambar background link ke cloudinary
        const fileBase64BI = reqBgImg.buffer.toString("base64");
        const fileBI = `data:${reqBgImg.mimetype};base64,${fileBase64BI}`;
        const BgImg = await cloudinaryUpload(fileBI, {
          folder: "linkBgImg",
          resource_type: "image",
          allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
        });
        const urlBgImg = BgImg.secure_url;
        // create API stored image
        await storedImgService.create(req.user.id, {
          linkImg: urlBgImg,
        });
        const data = await profileLinkService.create(req.user.id, {
          ...req.body,
          profileImage: null,
          backgroundImage: urlBgImg,
        });
        res.status(201).json({
          status: true,
          message: "Successfully create data",
          data,
        });
      } else {
        const data = await profileLinkService.create(req.user.id, {
          ...req.body,
          profileImage: null,
          backgroundImage: null,
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

  async updateMyProfile(req, res) {
    try {
      const reqProfileImg =
        req.files["profileImage"] && req.files["profileImage"][0];
      const reqBgImg =
        req.files["backgroundImage"] && req.files["backgroundImage"][0];
      const getData = await profileLinkService.getMyProfile(req.user.id);
      if (getData === null || getData.userId !== req.user.id) {
        res.status(404).json({
          status: false,
          message: "Data not found",
        });
      } else {
        const dataPrfImg = getData.profileImage;
        const dataBgImg = getData.backgroundImage;
        if (dataPrfImg == null && dataBgImg == null) {
          if (reqProfileImg && reqBgImg) {
            // upload gambar profile link ke cloudinary
            const fileBase64PI = reqProfileImg.buffer.toString("base64");
            const filePI = `data:${reqProfileImg.mimetype};base64,${fileBase64PI}`;
            const profileImg = await cloudinaryUpload(filePI, {
              folder: "linkProfilePic",
              resource_type: "image",
              allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
            });
            const urlProfileImg = profileImg.secure_url;
            // create API stored image
            await storedImgService.create(req.user.id, {
              linkImg: urlProfileImg,
            });
            // upload gambar background link ke cloudinary
            const fileBase64BI = reqBgImg.buffer.toString("base64");
            const fileBI = `data:${reqBgImg.mimetype};base64,${fileBase64BI}`;
            const BgImg = await cloudinaryUpload(fileBI, {
              folder: "linkBgImg",
              resource_type: "image",
              allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
            });
            const urlBgImg = BgImg.secure_url;
            // create API stored image
            await storedImgService.create(req.user.id, {
              linkImg: urlBgImg,
            });
            // update data API
            await profileLinkService.update(req.user.id, {
              ...req.body,
              profileImage: urlProfileImg,
              backgroundImage: urlBgImg,
            });
            const data = await profileLinkService.getMyProfile(req.user.id);
            res.status(200).json({
              status: true,
              message: "Successfully update data",
              data,
            });
          } else if (
            reqProfileImg &&
            (reqBgImg == null || reqBgImg == undefined || reqBgImg == "")
          ) {
            // upload gambar profile link ke cloudinary
            const fileBase64PI = reqProfileImg.buffer.toString("base64");
            const filePI = `data:${reqProfileImg.mimetype};base64,${fileBase64PI}`;
            const profileImg = await cloudinaryUpload(filePI, {
              folder: "linkProfilePic",
              resource_type: "image",
              allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
            });
            const urlProfileImg = profileImg.secure_url;
            // create API stored image
            await storedImgService.create(req.user.id, {
              linkImg: urlProfileImg,
            });
            // update data API
            await profileLinkService.update(req.user.id, {
              ...req.body,
              profileImage: urlProfileImg,
              backgroundImage: null,
            });
            const data = await profileLinkService.getMyProfile(req.user.id);
            res.status(200).json({
              status: true,
              message: "Successfully update data",
              data,
            });
          } else if (
            reqBgImg &&
            (reqProfileImg == null ||
              reqProfileImg == undefined ||
              reqProfileImg == "")
          ) {
            // upload gambar background link ke cloudinary
            const fileBase64BI = reqBgImg.buffer.toString("base64");
            const fileBI = `data:${reqBgImg.mimetype};base64,${fileBase64BI}`;
            const BgImg = await cloudinaryUpload(fileBI, {
              folder: "linkBgImg",
              resource_type: "image",
              allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
            });
            const urlBgImg = BgImg.secure_url;
            // create API stored image
            await storedImgService.create(req.user.id, {
              linkImg: urlBgImg,
            });
            // update data API
            await profileLinkService.update(req.user.id, {
              ...req.body,
              profileImage: null,
              backgroundImage: urlBgImg,
            });
            const data = await profileLinkService.getMyProfile(req.user.id);
            res.status(200).json({
              status: true,
              message: "Successfully update data",
              data,
            });
          } else {
            // update data API
            await profileLinkService.update(req.user.id, {
              ...req.body,
              profileImage: null,
              backgroundImage: null,
            });
            const data = await profileLinkService.getMyProfile(req.user.id);
            res.status(200).json({
              status: true,
              message: "Successfully update data",
              data,
            });
          }
        } else if (dataPrfImg && dataBgImg == null) {
          if (reqProfileImg && reqBgImg) {
            // upload gambar profile link ke cloudinary
            const fileBase64PI = reqProfileImg.buffer.toString("base64");
            const filePI = `data:${reqProfileImg.mimetype};base64,${fileBase64PI}`;
            const profileImg = await cloudinaryUpload(filePI, {
              folder: "linkProfilePic",
              resource_type: "image",
              allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
            });
            const urlProfileImg = profileImg.secure_url;
            // create API stored image
            await storedImgService.create(req.user.id, {
              linkImg: urlProfileImg,
            });
            // upload gambar background link ke cloudinary
            const fileBase64BI = reqBgImg.buffer.toString("base64");
            const fileBI = `data:${reqBgImg.mimetype};base64,${fileBase64BI}`;
            const BgImg = await cloudinaryUpload(fileBI, {
              folder: "linkBgImg",
              resource_type: "image",
              allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
            });
            const urlBgImg = BgImg.secure_url;
            // create API stored image
            await storedImgService.create(req.user.id, {
              linkImg: urlBgImg,
            });
            // update data API
            await profileLinkService.update(req.user.id, {
              ...req.body,
              profileImage: urlProfileImg,
              backgroundImage: urlBgImg,
            });
            const data = await profileLinkService.getMyProfile(req.user.id);
            res.status(200).json({
              status: true,
              message: "Successfully update data",
              data,
            });
          } else if (
            reqProfileImg &&
            (reqBgImg == null || reqBgImg == undefined || reqBgImg == "")
          ) {
            // upload gambar profile link ke cloudinary
            const fileBase64PI = reqProfileImg.buffer.toString("base64");
            const filePI = `data:${reqProfileImg.mimetype};base64,${fileBase64PI}`;
            const profileImg = await cloudinaryUpload(filePI, {
              folder: "linkProfilePic",
              resource_type: "image",
              allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
            });
            const urlProfileImg = profileImg.secure_url;
            // create API stored image
            await storedImgService.create(req.user.id, {
              linkImg: urlProfileImg,
            });
            // update data API
            await profileLinkService.update(req.user.id, {
              ...req.body,
              profileImage: urlProfileImg,
              backgroundImage: null,
            });
            const data = await profileLinkService.getMyProfile(req.user.id);
            res.status(200).json({
              status: true,
              message: "Successfully update data",
              data,
            });
          } else if (
            reqBgImg &&
            (reqProfileImg == null ||
              reqProfileImg == undefined ||
              reqProfileImg == "")
          ) {
            // upload gambar background link ke cloudinary
            const fileBase64BI = reqBgImg.buffer.toString("base64");
            const fileBI = `data:${reqBgImg.mimetype};base64,${fileBase64BI}`;
            const BgImg = await cloudinaryUpload(fileBI, {
              folder: "linkBgImg",
              resource_type: "image",
              allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
            });
            const urlBgImg = BgImg.secure_url;
            // create API stored image
            await storedImgService.create(req.user.id, {
              linkImg: urlBgImg,
            });
            // update data API
            await profileLinkService.update(req.user.id, {
              ...req.body,
              profileImage: dataPrfImg,
              backgroundImage: urlBgImg,
            });
            const data = await profileLinkService.getMyProfile(req.user.id);
            res.status(200).json({
              status: true,
              message: "Successfully update data",
              data,
            });
          } else {
            // update data API
            await profileLinkService.update(req.user.id, {
              ...req.body,
              profileImage: dataPrfImg,
              backgroundImage: null,
            });
            const data = await profileLinkService.getMyProfile(req.user.id);
            res.status(200).json({
              status: true,
              message: "Successfully update data",
              data,
            });
          }
        } else if (dataPrfImg == null && dataBgImg) {
          if (reqProfileImg && reqBgImg) {
            // upload gambar profile link ke cloudinary
            const fileBase64PI = reqProfileImg.buffer.toString("base64");
            const filePI = `data:${reqProfileImg.mimetype};base64,${fileBase64PI}`;
            const profileImg = await cloudinaryUpload(filePI, {
              folder: "linkProfilePic",
              resource_type: "image",
              allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
            });
            const urlProfileImg = profileImg.secure_url;
            // create API stored image
            await storedImgService.create(req.user.id, {
              linkImg: urlProfileImg,
            });
            // upload gambar background link ke cloudinary
            const fileBase64BI = reqBgImg.buffer.toString("base64");
            const fileBI = `data:${reqBgImg.mimetype};base64,${fileBase64BI}`;
            const BgImg = await cloudinaryUpload(fileBI, {
              folder: "linkBgImg",
              resource_type: "image",
              allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
            });
            const urlBgImg = BgImg.secure_url;
            // create API stored image
            await storedImgService.create(req.user.id, {
              linkImg: urlBgImg,
            });
            // update data API
            await profileLinkService.update(req.user.id, {
              ...req.body,
              profileImage: urlProfileImg,
              backgroundImage: urlBgImg,
            });
            const data = await profileLinkService.getMyProfile(req.user.id);
            res.status(200).json({
              status: true,
              message: "Successfully update data",
              data,
            });
          } else if (
            reqProfileImg &&
            (reqBgImg == null || reqBgImg == undefined || reqBgImg == "")
          ) {
            // upload gambar profile link ke cloudinary
            const fileBase64PI = reqProfileImg.buffer.toString("base64");
            const filePI = `data:${reqProfileImg.mimetype};base64,${fileBase64PI}`;
            const profileImg = await cloudinaryUpload(filePI, {
              folder: "linkProfilePic",
              resource_type: "image",
              allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
            });
            const urlProfileImg = profileImg.secure_url;
            // create API stored image
            await storedImgService.create(req.user.id, {
              linkImg: urlProfileImg,
            });
            // update data API
            await profileLinkService.update(req.user.id, {
              ...req.body,
              profileImage: urlProfileImg,
              backgroundImage: dataBgImg,
            });
            const data = await profileLinkService.getMyProfile(req.user.id);
            res.status(200).json({
              status: true,
              message: "Successfully update data",
              data,
            });
          } else if (
            reqBgImg &&
            (reqProfileImg == null ||
              reqProfileImg == undefined ||
              reqProfileImg == "")
          ) {
            // upload gambar background link ke cloudinary
            const fileBase64BI = reqBgImg.buffer.toString("base64");
            const fileBI = `data:${reqBgImg.mimetype};base64,${fileBase64BI}`;
            const BgImg = await cloudinaryUpload(fileBI, {
              folder: "linkBgImg",
              resource_type: "image",
              allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
            });
            const urlBgImg = BgImg.secure_url;
            // create API stored image
            await storedImgService.create(req.user.id, {
              linkImg: urlBgImg,
            });
            // update data API
            await profileLinkService.update(req.user.id, {
              ...req.body,
              profileImage: null,
              backgroundImage: urlBgImg,
            });
            const data = await profileLinkService.getMyProfile(req.user.id);
            res.status(200).json({
              status: true,
              message: "Successfully update data",
              data,
            });
          } else {
            // update data API
            await profileLinkService.update(req.user.id, {
              ...req.body,
              profileImage: null,
              backgroundImage: dataBgImg,
            });
            const data = await profileLinkService.getMyProfile(req.user.id);
            res.status(200).json({
              status: true,
              message: "Successfully update data",
              data,
            });
          }
        } else {
          if (reqProfileImg && reqBgImg) {
            // upload gambar profile link ke cloudinary
            const fileBase64PI = reqProfileImg.buffer.toString("base64");
            const filePI = `data:${reqProfileImg.mimetype};base64,${fileBase64PI}`;
            const profileImg = await cloudinaryUpload(filePI, {
              folder: "linkProfilePic",
              resource_type: "image",
              allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
            });
            const urlProfileImg = profileImg.secure_url;
            // create API stored image
            await storedImgService.create(req.user.id, {
              linkImg: urlProfileImg,
            });
            // upload gambar background link ke cloudinary
            const fileBase64BI = reqBgImg.buffer.toString("base64");
            const fileBI = `data:${reqBgImg.mimetype};base64,${fileBase64BI}`;
            const BgImg = await cloudinaryUpload(fileBI, {
              folder: "linkBgImg",
              resource_type: "image",
              allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
            });
            const urlBgImg = BgImg.secure_url;
            // create API stored image
            await storedImgService.create(req.user.id, {
              linkImg: urlBgImg,
            });
            // update data API
            await profileLinkService.update(req.user.id, {
              ...req.body,
              profileImage: urlProfileImg,
              backgroundImage: urlBgImg,
            });
            const data = await profileLinkService.getMyProfile(req.user.id);
            res.status(200).json({
              status: true,
              message: "Successfully update data",
              data,
            });
          } else if (
            reqProfileImg &&
            (reqBgImg == null || reqBgImg == undefined || reqBgImg == "")
          ) {
            // upload gambar profile link ke cloudinary
            const fileBase64PI = reqProfileImg.buffer.toString("base64");
            const filePI = `data:${reqProfileImg.mimetype};base64,${fileBase64PI}`;
            const profileImg = await cloudinaryUpload(filePI, {
              folder: "linkProfilePic",
              resource_type: "image",
              allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
            });
            const urlProfileImg = profileImg.secure_url;
            // create API stored image
            await storedImgService.create(req.user.id, {
              linkImg: urlProfileImg,
            });
            // update data API
            await profileLinkService.update(req.user.id, {
              ...req.body,
              profileImage: urlProfileImg,
              backgroundImage: dataBgImg,
            });
            const data = await profileLinkService.getMyProfile(req.user.id);
            res.status(200).json({
              status: true,
              message: "Successfully update data",
              data,
            });
          } else if (
            reqBgImg &&
            (reqProfileImg == null ||
              reqProfileImg == undefined ||
              reqProfileImg == "")
          ) {
            // upload gambar background link ke cloudinary
            const fileBase64BI = reqBgImg.buffer.toString("base64");
            const fileBI = `data:${reqBgImg.mimetype};base64,${fileBase64BI}`;
            const BgImg = await cloudinaryUpload(fileBI, {
              folder: "linkBgImg",
              resource_type: "image",
              allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
            });
            const urlBgImg = BgImg.secure_url;
            // create API stored image
            await storedImgService.create(req.user.id, {
              linkImg: urlBgImg,
            });
            // update data API
            await profileLinkService.update(req.user.id, {
              ...req.body,
              profileImage: dataPrfImg,
              backgroundImage: urlBgImg,
            });
            const data = await profileLinkService.getMyProfile(req.user.id);
            res.status(200).json({
              status: true,
              message: "Successfully update data",
              data,
            });
          } else {
            // update data API
            await profileLinkService.update(req.user.id, {
              ...req.body,
              profileImage: dataPrfImg,
              backgroundImage: dataBgImg,
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

  async deleteMyProfile(req, res) {
    try {
      const getData = await profileLinkService.getMyProfile(req.user.id);
      if (getData) {
        // hapus data API
        await profileLinkService.delete(req.user.id);
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
