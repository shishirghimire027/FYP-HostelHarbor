const mongoose = require('mongoose');

const AddRoomsSchema = new mongoose.Schema({
    RoomNo: Number,
    RoomBed: String,
    RoomType: String,
    RoomDescription: String,
    RoomPrice: Number,
}, { collection: 'AddRooms' }); // Explicitly setting the collection name

const AddRoomsModel = mongoose.model("AddRooms", AddRoomsSchema);
module.exports = AddRoomsModel;
