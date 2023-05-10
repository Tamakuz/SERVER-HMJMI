import getImage from "../../services/image/index.js";

export default ({ router }) => {
  router.get("/image/:filename", getImage);
};
