const router = require("express").Router()

const controller = require("../controllers/projectController")

const {verifyToken} = require("../middleware/authMiddleware")
const {isAdmin} = require("../middleware/roleMiddleware")

router.post("/",verifyToken,isAdmin,controller.createProject)

router.get("/",verifyToken,isAdmin,controller.getProjects)

router.get("/my",verifyToken,controller.getMemberProjects)

module.exports = router