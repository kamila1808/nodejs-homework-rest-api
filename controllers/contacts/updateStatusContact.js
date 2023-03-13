const { Contacts } = require("../../db/contactModel");
const  {favoriteSchema}  = require("../../schemas");

const updateStatusContact = async (req, res) => {
  const { error } = favoriteSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: "missing field favorite" });
  }

  const { contactId } = req.params;
  const updateStatus = await Contacts.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updateStatus) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "Status is updated" });
};

module.exports = updateStatusContact