import Collage from "../../../models/collageModel.js";
import Work from "../../../models/workModel.js"
import createError from "../../../utils/error.js";
import responseSuccess from "../../../utils/responseSuccess.js";

const getSingleCollage = async (req, res, next) => {
  const { id } = req.params;

  let collage;
  try {
    collage = await Collage.findById(id).lean();
  } catch (error) {
    return next(createError(500, "Server Error"));
  }

  if (!collage) {
    return next(createError(404, "Data tidak dapat ditemukan"));
  }

  // populate "workcollage" field manually
  try {
    collage.workcollage = await Work.find({ collageId: id });
  } catch (error) {
    return next(createError(500, "Server Error"));
  }

  responseSuccess(res, collage);
};

export default getSingleCollage;
