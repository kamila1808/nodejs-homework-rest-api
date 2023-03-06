const express = require("express");

const router = express.Router();

const contactsController = require("../../controllers/contacts")
const { controllerWrapper } = require("../../helpers");


router.get("/", controllerWrapper(contactsController.getContacts));

router.get("/:contactId", controllerWrapper(contactsController.getById));

router.post("/", controllerWrapper(contactsController.postNewContact));

router.put("/:contactId", controllerWrapper(contactsController.putContact));

router.delete("/:contactId", controllerWrapper(contactsController.deleteContact));

router.patch("/:contactId/favorite", controllerWrapper(contactsController.updateStatusContact));

module.exports = router;
