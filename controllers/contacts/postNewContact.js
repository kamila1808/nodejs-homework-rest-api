const { Contacts } = require("../../db/contactModel");

const {contactsSchema} = require("../../schemas");

const postNewContact = async (req, res) => {
  const { error } = contactsSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "missing required name field",
    });
  }
  const { name, email, phone, favorite } = req.body;
  const contact = await Contacts.create({ name, email, phone, favorite });
  if (contact) {
    res.status(201).json({
      message: "The contact is added",
      contact: contact,
    });
  }
};

module.exports = postNewContact;
