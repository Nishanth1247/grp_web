const db = require("../config/db")

exports.createProject=(req,res)=>{

const {name,description,assigned_to}=req.body

db.query(
"INSERT INTO projects(name,description,assigned_to,status) VALUES (?,?,?,?)",
[name,description,assigned_to,"pending"],
(err,result)=>{
if(err) return res.status(500).json(err)

res.status(201).json({ message: "Project created", projectId: result.insertId })
}
)

}

exports.getProjects=(req,res)=>{

db.query(
"SELECT projects.*, users.name AS assigned_user_name FROM projects LEFT JOIN users ON users.id=projects.assigned_to",
(err,result)=>{
if(err) return res.status(500).json(err)

res.json(result)
}
)

}

exports.getMemberProjects=(req,res)=>{

const userId = req.user.id

db.query(
"SELECT * FROM projects WHERE assigned_to=?",
[userId],
(err,result)=>{
if(err) return res.status(500).json(err)

res.json(result)
}
)

}