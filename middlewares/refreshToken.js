import Lecture from "../models/lectureModel.js";
import Collage from "../models/collageModel.js";
import jwt from "jsonwebtoken";
import config from "../config/index.js";

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshtoken;
    const { accessTokenSecret, refreshTokenSecret } = config;
    const collage = await Collage.findOne({ refresh_token: refreshToken });
    const lecture = await Lecture.findOne({ refresh_token: refreshToken });

    if (!refreshToken) return res.sendStatus(401);

    if(lecture){
      jwt.verify(
        refreshToken,
        refreshTokenSecret,
        (err, decoded) => {
          if (err) return res.json({ msg: "unauthorization" });
          const id = lecture._id;
          const role = lecture.role
          const accessToken = jwt.sign(
            { id, role },
            accessTokenSecret,
            {
              expiresIn: "1d",
            }
          );
          res.json({accessToken});
        }
      );
    }

    if(collage){
      jwt.verify(
        refreshToken,
        refreshTokenSecret,
        (err, decoded) => {
          if (err) return res.json({ msg: "unauthorization" });
          const id = collage._id;
          const role = collage.role
          const accessToken = jwt.sign(
            { id, role },
            accessTokenSecret,
            {
              expiresIn: "1d",
            }
          );
          res.json({accessToken});
        }
      );
    }

    if (!lecture || !collage) {
      return res.status(403).json({ message: "forbiden" });
    }
  } catch (error) {
    console.log(error);
  }
};

export default refreshToken
