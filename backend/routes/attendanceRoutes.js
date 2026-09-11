const router = require("express").Router()
const controller = require("../controllers/attendanceController")
const {verifyToken, authorize} = require("../middleware/authMiddleware")

router.get("/members", verifyToken, authorize("CAP", "V_CAP", "MANAGER", "STRATEGIST"), controller.getMembers)
router.get("/my", verifyToken, authorize("CAP", "V_CAP", "MANAGER", "STRATEGIST", "MEMBER"), controller.getMemberAttendance)
router.post("/", verifyToken, authorize("CAP", "V_CAP", "MANAGER"), controller.markAttendance)

module.exports = router