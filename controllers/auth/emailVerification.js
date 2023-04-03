const { Users } = require("../../db/userModel");
const { sendMail } = require("../../helpers");

const emailVerification = async (req, res) => {
  const { email } = req.body;

  const user = await Users.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "missing required field email" });
  }

  if (user.verify) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }
  const mail = {
    to: email,
    subject: "Подтверждение email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Нажмите, чтобы подтвердить email</a>`,
  };
  await sendMail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = emailVerification;
