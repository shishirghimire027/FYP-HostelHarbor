const mongoose = require("mongoose");

const AddHostelsSchema = new mongoose.Schema(
  {
    Hostel_Name: String,
    Hostel_Location: String,
    Hostel_Type: String,
    Manager_Name: String,
    Manager_Contact: Number,
    image: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'manager'
      },
  },
  { collection: "AddHostels" }
); // Explicitly setting the collection name

const AddHostelsModel = mongoose.model("AddHostels", AddHostelsSchema);
module.exports = AddHostelsModel;
