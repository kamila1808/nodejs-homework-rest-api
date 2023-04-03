const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const { Users } = require("../../db/userModel");

const { usersSchema } = require("../../schemas");

const { sendMail } = require("../../helpers");

const signup = async (req, res) => {
  const body = req.body;
  const { error } = usersSchema.validate(body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (user) {
    return res.status(409).json({ message: "Email in use" });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  const newUser = await Users.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Подтверждение email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Нажмите, чтобы подтвердить email</a>`,
  };
  await sendMail(mail);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL,
      verificationToken,
    },
  });
};

module.exports = signup;
