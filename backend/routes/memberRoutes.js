const router = require("express").Router()
const memberController = require("../controllers/memberController")
const projectController = require("../controllers/projectController")
const {verifyToken, authorize} = require("../middleware/authMiddleware")

router.get("/dashboard", verifyToken, authorize("CAP", "V_CAP", "MANAGER", "STRATEGIST", "MEMBER"), memberController.getMemberDashboard)
router.get("/projects", verifyToken, authorize("CAP", "V_CAP", "MANAGER", "STRATEGIST", "MEMBER"), projectController.getMemberProjects)

module.exports = router