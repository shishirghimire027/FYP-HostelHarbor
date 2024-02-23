// const mongoose = require('mongoose');

// const AddRoomsSchema = new mongoose.Schema({
//     RoomNo: Number,
//     RoomBed: String,
//     RoomType: String,
//     RoomDescription: String,
//     RoomPrice: Number,
//     image: String
// }, { collection: 'AddRooms' }); // Explicitly setting the collection name

// const AddRoomsModel = mongoose.model("AddRooms", AddRoomsSchema);
// module.exports = AddRoomsModel;

const mongoose = require("mongoose");

const AddRoomsSchema = new mongoose.Schema(
  {
    RoomNo: Number,
    RoomBed: String,
    RoomType: String,
    RoomDescription: String,
    RoomPrice: Number,
    image: String,
    hostel: { type: mongoose.Schema.Types.ObjectId, ref: "HostelLists" }, // Reference to HostelLists model
  },
  { collection: "AddRooms" }
);

const AddRoomsModel = mongoose.model("AddRooms", AddRoomsSchema);
module.exports = AddRoomsModel;
