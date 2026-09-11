const db = require("../config/db");

// Get all users
exports.getUsers = (req, res) => {
  db.query(
    "SELECT id, name, email, role, activity_points, reward_points FROM users ORDER BY id ASC",
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json(result);
    }
  );
};

// Update user role
exports.updateUserRole = (req, res) => {
  const targetUserId = req.params.id;
  const { role: newRole } = req.body;
  const actorRole = req.user.role;

  const validRoles = ["CAP", "V_CAP", "MANAGER", "STRATEGIST", "MEMBER"];
  if (!validRoles.includes(newRole)) {
    return res.status(400).json({ message: "Invalid role specified" });
  }

  // Check target user's current role
  db.query("SELECT role FROM users WHERE id=?", [targetUserId], (err, result) => {
    if (err || result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentTargetRole = result[0].role;

    // V_CAP cannot modify CAP users or make someone CAP
    if (actorRole === "V_CAP") {
      if (currentTargetRole === "CAP" || newRole === "CAP") {
        return res.status(403).json({ message: "Vice Captain cannot promote to or modify Captain role" });
      }
    }

    db.query("UPDATE users SET role=? WHERE id=?", [newRole, targetUserId], (err2) => {
      if (err2) {
        return res.status(500).json(err2);
      }
      res.json({ message: "User role updated successfully", role: newRole });
    });
  });
};
