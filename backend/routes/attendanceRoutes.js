const router = require("express").Router()
const controller = require("../controllers/attendanceController")
const {verifyToken,isAdmin} = require("../middleware/authMiddleware")

router.get("/members",verifyToken,isAdmin,controller.getMembers)
router.get("/my",verifyToken,controller.getMemberAttendance)
router.post("/",verifyToken,isAdmin,controller.markAttendance)

module.exports = router