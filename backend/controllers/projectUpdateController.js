const db = require("../config/db")

exports.addUpdate = (req,res)=>{

const {project_id,update_text} = req.body

const userId = req.user.id

db.query(
"INSERT INTO project_updates (project_id,user_id,update_text) VALUES (?,?,?)",
[project_id,userId,update_text],
(err,result)=>{

if(err) return res.send(err)

res.json({message:"Update posted"})

})

}

exports.getProjectUpdates = (req,res)=>{

const projectId = req.params.id

db.query(
`SELECT project_updates.*,users.name
FROM project_updates
JOIN users ON users.id=project_updates.user_id
WHERE project_id=?`,
[projectId],
(err,result)=>{

if(err) return res.send(err)

res.json(result)

})

}