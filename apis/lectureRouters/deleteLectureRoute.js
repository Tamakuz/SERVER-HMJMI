import deleteLecture from "../../services/lectures/profiles/deleteLecture.js";

export default ({ router }) => {
  router.delete("/lecture/:id", deleteLecture);
};
