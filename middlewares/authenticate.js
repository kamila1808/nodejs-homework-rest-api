const jwt = require("jsonwebtoken");

const { Users } = require("../../db/userModel");
const { SECRET } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer = "", token = ""] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      next();
    }
    try {
      const { id } = jwt.verify(token, SECRET);
      const user = await Users.findById(id);
      if (!user || !user.token || user.token !== token) {
        next();
      }
      req.user = user;
      next();
    } catch (error) {
      throw error(401, error.message);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;