const router = require("express").Router()
const controller = require("../controllers/teamController")
const {verifyToken, authorize} = require("../middleware/authMiddleware")

router.get("/", verifyToken, authorize("CAP", "V_CAP", "MANAGER", "STRATEGIST"), controller.getTeams)

module.exports = router