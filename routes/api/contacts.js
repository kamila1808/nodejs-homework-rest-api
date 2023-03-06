const express = require("express");

const router = express.Router();

const {
  getContacts,
  getById,
  postNewContact,
  putContact,
  deleteContact,
  updateStatusContact,
} = require("../../controllers/contacts");

router.get("/", getContacts);

router.get("/:contactId", getById);

router.post("/", postNewContact);

router.put("/:contactId", putContact);

router.delete("/:contactId", deleteContact);

router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;
