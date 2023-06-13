import Lecture from "../../models/lectureModel.js";
import Collage from "../../models/collageModel.js";
import responseSuccess from "../../utils/responseSuccess.js"
import createError from "../../utils/error.js"

const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshtoken.toLowerCase();
    const collage = await Collage.findOne({ refresh_token: refreshToken });
    const lecture = await Lecture.findOne({ refresh_token: refreshToken });

    if (!refreshToken) return res.sendStatus(401);

    if (collage) {
      await collage.updateOne({ refresh_token: null });
      res.clearCookie("refreshtoken");
      responseSuccess(res, { message: "berhasil logout" });
    }

    if (lecture) {
      await lecture.updateOne({ refresh_token: null });
      res.clearCookie("refreshtoken");
      responseSuccess(res, { message: "berhasil logout" });
    }

    if (!collage || lecture) {
      next(createError(403, `Error ${collage || lecture}`))
    }
  } catch (error) {
    console.log(error);
    next(createError(500, "Server Error"))
  }
};

export default logout
