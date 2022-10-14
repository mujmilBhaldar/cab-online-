const path = require("path");
function clientValidation(req, res, next) {
  const { origin } = req.headers;

  const ext = path.extname(req.url);

  if ([".svg", ".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext))
    return next();
  if (origin == process.env.CLIENT) {
    next();
  } else {
    res.status(403).send({ message: "Access Forbidden" });
  }
}

module.exports = clientValidation;
