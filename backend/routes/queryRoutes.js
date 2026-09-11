const router = require("express").Router();

const queryController = require("../controllers/queryController");

const { verifyToken, authorize } = require("../middleware/authMiddleware");

// member/user sends query
router.post("/", verifyToken, authorize("CAP", "V_CAP", "MANAGER", "STRATEGIST", "MEMBER"), queryController.createQuery);

// management views all queries
router.get("/", verifyToken, authorize("CAP", "V_CAP", "MANAGER"), queryController.getQueries);

// management replies to query
router.put("/reply", verifyToken, authorize("CAP", "V_CAP", "MANAGER"), queryController.replyQuery);

module.exports = router;