import refreshToken from "../../middlewares/refreshToken.js";

export default ({ router }) => {
  router.get("/token", refreshToken);
};
