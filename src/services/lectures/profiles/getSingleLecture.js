import Lecture from "../../../models/lectureModel.js";
import createError from "../../../utils/error.js";
import responseSuccess from "../../../utils/responseSuccess.js";
import cache from "memory-cache";

const getSingleLecture = async (req, res, next) => {
  const { id } = req.params;

  const key = "__express__" + req.originalUrl || req.url;
  const cachedResponse = cache.get(key);
  if (cachedResponse) {
    responseSuccess(res, cachedResponse);
    return;
  } else {
    try {
      const { id } = req.params;

      const lecture = await Lecture.findById(id);

      if (!lecture) {
        next(createError(404, "Data tidak dapat ditemukan"));
      }

      cache.put(key, lecture, 60 * 1000);
      responseSuccess(res, lecture);
    } catch (error) {
      next(createError(500, "Sever Error"));
    }
  }
};

export default getSingleLecture;
