

// const mongoose = require("mongoose");

// const AddRoomsSchema = new mongoose.Schema(
//   {
//     RoomNo: Number,
//     RoomBed: String,
//     RoomType: String,
//     RoomDescription: String,
//     RoomPrice: Number,
//     image: String,
//     hostel: { type: mongoose.Schema.Types.ObjectId, ref: "HostelLists" }, // Reference to HostelLists model
//   },
//   { collection: "AddRooms" }
// );

// const AddRoomsModel = mongoose.model("AddRooms", AddRoomsSchema);
// module.exports = AddRoomsModel;


const mongoose = require("mongoose");
const AddRoomsSchema = new mongoose.Schema(
  {
    RoomNo: Number,
    RoomBed: String,
    Seater: String,
    RoomType: String,
    RoomDescription: String,
    RoomPrice: Number,
    image: String,
    status: {
      type: String,
      default: 'available'
    },
    hostel: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "HostelLists" // Reference to HostelLists model
    },
    hostelName: String, // New field to store hostel name
    hostelLocation: String, // New field to store hostel location
  },
  { collection: "AddRooms" }
);

const AddRoomsModel = mongoose.model("AddRooms", AddRoomsSchema);
module.exports = AddRoomsModel;