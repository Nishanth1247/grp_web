const router = require("express").Router();
const controller = require("../controllers/teamController");
const { verifyToken, authorize } = require("../middleware/authMiddleware");

router.get("/", verifyToken, authorize("CAP", "V_CAP", "MANAGER", "STRATEGIST"), controller.getTeams);
router.post("/", verifyToken, authorize("CAP", "V_CAP", "MANAGER"), controller.createTeam);
router.put("/:id", verifyToken, authorize("CAP", "V_CAP", "MANAGER"), controller.updateTeam);
router.delete("/:id", verifyToken, authorize("CAP", "V_CAP"), controller.deleteTeam);

module.exports = router;