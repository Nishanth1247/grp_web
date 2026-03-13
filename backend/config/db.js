const mysql = require("mysql2");

const db = mysql.createConnection({
host:"localhost",
user:"root",
password:"0707077",
database:"team_dashboard"
});

db.connect((err)=>{
if(err){
console.log(err)
}else{
console.log("MySQL Connected")
}
})

module.exports = db;