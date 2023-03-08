const jwt = require("jsonwebtoken");

const { Users } = require("../db/userModel");
const { SECRET } = process.env;

const authMiddleware = async (req, res, next) => {
const { authorization = "" } = req.headers;
const [bearer, token] = authorization.split(" ");
if (bearer !== "Bearer") {
      next(res.status(401).json({ message: "Not authorized" }));
}
try {
  const { id } = jwt.verify(token, SECRET);
  const user = await Users.findById(id);
  if (!user || !user.token || user.token !== token) {
      next(res.status(401).json({ message: "Not authorized" }));
}
  req.user = user;
  next();
} catch (error) {
  next(error);
}
};

module.exports = authMiddleware;
