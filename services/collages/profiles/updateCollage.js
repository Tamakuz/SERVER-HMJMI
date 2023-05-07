import path from "path";
import fs from "fs-extra";
import admin from "firebase-admin";
import Collage from "../../../models/collageModel.js";
import createError from "../../../utils/error.js";
import responseSuccess from "../../../utils/responseSuccess.js";

const updateCollage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, username, fullname, gender } = req.body;

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

    collage.email = email ? email : collage.email;
    collage.username = username ? username : collage.username;
    collage.detailuser.fullname = fullname
      ? fullname
      : collage.detailuser?.fullname;
    collage.detailuser.gender = gender ? gender : collage.detailuser?.fullname;
    collage.updatedAt = Date.now();

    try {
      //* Handle validasi success
      await collage.validate();
      //* Hanlde jika request berupa file
      if (req.file) {
        const bucket = admin.storage().bucket();

        //* Dapatkan path file dari request
        const thumbnail = collage.detailuser?.thumbnail;
        const filePath = req.file.path;

        //* Handle jika path file tidak ada
        if (!thumbnail) {
          const fileUpload = bucket.file(`collages/${req.file.filename}`);
          const fileReadStream = fs.createReadStream(filePath);
          const fileWriteStream = fileUpload.createWriteStream({
            metadata: {
              contentType: req.file.mimetype,
            },
          });

          //* menyimpan file
          fileReadStream.pipe(fileWriteStream);

          collage.detailuser.thumbnail = req.file.filename;
        } else {
          // Ambil referensi ke file yang ingin diganti
          const oldImage = bucket.file(`collages/${thumbnail}`);
          const newImage = bucket.file(`collages/${req.file.filename}`);
          const fileReadStreamNew = fs.createReadStream(req.file.path);
          const fileWriteStreamNew = newImage.createWriteStream({
            metadata: {
              contentType: req.file.mimetype,
            },
          });

          //* Hapus file lama
          await oldImage.delete();

          //* menyimpan file baru
          fileReadStreamNew.pipe(fileWriteStreamNew);

          //* Mengubah path foto di database
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

      if (errorProp) {
        message = errors[errorProp].message;
      } else {
        message = error.message;
      }
      return next(createError(400, message));
    }

    await collage.save();
    responseSuccess(res, collage);
  } catch (error) {
    // console.log(error);
    //! Debug Error
    next(createError(500, error._message));
  }
};

export default updateCollage;
