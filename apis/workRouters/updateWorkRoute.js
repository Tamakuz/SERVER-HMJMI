import updateWork from "../../services/collages/works/updateWork.js";
import upload from "../../middlewares/multer.js";

export default ({ router }) => {
  router.put("/work/:id", upload.single("image"), updateWork);
};
