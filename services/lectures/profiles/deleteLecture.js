import Lecture from "../../../models/lectureModel.js"
import createError from "../../../utils/error.js";
import responseSuccess from "../../../utils/responseSuccess.js";

const deleteLecture = async (req, res, next) => {
  try {
    const { id } = req.params;

    //* Mencari data Mahasiswa
    const lecture = await Lecture.findById(id);

    //! Data Mahasiswa tidak ditemukan
    if (!lecture) {
      next(
        createError(
          404,
          "Maaf, data yang Anda minta tidak dapat ditemukan di server kami."
        )
      );
    }

    //* Hapus data Mahasiswa
    lecture.deleteOne();
    responseSuccess(res, { message: "Data Berhasil Dihapus" });
  } catch (error) {
    console.log(error);
    //! Debug Error
    next(createError(500, "Server Error"));
  }
};

export default deleteLecture;
