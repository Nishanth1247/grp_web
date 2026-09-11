const { authorize, isAdmin } = require("./authMiddleware");

exports.authorize = authorize;
exports.isAdmin = isAdmin;