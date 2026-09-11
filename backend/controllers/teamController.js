const db = require("../config/db");

// Get all teams with team_id and member details
exports.getTeams = (req, res) => {
  db.query(
    `SELECT teams.id AS team_id, teams.team_name, teams.leader,
            team_members.id AS member_id, team_members.name, team_members.role
     FROM teams
     LEFT JOIN team_members ON teams.id = team_members.team_id
     ORDER BY teams.id DESC`,
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json(result);
    }
  );
};

// Create a new team
exports.createTeam = (req, res) => {
  const { team_name, leader, members } = req.body;

  if (!team_name || !leader) {
    return res.status(400).json({ message: "Team name and leader are required" });
  }

  db.query(
    "INSERT INTO teams (team_name, leader) VALUES (?, ?)",
    [team_name, leader],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database insert error", error: err });
      }

      const teamId = result.insertId;
      const memberInserts = [];

      // Add leader as HEAD
      memberInserts.push([teamId, leader, "HEAD"]);

      // Add unique member list
      if (Array.isArray(members)) {
        const uniqueMembers = [...new Set(members)];
        uniqueMembers.forEach((mName) => {
          if (mName && mName !== leader) {
            memberInserts.push([teamId, mName, "MEMBER"]);
          }
        });
      }

      if (memberInserts.length > 0) {
        db.query(
          "INSERT INTO team_members (team_id, name, role) VALUES ?",
          [memberInserts],
          (err2) => {
            if (err2) console.error("Error inserting team members:", err2);
            res.status(201).json({ message: "Team created successfully", teamId });
          }
        );
      } else {
        res.status(201).json({ message: "Team created successfully", teamId });
      }
    }
  );
};

// Update an existing team
exports.updateTeam = (req, res) => {
  const teamId = req.params.id;
  const { team_name, leader, members } = req.body;

  if (!team_name || !leader) {
    return res.status(400).json({ message: "Team name and leader are required" });
  }

  db.query(
    "UPDATE teams SET team_name=?, leader=? WHERE id=?",
    [team_name, leader, teamId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database update error", error: err });
      }

      // Delete existing member mapping and re-insert synchronized list
      db.query("DELETE FROM team_members WHERE team_id=?", [teamId], (err2) => {
        if (err2) return res.status(500).json(err2);

        const memberInserts = [];
        memberInserts.push([teamId, leader, "HEAD"]);

        if (Array.isArray(members)) {
          const uniqueMembers = [...new Set(members)];
          uniqueMembers.forEach((mName) => {
            if (mName && mName !== leader) {
              memberInserts.push([teamId, mName, "MEMBER"]);
            }
          });
        }

        if (memberInserts.length > 0) {
          db.query(
            "INSERT INTO team_members (team_id, name, role) VALUES ?",
            [memberInserts],
            (err3) => {
              if (err3) console.error("Error updating team members:", err3);
              res.json({ message: "Team updated successfully" });
            }
          );
        } else {
          res.json({ message: "Team updated successfully" });
        }
      });
    }
  );
};

// Delete a team
exports.deleteTeam = (req, res) => {
  const teamId = req.params.id;

  db.query("DELETE FROM team_members WHERE team_id=?", [teamId], (err) => {
    if (err) return res.status(500).json(err);

    db.query("DELETE FROM teams WHERE id=?", [teamId], (err2, result) => {
      if (err2) return res.status(500).json(err2);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Team not found" });
      }
      res.json({ message: "Team deleted successfully" });
    });
  });
};