const router = require("express").Router()
const memberController = require("../controllers/memberController")
const projectController = require("../controllers/projectController")
const {verifyToken} = require("../middleware/authMiddleware")

router.get("/dashboard", verifyToken, memberController.getMemberDashboard)
router.get("/projects", verifyToken, projectController.getMemberProjects)

module.exports = router