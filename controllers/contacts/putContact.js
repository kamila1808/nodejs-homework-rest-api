const { Contacts } = require("../../db/contactModel");

const schema = require("../../schemas/contactsSchema");

const putContact = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "missing fields",
    });
  }
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
  await Contacts.findByIdAndUpdate(contactId, {
    $set: { name, email, phone, favorite },
  });
  res.status(200).json({ message: "The contact is updated" });
};

module.exports = putContact