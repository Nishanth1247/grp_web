const router = require("express").Router();

const controller = require("../controllers/announcementController");

const { verifyToken } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

router.get("/", verifyToken, controller.getAnnouncements);

router.post("/", verifyToken, isAdmin, controller.createAnnouncement);

module.exports = router;