// import express from "express"
// import { protectRout } from "../middleware/auth.middleware";
// import { getUserForSidebar,getMessages } from "../controllers/message.controller";

// const router = express.Router();

// router.get("/users",protectRout,getUserForSidebar)
// router.get("/:id",protectRout,getMessages)
// router.get("/send/:id",protectRout,sendMessage)


// export default router;

import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);

export default router;
