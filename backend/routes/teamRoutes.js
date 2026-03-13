const router = require("express").Router()
const controller = require("../controllers/teamController")
const {verifyToken,isAdmin} = require("../middleware/authMiddleware")

router.get("/",verifyToken,isAdmin,controller.getTeams)

module.exports = router