import Work from "../../../models/workModel.js";
import createError from "../../../utils/error.js";
import responseSuccess from "../../../utils/responseSuccess.js";
import cache from "memory-cache";

const getSingleCollage = async (req, res, next) => {
  const { id } = req.params;

  const key = "__express__" + req.originalUrl || req.url;
  const cachedResponse = cache.get(key);
  if (cachedResponse) {
    responseSuccess(res, cachedResponse);
    return;
  } else {
    try {
      const work = await Work.findById(id).populate({
        path: "detailcollage",
        select: "id detailuser",
      });

      if (!work) {
        next(createError(404, "Data tidak dapat ditemukan"));
      }

      cache.put(key, work, 60 * 1000);
      responseSuccess(res, work);
    } catch (error) {
      next(createError(500, "Sever Error"));
    }
  }
};

export default getSingleCollage;
