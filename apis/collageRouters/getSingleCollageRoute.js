import getSingleCollage from "../../services/collages/profiles/getSingleCollage.js";

export default ({ router }) => {
  router.get("/collage/:id", getSingleCollage);
};
