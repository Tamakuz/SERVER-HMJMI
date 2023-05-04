import Lecture from "../../../models/lectureModel.js";
import createError from "../../../utils/error.js";
import responseSuccess from "../../../utils/responseSuccess.js";

const getSingleLecture = async (req, res, next) => {
  try {
    const { id } = req.params;

    const lecture = await Lecture.findById(id)

    if (!lecture) {
      next(createError(404, "Data tidak dapat ditemukan"));
    }

    responseSuccess(res, lecture);
  } catch (error) {
    next(createError(500, "Sever Error"));
  }
};

export default getSingleLecture;
