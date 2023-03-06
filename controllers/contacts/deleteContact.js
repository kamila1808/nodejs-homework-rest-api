const { Contacts } = require("../../db/contactModel");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await Contacts.findByIdAndRemove(contactId);
  if (deletedContact) {
    res.status(200).json({ message: "The contact is deleted" });
  } else {
    res.status(404).json({ message: "The contacts is not found" });
  }
};

module.exports = deleteContact