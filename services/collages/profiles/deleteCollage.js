import Collage from "../../../models/collageModel.js";
import Work from "../../../models/workModel.js";
import createError from "../../../utils/error.js";
import responseSuccess from "../../../utils/responseSuccess.js";

const deleteCollage = async (req, res, next) => {
  try {
    const { id } = req.params;

    //* Mencari data Mahasiswa
    const collage = await Collage.findById(id);

    //! Data Mahasiswa tidak ditemukan
    if (!collage) {
      next(
        createError(
          404,
          "Maaf, data yang Anda minta tidak dapat ditemukan di server kami."
        )
      );
    }

    if (collage.workcollage) {
      collage.workcollage.map(async (workid) => {
        const work = await Work.findById(workid);
        work.deleteOne();
      });
    }

    //* Hapus data Mahasiswa
    collage.deleteOne();

    responseSuccess(res, { message: "Data Berhasil Dihapus" });
  } catch (error) {
    //! Debug Error
    next(createError(500, "Server Error"))
  }
};

export default deleteCollage
