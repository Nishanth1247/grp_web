const db = require("../config/db");

function queryPromise(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

// CAP Executive Dashboard
exports.getCAPStats = async (req, res) => {
  try {
    const users = await queryPromise("SELECT COUNT(*) AS count FROM users");
    const teams = await queryPromise("SELECT COUNT(*) AS count FROM teams");
    const projects = await queryPromise("SELECT COUNT(*) AS count FROM projects");
    const queries = await queryPromise("SELECT COUNT(*) AS count FROM queries WHERE reply IS NULL");
    const attendance = await queryPromise("SELECT COUNT(*) AS count FROM attendance WHERE date=CURDATE() AND status='Present'");
    
    const recentProjects = await queryPromise("SELECT projects.id, projects.name, projects.status, users.name AS assigned_user_name FROM projects LEFT JOIN users ON users.id=projects.assigned_to ORDER BY projects.id DESC LIMIT 5");
    const recentQueries = await queryPromise("SELECT queries.id, users.name, queries.message FROM queries JOIN users ON users.id=queries.user_id WHERE reply IS NULL LIMIT 5");
    const announcements = await queryPromise("SELECT id, title, message, created_at FROM announcements ORDER BY created_at DESC LIMIT 5");

    res.json({
      stats: {
        totalUsers: users[0].count,
        totalTeams: teams[0].count,
        totalProjects: projects[0].count,
        openQueries: queries[0].count,
        todayAttendance: attendance[0].count
      },
      recentProjects,
      recentQueries,
      announcements
    });
  } catch (err) {
    res.status(500).json({ message: "Error loading CAP stats", error: err.message });
  }
};

// V_CAP Operations Dashboard
exports.getVCAPStats = async (req, res) => {
  try {
    const teams = await queryPromise("SELECT COUNT(*) AS count FROM teams");
    const members = await queryPromise("SELECT COUNT(*) AS count FROM users WHERE LOWER(role)='member'");
    const projects = await queryPromise("SELECT COUNT(*) AS count FROM projects");
    const attendance = await queryPromise("SELECT COUNT(*) AS count FROM attendance WHERE date=CURDATE() AND status='Present'");
    
    const recentProjects = await queryPromise("SELECT projects.id, projects.name, projects.status FROM projects ORDER BY projects.id DESC LIMIT 5");
    const announcements = await queryPromise("SELECT id, title, message FROM announcements ORDER BY created_at DESC LIMIT 5");

    res.json({
      stats: {
        totalTeams: teams[0].count,
        totalMembers: members[0].count,
        totalProjects: projects[0].count,
        todayAttendance: attendance[0].count
      },
      recentProjects,
      announcements
    });
  } catch (err) {
    res.status(500).json({ message: "Error loading V_CAP stats", error: err.message });
  }
};

// MANAGER Operational Dashboard
exports.getManagerStats = async (req, res) => {
  try {
    const teams = await queryPromise("SELECT COUNT(*) AS count FROM teams");
    const members = await queryPromise("SELECT COUNT(*) AS count FROM users WHERE LOWER(role)='member'");
    const activeProjects = await queryPromise("SELECT COUNT(*) AS count FROM projects WHERE status!='Completed'");
    const pendingQueries = await queryPromise("SELECT COUNT(*) AS count FROM queries WHERE reply IS NULL");
    
    const teamList = await queryPromise(`
      SELECT teams.team_name, teams.leader, COUNT(team_members.id) AS member_count
      FROM teams
      LEFT JOIN team_members ON teams.id = team_members.team_id
      GROUP BY teams.id, teams.team_name, teams.leader
    `);

    res.json({
      stats: {
        teamsCount: teams[0].count,
        membersCount: members[0].count,
        activeProjects: activeProjects[0].count,
        pendingQueries: pendingQueries[0].count
      },
      teamList
    });
  } catch (err) {
    res.status(500).json({ message: "Error loading Manager stats", error: err.message });
  }
};

// STRATEGIST Analytics Dashboard
exports.getStrategistStats = async (req, res) => {
  try {
    const totalAttendance = await queryPromise("SELECT COUNT(*) AS total, SUM(status='Present') AS present FROM attendance");
    const totalProjects = await queryPromise("SELECT COUNT(*) AS total, SUM(status='Completed') AS completed FROM projects");
    
    const totalCount = totalAttendance[0].total || 0;
    const presentCount = totalAttendance[0].present || 0;
    const attendanceRate = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

    const projTotal = totalProjects[0].total || 0;
    const projCompleted = totalProjects[0].completed || 0;
    const projectCompletionRate = projTotal > 0 ? Math.round((projCompleted / projTotal) * 100) : 0;

    const projectBreakdown = await queryPromise("SELECT status, COUNT(*) as count FROM projects GROUP BY status");

    res.json({
      analytics: {
        attendanceRate,
        totalRecords: totalCount,
        presentDays: presentCount,
        projectCompletionRate,
        totalProjects: projTotal,
        completedProjects: projCompleted
      },
      projectBreakdown
    });
  } catch (err) {
    res.status(500).json({ message: "Error loading Strategist stats", error: err.message });
  }
};

// Legacy/Common Stats
exports.getStats = async (req, res) => {
  try {
    const projects = await queryPromise("SELECT COUNT(*) AS count FROM projects");
    const members = await queryPromise("SELECT COUNT(*) AS count FROM users WHERE LOWER(role)='member'");
    const queries = await queryPromise("SELECT COUNT(*) AS count FROM queries WHERE reply IS NULL");
    const attendance = await queryPromise("SELECT COUNT(*) AS count FROM attendance WHERE date=CURDATE() AND status='Present'");

    res.json({
      projects: projects[0].count,
      members: members[0].count,
      queries: queries[0].count,
      attendance: attendance[0].count
    });
  } catch (err) {
    res.status(500).json(err);
  }
};