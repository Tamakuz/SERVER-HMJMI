import getCollage from "../../services/collages/profiles/getCollage.js";

export default ({router}) => {
  router.get("/collage", getCollage);
}