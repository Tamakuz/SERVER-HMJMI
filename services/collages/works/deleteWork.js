import Work from "../../../models/workModel.js";
import Collage from "../../../models/collageModel.js";
import createError from "../../../utils/error.js";
import responseSuccess from "../../../utils/responseSuccess.js";
import admin from "firebase-admin";
import cache from "memory-cache"

const deleteWork = async (req, res, next) => {
  try {
    const { workId, collageId } = req.params;
    const bucket = admin.storage().bucket();

    //* Mencari data work dan collage di db
    const work = await Work.findById(workId);
    const collage = await Collage.findById(collageId);

    if (!work || !collage) {
      next(createError(404, "Data tidak ditemukan"));
    }

    //* Mencocokan data work dengan collage
    if (collage.workcollage.includes(workId)) {
      //* Menghapus data index Menyimpan kembali data collage
      let index = collage.workcollage.indexOf(workId);
      collage.workcollage.splice(index, 1);
      await collage.save();

      //* hapus image work
      if (work.thumbnail) {
        const image = bucket.file(`works/${work.thumbnail}`);
        await image.delete();
      }

      //* Menghapus data work dan response
      await work.deleteOne();
      cache.del("__express__/api/collage/" + collageId);
      cache.del("__express__/api/work/" + workId);
      responseSuccess(res, { message: "Data berhasil dihapus" });
    } else {
      //* hapus image work
      if (work.thumbnail) {
        const image = bucket.file(`works/${work.thumbnail}`);
        await image.delete();
      }
      //* Menghapus data work yang tidak terpakai
      await work.deleteOne();

      //* Response jika data tidak cocok
      next(
        createError(442, {
          message:
            "Server menerima permintaan, tetapi tidak dapat memprosesnya karena salah satu data tidak cocok dengan data lain atau tidak valid",
        })
      );
    }
  } catch (error) {
    console.log(error);
    next(createError(500, "Server Error"));
  }
};

export default deleteWork;
