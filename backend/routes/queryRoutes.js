const router = require("express").Router();

const queryController = require("../controllers/queryController");

const { verifyToken } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

// member sends query
router.post("/", verifyToken, queryController.createQuery);

// admin gets all queries
router.get("/", verifyToken, isAdmin, queryController.getQueries);

// admin replies to query
router.put("/reply", verifyToken, isAdmin, queryController.replyQuery);

module.exports = router;