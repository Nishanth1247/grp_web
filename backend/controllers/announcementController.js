const db = require("../config/db");

exports.createAnnouncement = (req, res) => {

  const { title, message } = req.body;
  const adminId = req.user.id;

  if (!title || !message) {
    return res.status(400).json({ message: "Title and message required" });
  }

  db.query(
    "INSERT INTO announcements (title, message, created_by) VALUES (?, ?, ?)",
    [title, message, adminId],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Announcement created",
        announcementId: result.insertId
      });

    }
  );

};


exports.getAnnouncements = (req, res) => {

  db.query(
    "SELECT * FROM announcements ORDER BY created_at DESC",
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json(result);

    }
  );

};

exports.deleteAnnouncement = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM announcements WHERE id=?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Failed to delete announcement" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Announcement not found" });
      }

      res.status(200).json({ message: "Announcement deleted successfully" });
    }
  );
};