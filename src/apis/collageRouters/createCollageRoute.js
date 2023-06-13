import createCollage from "../../services/collages/profiles/createCollage.js";

export default ({ router }) => {
  router.post("/register/collage", createCollage);
};
