const { Users } = require("../../db/userModel");

const logout = async (req, res) => {
  const { _id } = req.user;
  const user = await Users.findByIdAndUpdate(_id, { token: null });
  if (!user) {
    return res.status(401).json({ message: "Not authorized" });
  }
  return res.status(204).json({ message: "No Content" });
};

module.exports = logout;
