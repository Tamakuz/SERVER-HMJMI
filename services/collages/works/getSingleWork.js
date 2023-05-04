import Work from "../../../models/workModel.js";
import createError from "../../../utils/error.js";
import responseSuccess from "../../../utils/responseSuccess.js";

const getSingleCollage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const work = await Work.findById(id).populate({path: "detailcollage", select: "id detailuser"})

    if (!work) {
      next(createError(404, "Data tidak dapat ditemukan"));
    }

    responseSuccess(res, work);
  } catch (error) {
    next(createError(500, "Sever Error"));
  }
};

export default getSingleCollage;
