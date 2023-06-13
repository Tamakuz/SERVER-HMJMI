import getLecture from "../../services/lectures/profiles/getLecture.js";

export default ({ router }) => {
  router.get("/lecture", getLecture);
};
