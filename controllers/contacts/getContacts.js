const { Contacts } = require("../../db/contactModel");

const getContacts = async (req, res) => {
  const contacts = await Contacts.find({});
  res.json({ contacts });
};

module.exports = getContacts