const db = require("../config/db")

exports.createProject=(req,res)=>{

const {name,description,assigned_to}=req.body

db.query(
"INSERT INTO projects(name,description,assigned_to,status) VALUES (?,?,?,?)",
[name,description,assigned_to,"pending"],
(err,result)=>{
if(err) return res.send(err)

res.send("Project created")
}
)

}

exports.getProjects=(req,res)=>{

db.query(
"SELECT projects.*,users.name FROM projects JOIN users ON users.id=projects.assigned_to",
(err,result)=>{
if(err) return res.send(err)

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
if(err) return res.send(err)

res.json(result)
}
)

}