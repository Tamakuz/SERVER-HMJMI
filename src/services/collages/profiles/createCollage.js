import Collage from "../../../models/collageModel.js";
import createError from "../../../utils/error.js";
import responseSuccess from "../../../utils/responseSuccess.js";

const createCollage = async (req, res, next) => {
  try {
    const { email, username, password, status } = req.body;

    //* Cek, email ada atau tidak di DB
    const exsistEmail = await Collage.findOne({ email: email });
    const exsistUsername = await Collage.findOne({ username: username });

    //! Validasi ketika email dan username sudah terdaftar
    if (exsistEmail) {
      return next(
        createError(400, `Akun dengan email ${email} tersebut sudah terdaftar`)
      );
    } else if (exsistUsername) {
      return next(
        createError(
          400,
          `Akun dengan username ${username} tersebut sudah terdaftar`
        )
      );
    }

    //* Setup OBject Data Registerasi
    const collage = new Collage();

    collage.email = email;
    collage.username = username;
    collage.status = status;
    collage.createdAt = Date.now();
    if (password === "") {
      return next(createError(400, "Password tidak boleh kosong"));
    } else {
      collage.setPassword(password);
    }

    //! Response validation error
    try {
      await collage.validate();
    } catch (error) {
      const errors = error.errors;
      let message;

      const requiredProps = ["username", "password", "email", "status"];
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

    //* Simpan registrasi
    await collage.save();
    responseSuccess(res, collage);
  } catch (error) {
    console.log(error);
    //! Debug Error
    next(createError(500, error));
  }
};

export default createCollage;
