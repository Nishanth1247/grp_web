const db = require("../config/db")

// get all users
exports.getMembers = (req,res)=>{

db.query(
"SELECT id,name FROM users WHERE role='member'",
(err,result)=>{

if(err) return res.status(500).json(err)

res.json(result)

})

}


// mark attendance
exports.markAttendance = (req,res)=>{

const {user_id,status} = req.body

db.query(
"INSERT INTO attendance(user_id,date,status) VALUES (?,CURDATE(),?)",
[user_id,status],
(err,result)=>{

if(err) return res.status(500).json(err)

res.json({message:"Attendance updated"})

})

}