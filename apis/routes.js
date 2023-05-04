import express from "express";
import getCollageRoute from "./collageRouters/getCollageRoute.js";
import createCollageRoute from "./collageRouters/createCollageRoute.js"
import updateCollageRoute from "./collageRouters/updateCollageRoute.js";
import getSingleCollageRoute from "./collageRouters/getSingleCollageRoute.js";
import deleteCollageRoute from "./collageRouters/deleteCollageRoute.js";
import createWorkRoute from "./workRouters/createWorkRoute.js";
import getWorkRoute from "./workRouters/getWorkRoute.js";
import updateWorkRoute from "./workRouters/updateWorkRoute.js";
import deleteWorkRoute from "./workRouters/deleteWorkRoute.js";
import createLectureRoute from "./lectureRouters/createLectureRoute.js";
import getLectureRoute from "./lectureRouters/getLectureRoute.js";
import getSingleLectureRoute from "./lectureRouters/getSingleLectureRoute.js";
import updateLectureRoute from "./lectureRouters/updateLectureRoute.js";
import deleteLectureRoute from "./lectureRouters/deleteLectureRoute.js";
import getSingleWorkRoute from "./workRouters/getSingleWorkRoute.js";
import loginRoute from "./jwtRouters/loginRoute.js";
import refreshTokenRoute from "./jwtRouters/refreshTokenRoute.js";
import logoutRoute from "./jwtRouters/logoutRoute.js";

const router = express.Router();

//* Setup router lecture
getLectureRoute({router})
getSingleLectureRoute({router})
createLectureRoute({router})
updateLectureRoute({router})
deleteLectureRoute({router})

//* Setup router collage
getCollageRoute({router})
getSingleCollageRoute({router})
createCollageRoute({router})
updateCollageRoute({router})
deleteCollageRoute({router})

//*Setup router work collage
getWorkRoute({router})
getSingleWorkRoute({router})
createWorkRoute({router})
updateWorkRoute({router})
deleteWorkRoute({router})

//* Login setup
loginRoute({router})
logoutRoute({router})
refreshTokenRoute({router})

export default router
