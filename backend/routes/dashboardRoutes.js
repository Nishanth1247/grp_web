const router = require("express").Router()
const controller = require("../controllers/dashboardController")
const {verifyToken, authorize} = require("../middleware/authMiddleware")

router.get("/stats", verifyToken, authorize("CAP", "V_CAP", "MANAGER", "STRATEGIST"), controller.getStats)

module.exports = router