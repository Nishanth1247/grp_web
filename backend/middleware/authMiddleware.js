const jwt = require("jsonwebtoken")

exports.verifyToken = (req,res,next)=>{

const authHeader = req.headers.authorization

if(!authHeader){
return res.status(401).json({message:"No token"})
}

const token = authHeader.split(" ")[1]

jwt.verify(token,"secretkey",(err,decoded)=>{

if(err){
return res.status(403).json({message:"Invalid token"})
}

req.user = decoded
next()

})

}

exports.isAdmin = (req,res,next)=>{
    if(req.user.role !== "admin"){
        return res.status(403).json({message:"Admin access required"})
    }
    next()
}