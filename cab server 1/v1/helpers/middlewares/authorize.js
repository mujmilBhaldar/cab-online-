const { verifyToken } = require("../token");
function authorize(roles = ["admin"]) {
  return (req, res, next) => {
    const token = req.headers.authorization;
    let payload;
    try {
      payload = verifyToken(token);
    } catch (e) {
      console.log(e);
    }

    if (!payload) return res.status(403).send({ message: "You need to login" });

    if (roles.includes(payload?.role)) {
      next();
    } else {
      res.status(401).send({ message: "you are not authorized to access" });
    }
  };
}

module.exports = authorize;
