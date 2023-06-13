import Lecture from "../../../models/lectureModel.js";
import createError from "../../../utils/error.js";
import responseSuccess from "../../../utils/responseSuccess.js";

const getLecture = async (req, res, next) => {
  try {
    //* Load More
    let limit = parseInt(req.query.limit);

    //* Mencari data Mahasiswa dengan menggabungkan data karyanya
    const lecture = await Lecture.aggregate([
      {
        $lookup: {
          from: "works",
          localField: "workcollage",
          foreignField: "_id",
          as: "workcollage",
        },
      },
    ])
      //*Load More
      .limit(limit);

    //* response
    responseSuccess(res, lecture);
  } catch (error) {
    //! Handle error
    console.log(error);
    next(createError(500, "Server Error"));
  }
};

export default getLecture;
