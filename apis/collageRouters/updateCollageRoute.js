import updateCollage from "../../services/collages/profiles/updateCollage.js";
import upload from "../../middlewares/multer.js"

export default ({ router }) => {
  router.put("/collage/:id", upload.single("image"), updateCollage);
};
