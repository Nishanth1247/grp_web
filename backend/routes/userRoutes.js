const router = require("express").Router();
const controller = require("../controllers/userController");
const { verifyToken, authorize } = require("../middleware/authMiddleware");

router.get("/", verifyToken, authorize("CAP", "V_CAP", "MANAGER", "STRATEGIST"), controller.getUsers);
router.put("/:id/role", verifyToken, authorize("CAP", "V_CAP"), controller.updateUserRole);

module.exports = router;
