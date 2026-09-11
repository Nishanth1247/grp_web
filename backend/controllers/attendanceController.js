const db = require("../config/db")

// get all members with today's attendance status
exports.getMembers = (req,res)=>{

db.query(
`SELECT users.id, users.name, COALESCE(attendance.status, 'Absent') AS status
 FROM users 
 LEFT JOIN attendance ON users.id = attendance.user_id AND attendance.date = CURDATE()
 WHERE LOWER(users.role) = 'member'`,
(err,result)=>{

if(err) return res.status(500).json(err)

res.json(result)

})

}


// mark attendance with upsert
exports.markAttendance = (req,res)=>{

const {user_id,status} = req.body

db.query(
"INSERT INTO attendance (user_id, date, status) VALUES (?, CURDATE(), ?) ON DUPLICATE KEY UPDATE status = VALUES(status)",
[user_id,status],
(err,result)=>{

if(err) return res.status(500).json(err)

res.json({message:"Attendance updated"})

})

}

// get logged-in member's attendance history
exports.getMemberAttendance = (req,res)=>{

const userId = req.user.id

db.query(
"SELECT id, user_id, date, status FROM attendance WHERE user_id=? ORDER BY date DESC",
[userId],
(err,result)=>{

if(err) return res.status(500).json(err)

res.json(result)

})

}