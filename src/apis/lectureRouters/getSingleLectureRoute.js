import getSingleLecture from "../../services/lectures/profiles/getSingleLecture.js";

export default ({ router }) => {
  router.get("/lecture/:id", getSingleLecture);
};
