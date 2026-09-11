const router = require("express").Router()

const controller = require("../controllers/projectController")

const {verifyToken, authorize} = require("../middleware/authMiddleware")

router.post("/", verifyToken, authorize("CAP", "V_CAP", "MANAGER"), controller.createProject)

router.get("/", verifyToken, authorize("CAP", "V_CAP", "MANAGER", "STRATEGIST"), controller.getProjects)

router.get("/my", verifyToken, authorize("CAP", "V_CAP", "MANAGER", "STRATEGIST", "MEMBER"), controller.getMemberProjects)

module.exports = router