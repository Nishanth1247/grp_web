const db = require("../config/db")

exports.getMemberDashboard = (req,res)=>{

const userId = req.user.id

let data = {}

db.query(
`SELECT 
ROUND(
SUM(status='Present')/COUNT(*)*100
) AS attendance
FROM attendance
WHERE user_id=?`,
[userId],
(err,result)=>{

data.attendance = result[0].attendance || 0

db.query(
"SELECT activity_points,reward_points FROM users WHERE id=?",
[userId],
(err,result)=>{

data.activityPoints = result[0].activity_points
data.rewardPoints = result[0].reward_points

data.events = 0
data.level = "Gold Member"

data.recentEvents = []
data.recentPSBookings = []
data.roles = []

res.json(data)

})

})

}


exports.getMemberProjects = (req,res)=>{
    res.json({
        message: "Projects API working"
    })
}