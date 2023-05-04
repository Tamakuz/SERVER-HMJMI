import getSingleWork from "../../services/collages/works/getSingleWork.js"

export default ({ router }) => {
  router.get("/work/:id", getSingleWork);
};
