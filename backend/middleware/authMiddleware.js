const jwt = require("jsonwebtoken")

exports.verifyToken = (req,res,next)=>{

const authHeader = req.headers.authorization

if(!authHeader){
return res.status(401).json({message:"No token"})
}

const token = authHeader.split(" ")[1]

jwt.verify(token,process.env.JWT_SECRET || "secretkey",(err,decoded)=>{

if(err){
return res.status(403).json({message:"Invalid token"})
}

req.user = decoded
next()

})

}

exports.authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient permissions" });
    }
    next();
  };
};

exports.isAdmin = (req, res, next) => {
  const adminRoles = ["CAP", "V_CAP", "MANAGER", "STRATEGIST", "admin"];
  if (!req.user || !adminRoles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};