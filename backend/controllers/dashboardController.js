const db = require("../config/db")

exports.getStats = (req,res)=>{

let stats = {}

db.query("SELECT COUNT(*) AS projects FROM projects",(err,result)=>{

if(err) return res.status(500).json(err)

stats.projects = result[0].projects

db.query("SELECT COUNT(*) AS members FROM users WHERE role='member'",(err,result)=>{

if(err) return res.status(500).json(err)

stats.members = result[0].members

db.query("SELECT COUNT(*) AS queries FROM queries WHERE reply IS NULL",(err,result)=>{

if(err) return res.status(500).json(err)

stats.queries = result[0].queries

db.query(
"SELECT COUNT(*) AS attendance FROM attendance WHERE date = CURDATE() AND status='Present'",
(err,result)=>{

if(err) return res.status(500).json(err)

stats.attendance = result[0].attendance

res.json(stats)

})

})

})

})

}