import cors from "cors";
import config from "../config/index.js";

const corsConfig = ({ app }) => {
  const { primaryDomainAccess } = config;
  app.use(
    cors({
      origin: [
        /http:\/\/localhost:\d+/,
        /http:\/\/127\.0\.0\.1:\d+/,
        "http://localhost",
        "http://127.0.0.1",
        "https://tamakuz.github.io",
      ],
      credentials: true,
      exposedHeaders: ["set-cookie"],
    })
  );
};

export default corsConfig;
