import updateLecture from "../../services/lectures/profiles/updateLecture.js";
import upload from "../../middlewares/multer.js";

export default ({ router }) => {
  router.put("/lecture/:id", upload.single("image"), updateLecture);
};
