const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: String,
  department: String,
  designation: String,
  profilePic: String,
  socialMediaLinks: {
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' }
  },
  discussion: String,
  identificationNumber: String,
  createdAt: { type: Date, default: Date.now },



  previousVisits: [
    {
      date: { type: Date },
      purpose: { type: String }
    }
  ]
});

module.exports = mongoose.model("Contact", contactSchema);
