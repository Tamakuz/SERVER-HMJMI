import deleteCollage from "../../services/collages/profiles/deleteCollage.js";

export default ({ router }) => {
  router.delete("/collage/:id", deleteCollage);
};
