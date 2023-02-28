const Joi = require("joi");
const { Contacts } = require("../db/contactModel");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
  favorite: Joi.boolean().optional(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const getContacts = async (req, res) => {
  const contacts = await Contacts.find({});
  res.json({ contacts });
};

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

const postNewContact = async (req, res) => {
  const { error } = schema.validate(req.body);
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

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await Contacts.findByIdAndRemove(contactId);
  if (deletedContact) {
    res.status(200).json({ message: "The contact is deleted" });
  } else {
    res.status(404).json({ message: "The contacts is not found" });
  }
};

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
  res.status(200).json({ message: "Status is updated"});
};

module.exports = {
  getContacts,
  getById,
  postNewContact,
  putContact,
  deleteContact,
  updateStatusContact,
};
