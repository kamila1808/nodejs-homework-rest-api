const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getContacts = async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json({
    contacts: contacts,
  });
};

const getById = async (req, res) => {
  const contact = await getContactById(req.params.contactId);
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
  const contact = await addContact(req.body);
  res.status(201).json({
    contact: contact,
  });
};

const putContact = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "missing fields",
    });
  }
  const contact = await getContactById(req.params.contactId);
  if (contact) {
    const updatedContact = await updateContact(contact.id, req.body);
    res.status(200).json({ updatedContact });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const deleteContact = async (req, res) => {
  const contact = await getContactById(req.params.contactId);
  if (contact) {
    await removeContact(contact.id);
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  getContacts,
  getById,
  postNewContact,
  putContact,
  deleteContact,
};
