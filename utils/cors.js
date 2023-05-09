import cors from "cors";
import config from "../config/index.js";

const corsConfig = ({ app }) => {
  const { primaryDomainAccess } = config;
  app.use(
    cors({
      origin: [primaryDomainAccess, "http://localhost:4000"],
      credentials: true,
    })
  );
};

export default corsConfig;
