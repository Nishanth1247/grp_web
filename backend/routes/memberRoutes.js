const router = require("express").Router()
const controller = require("../controllers/memberController")
const {verifyToken} = require("../middleware/authMiddleware")

router.get("/dashboard",verifyToken,controller.getMemberDashboard)
router.get("/projects", verifyToken, controller.getMemberProjects)

module.exports = router