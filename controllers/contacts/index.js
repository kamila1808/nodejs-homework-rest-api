const getContacts = require("./getContacts");
const getById = require("./getById");
const postNewContact = require("./postNewContact");
const putContact = require("./putContact");
const deleteContact = require("./deleteContact");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  getContacts,
  getById,
  postNewContact,
  putContact,
  deleteContact,
  updateStatusContact,
};
