const { Users } = require("../../db/userModel");

const authVerification = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await Users.findOne({ verificationToken });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await Users.findByIdAndUpdate(user._id, {
    verificationToken: "",
    verify: true,
  });
  return res.status(200).json({ message: "Verification successful" });
};

module.exports = authVerification;