import logout from "../../services/logout/logout.js";

export default ({ router }) => {
  router.delete("/logout", logout);
};
