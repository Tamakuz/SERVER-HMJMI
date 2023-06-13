import Work from "./../../../models/workModel.js";
import Collage from "../../../models/collageModel.js";
import createError from "../../../utils/error.js";
import responseSuccess from "../../../utils/responseSuccess.js";
import admin from "firebase-admin";
import cache from "memory-cache"

const createWork = async (req, res, next) => {
  try {
    const { collageId } = req.params;
    const { title, desc, link } = req.body;

    //* Cek Data collage
    const collage = await Collage.findById(collageId);

    if (!collage) {
      next(
        createError(
          404,
          "Maaf, data yang Anda minta tidak dapat ditemukan di server kami."
        )
      );
    }

    //* Buat data work baru
    const work = new Work({
      title,
      desc,
      link,
      detailcollage: collageId,
      createdAt: Date.now(),
    });

    try {
      //* Validasi data work
      await work.validate();
      if (req.file) {
        const bucket = admin.storage().bucket();
        const file = req.file;
        const destination = `works/${file.filename}`;

        await bucket.upload(file.path, {
          destination,
          metadata: { contentType: file.mimetype },
        });

        work.thumbnail = req.file.filename;
      }
      await work.save();
    } catch (error) {
      const errors = error.errors;
      let message;

      const requiredProps = ["title", "desc", "link", "thumbnail"];
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

    //* Simpan data work ke database
    await work.save();

    //* Tambahkan reference dari data work ke collection collage
    collage.workcollage.push(work._id);
    await collage.save();

    cache.del("__express__/api/work/" + collageId);
    cache.del("__express__/api/collage/" + collageId);
    //* Response success
    responseSuccess(res, work);
  } catch (error) {
    console.log(error);
    //! Handle error ketika data collage tidak ditemukan
    next(createError(500, "Server Error"));
  }
};

export default createWork;
