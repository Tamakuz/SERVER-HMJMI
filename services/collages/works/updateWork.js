import Work from "../../../models/workModel.js";
import createError from "../../../utils/error.js";
import responseSuccess from "../../../utils/responseSuccess.js";
import fs from "fs-extra";
import path from "path";

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
        const thumbnail = work.thumbnail;
        if (!thumbnail) {
          work.thumbnail = req.file.filename;
          await work.save();
        } else {
          const oldImage = path.join(
            __dirname,
            "uploads",
            "images",
            work.thumbnail
          );
          if (fs.existsSync(oldImage)) {
            fs.unlinkSync(oldImage);
          }
          work.thumbnail = req.file.filename;
          await work.save();
        }
      }

      //* Simpan data work dan muncul response 200
      work.save();
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
