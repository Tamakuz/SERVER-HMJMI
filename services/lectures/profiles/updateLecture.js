import Lecture from "../../../models/lectureModel.js";
import path from "path";
import fs from "fs-extra";
import admin from "firebase-admin";
import createError from "../../../utils/error.js";
import responseSuccess from "../../../utils/responseSuccess.js";

const updateLecture = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, username, fullname, gender } = req.body;
    const lecture = await Lecture.findById(id);

    if (!lecture) {
      next(
        createError(404, {
          message:
            "Maaf, data yang Anda minta tidak dapat ditemukan di server kami.",
        })
      );
    }

    lecture.email = email ? email : lecture.email;
    lecture.username = username ? username : lecture.username;
    lecture.detailuser.fullname = fullname
      ? fullname
      : lecture.detailuser.fullname;
    lecture.detailuser.gender = gender ? gender : lecture.detailuser.gender;
    lecture.updatedAt = Date.now();

    try {
      await lecture.validate();
      if (req.file) {
        const bucket = admin.storage().bucket();
        const thumbnail = lecture.detailuser?.thumbnail;
        const file = req.file
        const destination = `lectures/${file.filename}`

        if (!thumbnail) {
          await bucket.upload(file.path, {
            destination,
            metadata: { contentType: file.mimetype },
          });

          lecture.detailuser.thumbnail = req.file.filename;
        } else {
          // Ambil referensi ke file yang ingin diganti
          const oldImage = bucket.file(`lectures/${thumbnail}`);
          
          await oldImage.delete()
          
          await bucket.upload(file.path, {
            destination,
            metadata: { contentType: file.mimetype },
          });

          //* Mengubah path foto di database
          lecture.detailuser.thumbnail = req.file.filename;
        }
      }
    } catch (error) {
      //! Handle validation error
      const errors = error.errors;
      // console.log(errors);
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

    await lecture.save();
    responseSuccess(res, lecture);
  } catch (error) {
    console.log(error);
    return next(createError(500, error));
  }
};

export default updateLecture;
