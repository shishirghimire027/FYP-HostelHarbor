// Import necessary modules
const express = require('express');
const router = express.Router();

// Define route handler for booking status
router.get('/bookingStatus/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Replace this logic with your actual logic to check booking status
    // For demonstration purposes, I'm assuming you have some database model named Booking
    const booking = await Booking.findOne({ hostelId: id });
    
    if (booking) {
      res.status(200).json({ status: booking.status }); // Return the status if booking exists
    } else {
      res.status(404).json({ message: 'Booking not found' }); // Return a message if booking does not exist
    }
  } catch (error) {
    console.error('Error checking booking status:', error);
    res.status(500).json({ error: 'Internal server error' }); // Return an error response if an error occurs
  }
});

// Export the router
module.exports = router;
