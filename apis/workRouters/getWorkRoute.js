import getWork from "../../services/collages/works/getWork.js";

export default ({ router }) => {
  router.get("/work", getWork);
};
