import createLecture from "../../services/lectures/profiles/createLecture.js";

export default ({ router }) => {
  router.post("/register/lecture", createLecture);
};
