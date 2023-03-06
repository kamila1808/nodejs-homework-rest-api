// const bcrypt = require("bcrypt");
const Joi = require("joi");

const { Users } = require("../../db/userModel");

const usersSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

async function signup(req, res) {
    const body = req.body;
    const { error } = usersSchema.validate(body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
  
    const user = await Users.findOne({ email: body.email });
    if (user) {
      return res.status(409).json({ message: "Email in use" });
    }
    const newUser = await Users.create(body);
    return res.status(201).json({ data: newUser });
  }

  module.exports = signup