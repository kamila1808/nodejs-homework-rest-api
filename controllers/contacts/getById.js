const { Contacts } = require("../../db/contactModel");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contacts.findById(contactId);
  if (!contact) {
    res.status(404).json({
      message: "Not found",
    });
  }
  res.status(200).json({
    contact: contact,
  });
};

module.exports = getById;