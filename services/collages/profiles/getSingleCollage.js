import Collage from "../../../models/collageModel.js";
import Work from "../../../models/wo"
import createError from "../../../utils/error.js";
import responseSuccess from "../../../utils/responseSuccess.js";

const getSingleCollage = async (req, res, next) => {
  const { id } = req.params;

  let collage;
  try {
    collage = await Collage.findById(id).populate("workcollage");
  } catch (error) {
    return next(createError(500, "Server Error"));
  }

  if (!collage) {
    return next(createError(404, "Data tidak dapat ditemukan"));
  }

  responseSuccess(res, collage);
};

export default getSingleCollage;
