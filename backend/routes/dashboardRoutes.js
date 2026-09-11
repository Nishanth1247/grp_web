const router = require("express").Router()
const controller = require("../controllers/dashboardController")
const {verifyToken, isAdmin} = require("../middleware/authMiddleware")

router.get("/stats", verifyToken, isAdmin, controller.getStats)

module.exports = router