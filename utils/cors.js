import cors from "cors";
import config from "../config/index.js";

const corsConfig = ({ app }) => {
  const { primaryDomainAccess } = config;
  app.use(
    cors({
      origin: [
        primaryDomainAccess,
        "http://localhost:4000",
        "http://127.0.0.1",
      ],
      credentials: true,
      exposedHeaders: ["set-cookie"],
    })
  );
};

export default corsConfig;
