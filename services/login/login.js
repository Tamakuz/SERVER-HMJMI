import Lecture from "../../models/lectureModel.js";
import Collage from "../../models/collageModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";
import createError from "../../utils/error.js";
import responseSuccess from "../../utils/responseSuccess.js";

const refreshTokenSecret = config.refreshTokenSecret;
const refreshExpiresIn = config.refreshExpiresIn;

const authenticateUser = async (username, password, model) => {
  const user = await model.findOne({ username: username });

  if (!user) {
    throw createError(400, "Masukan username yang terdaftar");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw createError(400, "Wrong Password");
  }

  const userId = user._id;
  const userRole = user.role;
  const refreshToken = jwt.sign(
    { id: userId, role: userRole },
    refreshTokenSecret,
    {
      expiresIn: "1d",
    }
  );

  await user.updateOne({ refresh_token: refreshToken });
  return refreshToken;
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const refreshToken =
      (await authenticateUser(username, password, Lecture)) ||
      (await authenticateUser(username, password, Collage));

    responseSuccess(res, { refreshToken });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

export default login;
