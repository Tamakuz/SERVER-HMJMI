import path from "path";
import fs from "fs-extra";
import Collage from "../../../models/collageModel.js";
import createError from "../../../utils/error.js";
import responseSuccess from "../../../utils/responseSuccess.js";

const updateCollage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {email, username, fullname, gender} = req.body

    //* Mencari 1 data mahasiswa
    const collage = await Collage.findById(id);

    if (!collage) {
      throw createError(
        404,
        "Maaf, data yang Anda minta tidak dapat ditemukan di server kami."
      );
    }

    //* Mengetahui letak directory saat ini
    const __dirname = path.resolve();

    collage.email = email ? email : collage.email
    collage.username = username ? username : collage.username
    collage.detailuser.fullname = fullname ? fullname : collage.detailuser?.fullname
    collage.detailuser.gender = gender ? gender : collage.detailuser?.fullname
    collage.updatedAt = Date.now();


    try {
      //* Handle validasi success
      await collage.validate();
      //* Hanlde jika request berupa file
      if (req.file) {
        //* Dapatkan path file dari request
        const thumbnail = collage.detailuser?.thumbnail;
        //* Handle jika path file tidak ada
        if (!thumbnail) {
          collage.detailuser.thumbnail = req.file.filename;
        } else {
          const oldImage = path.join(
            __dirname,
            "uploads",
            "images",
            collage.detailuser.thumbnail
          );
          if (fs.existsSync(oldImage)) {
            fs.unlinkSync(oldImage);
          }
          collage.detailuser.thumbnail = req.file.filename;
        }
      }
    } catch (error) {
      //! Handle validation error
      const errors = error.errors;
      let message;

      const requiredProps = [
        "username",
        "detailuser.fullname",
        "detailuser.gender",
        "email",
      ];
      const errorProp = Object.keys(errors).find((prop) =>
        requiredProps.includes(prop)
      );

      if (req.file) {
        const filePath = path.join(
          __dirname,
          "uploads",
          "images",
          req.file.filename
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      if (errorProp) {
        message = errors[errorProp].message;
      } else {
        message = error.message;
      }
      return next(createError(400, message))
    }

    await collage.save();
    responseSuccess(res, collage);
  } catch (error) {
    //! Debug Error
    next(createError(500, error._message));
  }
};

export default updateCollage;
