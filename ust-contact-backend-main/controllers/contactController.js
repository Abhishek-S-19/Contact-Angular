const Contact = require("../models/Contact");

// Create a new contact
exports.createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: "Contact added successfully", contact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all contacts with optional search and sorting
exports.getAllContacts = async (req, res) => {
  try {
    const { search, sortBy } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { name: new RegExp(search, "i") },
          { email: new RegExp(search, "i") },
          { phone: new RegExp(search, "i") },
          { department: new RegExp(search, "i") },
          { designation: new RegExp(search, "i") },
        ],
      };
    }

    let contacts = await Contact.find(query);

    if (sortBy === "name") {
      contacts = contacts.sort((a, b) => a.name.localeCompare(b.name));
    }

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a contact by ID
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a contact
exports.updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    // Fetch the existing contact
    const existingContact = await Contact.findById(contactId);
    if (!existingContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    // Replace previousVisits if it's part of the request body
    if (req.body.previousVisits !== undefined) {
      existingContact.previousVisits = req.body.previousVisits;
    }

    // Replace socialMediaLinks if it's part of the request body
    if (req.body.socialMediaLinks !== undefined) {
      existingContact.socialMediaLinks = req.body.socialMediaLinks;
    }

    // Update other fields of the contact
    for (let key in req.body) {
      if (key !== "previousVisits" && key !== "socialMediaLinks") {
        existingContact[key] = req.body[key];
      }
    }

    // Save the updated contact
    await existingContact.save();

    res.status(200).json({
      message: "Contact updated successfully",
      updatedContact: existingContact,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a contact
exports.deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
