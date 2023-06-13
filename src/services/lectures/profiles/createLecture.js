import Lecture from "../../../models/lectureModel.js";
import createError from "../../../utils/error.js";
import responseSuccess from "../../../utils/responseSuccess.js";

const createLecture = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    //* Cek, email ada atau tidak di DB
    const exsistEmail = await Lecture.findOne({ email: email });
    const exsistUsername = await Lecture.findOne({ username: username });

    //! Validasi ketika email dan username sudah terdaftar
    if (exsistEmail) {
      return next(
        createError(500, `Akun dengan email ${email} tersebut sudah terdaftar`)
      );
    } else if (exsistUsername) {
      return next(
        createError(
          500,
          `Akun dengan username ${username} tersebut sudah terdaftar`
        )
      );
    }

    const lecture = new Lecture();

    lecture.email = email;
    lecture.username = username;
    collage.setPassword(password);
    lecture.createdAt = Date.now();

    //! Response validation error
    try {
      await lecture.validate();
    } catch (error) {
      const errors = error.errors;
      let message;

      const requiredProps = ["username", "password", "email"];
      const errorProp = Object.keys(errors).find((prop) =>
        requiredProps.includes(prop)
      );

      if (errorProp) {
        message = errors[errorProp].message;
      } else {
        message = error.message;
      }
      return next(createError(400, message));
    }

    //* Menyimpan data
    await lecture.save();
    responseSuccess(res, lecture);
  } catch (error) {
    next(createError(500, error));
  }
};

export default createLecture
