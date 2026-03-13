const router = require("express").Router()
const controller = require("../controllers/attendanceController")
const {verifyToken,isAdmin} = require("../middleware/authMiddleware")

router.get("/members",verifyToken,isAdmin,controller.getMembers)
router.post("/",verifyToken,isAdmin,controller.markAttendance)

module.exports = router