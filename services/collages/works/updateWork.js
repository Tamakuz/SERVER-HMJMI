import Work from "../../../models/workModel.js";
import createError from "../../../utils/error.js";
import responseSuccess from "../../../utils/responseSuccess.js";
import fs from "fs-extra";
import path from "path";
import admin from "firebase-admin";
import cache from "memory-cache"

const updateWork = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, desc, link } = req.body;

    //* Cek work data tersedia atau tidak
    const work = await Work.findById(id);

    //! Jika data work tidak ada di db
    if (!work) {
      next(
        createError(
          404,
          "Maaf, data yang Anda minta tidak dapat ditemukan di server kami."
        )
      );
    }

    const __dirname = path.resolve();

    //* Mengganti data work
    work.title = title ? title : work.title;
    work.desc = desc ? desc : work.desc;
    work.link = link ? link : work.link;
    work.updatedAt = Date.now();

    try {
      await work.validate();
      if (req.file) {
        const bucket = admin.storage().bucket();
        const thumbnail = work.thumbnail;
        const file = req.file;
        const destination = `works/${file.filename}`;

        if (!thumbnail) {
          await bucket.upload(file.path, {
            destination,
            metadata: { contentType: file.mimetype },
          });

          work.thumbnail = req.file.filename;
        } else {
          // Ambil referensi ke file yang ingin diganti
          const oldImage = bucket.file(`works/${thumbnail}`);

          await oldImage.delete();

          await bucket.upload(file.path, {
            destination,
            metadata: { contentType: file.mimetype },
          });

          //* Mengubah path foto di database
          work.thumbnail = req.file.filename;
        }
      }

      //* Simpan data work dan muncul response 200
      await work.save();
      cache.del("__express__/api/work/" + id);
      responseSuccess(res, work);
    } catch (error) {
      const errors = error.errors;
      let message;

      const requiredProps = ["title", "desc", "link"];
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
      return next(createError(400, message));
    }
  } catch (error) {
    console.log(error);
    next(createError(500, "Server Error"));
  }
};

export default updateWork;
