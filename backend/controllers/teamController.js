const db = require("../config/db")

exports.getTeams = (req,res)=>{

db.query(
`SELECT teams.team_name, teams.leader,
team_members.name, team_members.role
FROM teams
LEFT JOIN team_members
ON teams.id = team_members.team_id`,
(err,result)=>{

if(err){
console.log(err)
return res.status(500).json(err)
}

res.json(result)

})

}