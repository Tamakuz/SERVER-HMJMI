import admin from "firebase-admin";
import Collage from "../../../models/collageModel.js";
import createError from "../../../utils/error.js";
import responseSuccess from "../../../utils/responseSuccess.js";

const updateCollage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, username, fullname, gender } = req.body;

    // Mencari 1 data mahasiswa berdasarkan id
    const collage = await Collage.findById(id);

    // Throw error jika data mahasiswa tidak ditemukan
    if (!collage) {
      return next(
        createError(
          404,
          "Maaf, data yang Anda minta tidak dapat ditemukan di server kami."
        )
      );
    }

    // Update data mahasiswa
    collage.email = email ? email : collage.email;
    collage.username = username ? username : collage.username;
    collage.detailuser.fullname = fullname
      ? fullname
      : collage.detailuser?.fullname;
    collage.detailuser.gender = gender ? gender : collage.detailuser?.fullname;
    collage.updatedAt = Date.now();

    try {
      // Handle validasi data mahasiswa
      await collage.validate();

      // Handle jika request berupa file
      if (req.file) {
        const bucket = admin.storage().bucket();
        const thumbnail = collage.detailuser?.thumbnail;
        const file = req.file;
        const destination = `collages/${file.filename}`;

        // Handle jika thumbnail tidak ada
        if (!thumbnail) {
          // Upload file baru
          await bucket.upload(file.path, {
            destination,
            metadata: { contentType: file.mimetype },
          });

          collage.detailuser.thumbnail = req.file.filename;
        } else {
          // Delete file lama
          const oldImage = bucket.file(`collages/${thumbnail}`);
          await oldImage.delete();

          // Upload file baru
          await bucket.upload(file.path, {
            destination,
            metadata: { contentType: file.mimetype },
          });

          // Update path foto di database
          collage.detailuser.thumbnail = req.file.filename;
        }
      }
    } catch (error) {
      //! Handle error validasi
      const errors = error.errors;
      let message;

      // Mencari property yang bermasalah dalam validasi
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
      // Throw error jika validasi gagal
      return next(createError(400, message));
    }

    // Simpan perubahan ke database
    await collage.save();
    // Kirim respon sukses
    responseSuccess(res, collage);
  } catch (error) {
    //! Handle error umum
    // Debug error
    next(createError(500, error._message));
  }
};

export default updateCollage;
