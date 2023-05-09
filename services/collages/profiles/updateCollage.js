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
        const thumbnail = collage.detailuser?.thumbnail;
        const file = req.file;
        const destination = `collages/${file.filename}`;

        //* Handle jika path file tidak ada
        if (!thumbnail) {
          await bucket.upload(file.path, {
            destination,
            metadata: { contentType: file.mimetype },
          });

          collage.detailuser.thumbnail = req.file.filename;
        } else {
          // Ambil referensi ke file yang ingin diganti
          const oldImage = bucket.file(`collages/${thumbnail}`);

          await oldImage.delete();

          await bucket.upload(file.path, {
            destination,
            metadata: { contentType: file.mimetype },
          });

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
