const router = require("express").Router();

const controller = require("../controllers/announcementController");

const { verifyToken, authorize } = require("../middleware/authMiddleware");

router.get("/", verifyToken, authorize("CAP", "V_CAP", "MANAGER", "STRATEGIST", "MEMBER"), controller.getAnnouncements);

router.post("/", verifyToken, authorize("CAP", "V_CAP"), controller.createAnnouncement);

router.delete("/:id", verifyToken, authorize("CAP", "V_CAP"), controller.deleteAnnouncement);

module.exports = router;