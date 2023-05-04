import deleteWork from "../../services/collages/works/deleteWork.js"

export default ({ router }) => {
  router.delete("/work/:workId/collage/:collageId", deleteWork);
};
