import createWork  from "../../services/collages/works/createWork.js";
import upload from "../../middlewares/multer.js"

export default ({ router }) => {
  router.post("/work/collage/:collageId", upload.single("image"), createWork);
};
