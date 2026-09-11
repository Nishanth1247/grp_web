const router = require("express").Router();
const controller = require("../controllers/dashboardController");
const { verifyToken, authorize } = require("../middleware/authMiddleware");

router.get("/cap", verifyToken, authorize("CAP"), controller.getCAPStats);
router.get("/vcap", verifyToken, authorize("V_CAP", "CAP"), controller.getVCAPStats);
router.get("/manager", verifyToken, authorize("MANAGER", "CAP", "V_CAP"), controller.getManagerStats);
router.get("/strategist", verifyToken, authorize("STRATEGIST", "CAP", "V_CAP"), controller.getStrategistStats);
router.get("/stats", verifyToken, authorize("CAP", "V_CAP", "MANAGER", "STRATEGIST"), controller.getStats);

module.exports = router;