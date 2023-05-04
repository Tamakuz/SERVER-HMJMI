import path from "path"
import dotenv from "dotenv"

//* Setup config procces
dotenv.config()

const config = {
  host: process.env.HOST,
  primaryAllowAccessPort: process.env.PRIMARY_SERVER_PORT,
  secondaryAllowAccessPort: process.env.SECONDARY_SERVER_PORT,
  mainServerPort: process.env.MAIN_SERVER_PORT,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  rootPath: path.resolve(),
  api: {
    prefix: "/api",
  },
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  primaryDomainAccess: process.env.PRIMARY_DOMAIN_ACCESS,
};

export default config