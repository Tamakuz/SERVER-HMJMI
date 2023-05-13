import Collage from "../../../models/collageModel.js";
import createError from "../../../utils/error.js";
import responseSuccess from "../../../utils/responseSuccess.js";
import cache from "memory-cache"

const getSingleCollage = async (req, res, next) => {
  const { id } = req.params;

  const key = '__express__' + req.originalUrl || req.url;
  console.log(key);
  const cachedResponse = cache.get(key);
  if (cachedResponse) {
    responseSuccess(res, cachedResponse);
    return;
  } else {
    let collage;
    try {
      collage = await Collage.findById(id).populate("workcollage");
    } catch (error) {
      return next(createError(500, "Server Error"));
    }

    if (!collage) {
      return next(createError(404, "Data tidak dapat ditemukan"));
    }

    cache.put(key, collage, duration * 1000); // Menyimpan data pada cache selama durasi yang ditentukan (dalam detik)
    responseSuccess(res, collage);
  }
};

const duration = 60; // Durasi penyimpanan data pada cache dalam detik
export default getSingleCollage;
