import login from "../../services/login/login.js";

export default ({ router }) => {
  router.post("/login", login);
};
