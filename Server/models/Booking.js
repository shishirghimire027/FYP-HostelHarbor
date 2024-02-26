const mongoose = require('mongoose');

// Define the schema for booking data
const bookingSchema = new mongoose.Schema({
  hostelName: {
    type: String,
    required: true
  },
  hostelLocation: {
    type: String,
    required: true
  },
  roomNo: {
    type: Number,
    required: true
  },
  roomBed: {
    type: Number,
    required: true
  },
  roomType: {
    type: String,
    required: true
  },
  roomDescription: {
    type: String,
    required: true
  },
  roomPrice: {
    type: Number,
    required: true
  },
//   image: {
//     type: String,
//     required: true
//   },
  userEmail: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userPhone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'pending'
  },
  RoomID: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "AddRooms" // Reference to AddRooms model
  },
  // Add more fields as needed
});

// Create a model for the booking schema
const Booking = mongoose.model('BookingRequest', bookingSchema);

module.exports = Booking;
