import Work from "../../../models/workModel.js";
import createError from "../../../utils/error.js";
import responseSuccess from "../../../utils/responseSuccess.js";

const getWork = async (req, res, next) => {
  try {
    const work = await Work.aggregate([
      {
        $lookup: {
          from: "collages",
          localField: "detailcollage",
          foreignField: "_id",
          as: "detailcollage",
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          desc: 1,
          link: 1,
          thumbnail: 1,
          createdAt: 1,
          __v: 1,
          detailuser: {
            $arrayElemAt: ["$detailcollage.detailuser", 0],
          },
          username: {
            $arrayElemAt: ["$detailcollage.username", 0],
          },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          desc: 1,
          link: 1,
          thumbnail: 1,
          createdAt: 1,
          __v: 1,
          detailcollage: {
            fullname: "$detailuser.fullname",
            gender: "$detailuser.gender",
            thumbnailprofil: "$detailuser.thumbnail",
            username: "$username",
          },
        },
      },
    ]);

    if (!work) {
      next(
        createError(
          404,
          "Maaf, data yang Anda minta tidak dapat ditemukan di server kami."
        )
      );
    }

    responseSuccess(res, work);
  } catch (error) {
    next(createError(500, "Server Error"));
  }
};

export default getWork
