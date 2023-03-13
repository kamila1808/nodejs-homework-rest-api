const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Users } = require("../../db/userModel");
const { SECRET } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });
  const compareResult = await bcrypt.compare(password, user.password);

  if (!user || !compareResult) {
    res.status(401).json({ message: "Email or password is wrong" });
  }

  const id = user._id;
  const token = jwt.sign({ id }, SECRET, { expiresIn: "23h" });
  await Users.findByIdAndUpdate(id, { token });
  res.status(201).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
