import Work from "./../../../models/workModel.js";
import Collage from "../../../models/collageModel.js";
import createError from "../../../utils/error.js";
import responseSuccess from "../../../utils/responseSuccess.js";

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

    const work = new Work({
      title,
      desc,
      link,
      detailcollage : collageId,
      createdAt: Date.now(),
    });

    try {
      await work.validate();
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

    //* Simpan rok di database
    await work.save();

    //* Push / tambahkan data di collection Collage dan simpan
    collage.workcollage.push(work._id);
    await collage.save();

    //* Response
    responseSuccess(res, work);
  } catch (error) {
    console.log(error);
    //! Jika data collage tidak ditemukan
    next(createError(500, "Server Error"));
  }
};

export default createWork
