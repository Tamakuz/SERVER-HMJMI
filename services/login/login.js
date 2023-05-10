import Lecture from "../../models/lectureModel.js";
import Collage from "../../models/collageModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";
import createError from "../../utils/error.js";
import responseSuccess from "../../utils/responseSuccess.js";

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { accessTokenSecret, refreshTokenSecret } = config;

    const lecture = await Lecture.findOne({ username: username });
    const collage = await Collage.findOne({ username: username });

    if (lecture) {
      const matchLecture = await bcrypt.compare(password, lecture.password);

      if (!matchLecture) {
        next(createError(400, "Wrong Password"));
      }

      const lectureId = lecture._id;
      const lectureRole = lecture.role;
      const accessToken = jwt.sign(
        { id: lectureId, role: lectureRole },
        accessTokenSecret,
        { expiresIn: "1d" }
      );
      const refreshToken = jwt.sign({ id: lectureId }, refreshTokenSecret, {
        expiresIn: "1d",
      });
      await lecture.updateOne({ refresh_token: refreshToken });
      // res.cookie("refreshtoken", refreshToken, {
      //   httpOnly: true,
      //   maxAge: 24 * 60 * 60 * 1000,
      //   sameSite: "none",
      //   secure: true, // tambahkan secure=true agar cookie hanya dikirim melalui HTTPS
      // });
      responseSuccess(res, { refreshToken });
    }

    if (collage) {
      const matchCollage = await bcrypt.compare(password, collage.password);

      if (!matchCollage) {
        next(createError(400, "Wrong Password"));
      }

      const collageId = collage._id;
      const collageRole = collage.role;
      const accessToken = jwt.sign(
        { id: collageId, role: collageRole },
        accessTokenSecret,
        { expiresIn: "1d" }
      );
      const refreshToken = jwt.sign({ id: collageId }, refreshTokenSecret, {
        expiresIn: "1d",
      });
      await collage.updateOne({ refresh_token: refreshToken });
      // res.cookie("refreshtoken", refreshToken, {
      //   httpOnly: true,
      //   maxAge: 24 * 60 * 60 * 1000,
      //   sameSite: "none",
      // });
      responseSuccess(res, { refreshToken });
    }

    if (!lecture || !collage) {
      next(createError(400, "Masukan username yang terdaftar"));
    }
  } catch (error) {
    console.log(error);
    next(createError(500, "Server Error"));
  }
};

export default login;
