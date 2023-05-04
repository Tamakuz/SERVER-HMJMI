import Collage from "../../../models/collageModel.js";
import createError from "../../../utils/error.js";
import responseSuccess from "../../../utils/responseSuccess.js";

const getSingleCollage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const collage = await Collage.findById(id).populate("workcollage")

    if (!collage) {
      next(createError(404, "Data tidak dapat ditemukan"));
    }

    responseSuccess(res, collage);
  } catch (error) {
    next(createError(500, "Sever Error"));
  }
};

export default getSingleCollage;
