const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const cookieParsar = require("cookie-parser");
const crypto = require("crypto");
const http = require("http");
const {Server} = require("socket.io");

const HostelModel = require("./models/Hostel");
const AddHostelsModel = require("./models/Addhostels");
const HostelListsModel = require("./models/HostelLists");
const AddRoomsModel = require("./models/AddRooms");
const Booking = require("./models/Booking");
const Resident = require("./models/Resident");


const { userInfo } = require("os");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(cookieParsar());

//creating server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  },
});
const { saveMessage, fetchMessages } = require('./models/dbOperations');

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // socket.on("join_room", (data) => {
  //   socket.join(data);
  //   console.log(`User with Id: ${socket.id} joined room: ${data}`);
    
  // });
  socket.on("join_room", async (data) => {
    socket.join(data);
    console.log(`User with Id: ${socket.id} joined room: ${data}`);
  
    // Fetch previous messages for the room from the database
    const messages = await fetchMessages(data);
    // Emit the previous messages to the user who joined the room
    socket.emit('receive_previous_messages', messages);
  });

  socket.on('send_message', async (data) => {
    const success = await saveMessage(data);
    if (success) {
      // Emit the message to all connected users
      io.emit('receive_message', data);
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});



app.use(
  "/images",
  express.static(path.join(__dirname, "../Client/hostel/public/images/rooms"))
);

mongoose.connect("mongodb://localhost:27017/Hostel");

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString("hex");
console.log("Generated Secret Key:", secretKey);

// Middleware to authenticate token
// function authenticateToken(req, res, next) {
//   const token =
//     req.header("Authorization") && req.header("Authorization").split(" ")[1];
//   if (!token)
//     return res.status(401).json({ message: "Token is missing or invalid" });

//   jwt.verify(token, secretKey, (err, person) => {
//     if (err) return res.status(403).json({ message: "Access is Restricted" });
//     req.person = person;
//     next();
//   });
// }
function authenticateToken(req, res, next) {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Token is missing or invalid" });

  jwt.verify(token, secretKey, (err, person) => {
    if (err) return res.status(403).json({ message: "Access is Restricted" });
    req.person = person;
    next();
  });
}

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  HostelModel.findOne({ email: email }).then((person) => {
    if (person) {
      bcrypt.compare(password, person.password, (err, response) => {
        if (response) {
          const token = jwt.sign(
            { id: person._id, role: person.role },
            secretKey,
            {
              expiresIn: "1h", // or any other appropriate value
            }
          );

          res.status(200).json({ token, message: "Login Sucessful", person });
        } else {
          res.json("The password is incorrect");
        }
      });
    } else {
      res.json("No record existed");
    }
  });
});

app.post("/Managerlogin", (req, res) => {
  const { email, password } = req.body;
  HostelListsModel.findOne({ email: email }).then((person) => {
    if (person) {
      bcrypt.compare(password, person.password, (err, response) => {
        if (response) {
          const token = jwt.sign(
            { id: person._id, hostelId: person._id, role: person.role },
            secretKey,
            {
              expiresIn: "1h", // or any other appropriate value
            }
          );

          res.status(200).json({ token, message: "Login Sucessful", person });
        } else {
          res.json("The password is incorrect");
        }
      });
    } else {
      res.json("No record existed");
    }
  });
});

// app.get("/managerData", authenticateToken, (req, res) => {
//   const loggedInManagerId = req.person.id; // Retrieve the logged-in manager's ID from the token payload

//   // Find the manager's data using their ID
//   HostelListsModel.findById(loggedInManagerId)
//     .then((manager) => {
//       if (manager) {
//         // If manager data is found, send it as response
//         res.status(200).json({ message: "Manager data retrieved successfully", manager });
//       } else {
//         // If manager data is not found, send an appropriate message
//         res.status(404).json({ message: "Manager data not found" });
//       }
//     })
//     .catch((err) => {
//       // If any error occurs during the process, send an error response
//       res.status(500).json({ message: "Internal server error" });
//     });
// });

// Example route handler to get manager information after login
// Middleware to authenticate token

// Example route handler to get user information after login
app.get("/userInfo", authenticateToken, (req, res) => {
  // Access the logged-in user's ID from req.person
  const userId = req.person.id;

  // Query the database to find the user with the provided ID
  HostelModel.findById(userId)
    .then((user) => {
      if (user) {
        // If user is found, return their information
        const userInfo = {
          User_id: user._id,
          fname: user.fname,
          lname: user.lname,
          phone: user.phone,
          email: user.email,
        };
        res.json(userInfo);
      } else {
        // If user is not found, return an error message
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((error) => {
      // If an error occurs during database query, return an error message
      console.error("Error fetching user information:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

app.get("/managerInfo", authenticateToken, (req, res) => {
  // Access the logged-in user's ID from req.person
  const managerID = req.person.id;

  // Query the database to find the manager with the provided ID
  HostelListsModel.findById(managerID)
    .then((manager) => {
      if (manager) {
        // If manager is found, return their information
        const managerInfo = {
          _id: manager._id,
          Hostel_Name: manager.Hostel_Name,
          Hostel_Location: manager.Hostel_Location,
          Hostel_Type: manager.Hostel_Type,
          Manager_Name: manager.Manager_Name,
          Manager_Contact: manager.Manager_Contact,
          email: manager.email,
        };
        res.json(managerInfo);
        console.log("managerInfo", managerInfo);
      } else {
        // If manager is not found, return an error message
        res.status(404).json({ message: "Manager not found" });
      }
    })
    .catch((error) => {
      // If an error occurs during database query, return an error message
      console.error("Error fetching manager information:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

//Protected route example
app.get("/Protected", authenticateToken, (req, res) => {
  if (req.person.role === "admin") {
    res.json({ message: "Admin resource accessed" });
  } else if (req.person.role === "user") {
    res.json({ message: "User resource accessed" });
  } else if (req.person.role === "manager") {
    res.json({ message: "User resource accessed" });
  }
});

app.post("/signup", (req, res) => {
  const { fname, lname, phone, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      HostelModel.create({ fname, lname, phone, email, password: hash })
        .then((users) => res.json(users))
        .catch((err) => res.json(err));
    })
    .catch((err) => console.log(err.message));
});

app.post("/Create", (req, res) => {
  AddHostelsModel.create(req.body)
    .then((AddHostels) => res.json(AddHostels))
    .catch((err) => res.json(err));
});

app.post("/HostelReg", (req, res) => {
  const {
    Hostel_Name,
    Hostel_Location,
    Hostel_Type,
    Manager_Name,
    Manager_Contact,
    email,
    password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      AddHostelsModel.create({
        Hostel_Name,
        Hostel_Location,
        Hostel_Type,
        Manager_Name,
        Manager_Contact,
        email,
        password: hash,
      })
        .then((AddHostels) => res.json(AddHostels))
        .catch((err) => res.json(err));
    })
    .catch((err) => console.log(err.message));
});

// app.post("/HostelReg", (req, res) => {
//   AddHostelsModel.create(req.body)
//     .then((AddHostels) => res.json(AddHostels))
//     .catch((err) => res.json(err));
// });

const ObjectId = mongoose.Types.ObjectId; // Importing ObjectId from mongoose

app.post("/HostelLists", (req, res) => {
  const newData = req.body;

  // Generate a unique ObjectId for the new document
  newData._id = new ObjectId();

  HostelListsModel.create(newData)
    .then((result) => res.json(result))
    .catch((err) => {
      console.error("Error adding data to HostelLists:", err); // Log the error details
      res
        .status(500)
        .json({ error: "Internal Server Error", details: err.message }); // Respond with error details
    });
});
app.get("/HostelLists", (req, res) => {
  HostelListsModel.find({})
    .then((AddHostels) => res.json(AddHostels))
    .catch((err) => res.json(err));
});

app.get("/HostelLists/:id", (req, res) => {
  const id = req.params.id;
  HostelListsModel.findById(id)
    .then((hostel) => res.json(hostel))
    .catch((err) => res.status(404).json({ message: "Hostel not found" }));
});

app.get("/Users", (req, res) => {
  HostelModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/AddHostels", (req, res) => {
  AddHostelsModel.find({})
    .then((AddHostels) => res.json(AddHostels))
    .catch((err) => res.json(err));
});

app.get("/getHostels/:id", (req, res) => {
  const id = req.params.id;
  AddHostelsModel.findById({ _id: id })
    .then((AddHostels) => res.json(AddHostels))
    .catch((err) => res.json(err));
});

app.put("/Update/:id", (req, res) => {
  const id = req.params.id;
  AddHostelsModel.findByIdAndUpdate(
    { _id: id },
    {
      Hostel_Name: req.body.Hostel_Name,
      Hostel_Location: req.body.Hostel_Location,
      Hostel_Type: req.body.Hostel_Type,
      Manager_Name: req.body.Manager_Name,
      Manager_Contact: req.body.Manager_Contact,
    }
  )
    .then((AddHostels) => res.json(AddHostels))
    .catch((err) => res.json(err));
});

app.get("/getHostel/:id", (req, res) => {
  const id = req.params.id;
  HostelListsModel.findById({ _id: id })
    .then((HostelLists) => res.json(HostelLists))
    .catch((err) => res.json(err));
});
app.put("/UpdateHostelList/:id", (req, res) => {
  const id = req.params.id;
  HostelListsModel.findByIdAndUpdate(
    { _id: id },
    {
      Hostel_Name: req.body.Hostel_Name,
      Hostel_Location: req.body.Hostel_Location,
      Hostel_Type: req.body.Hostel_Type,
      Manager_Name: req.body.Manager_Name,
      Manager_Contact: req.body.Manager_Contact,
    }
  )
    .then((HostelLists) => res.json(HostelLists))
    .catch((err) => res.json(err));
});

app.delete("/Delete/:id", (req, res) => {
  const id = req.params.id;
  AddHostelsModel.findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

app.delete("/Deletes/:id", (req, res) => {
  const id = req.params.id;
  HostelListsModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json({ success: true }))
    .catch((err) => res.json({ success: false, error: err.message }));
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../Client/hostel/public/images/rooms");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});
// app.post("/CreateRoom", upload.single("file"), (req, res) => {
//   console.log(req.file);
//   const { RoomNo, RoomBed, RoomType, RoomDescription, RoomPrice, hostelId } =
//     req.body;
//   const image = req.file.filename;

//   AddRoomsModel.create({
//     RoomNo,
//     RoomBed,
//     RoomType,
//     RoomDescription,
//     RoomPrice,
//     image,
//     hostel: hostelId, // Assign hostelId to hostel field
//   })
//     .then((AddRooms) => res.json(AddRooms))
//     .catch((err) => console.log(err));
// });
app.post("/CreateRoom", upload.single("file"), (req, res) => {
  console.log(req.file);
  const { RoomNo, RoomBed, Seater, RoomType, RoomDescription, RoomPrice, hostelId } =
    req.body;
  const image = req.file.filename;

  // Fetch the hostel details based on hostelId
  HostelListsModel.findById(hostelId)
    .then((hostel) => {
      if (!hostel) {
        return res.status(404).json({ message: "Hostel not found" });
      }
      // Create a new room including hostel name and location
      AddRoomsModel.create({
        RoomNo,
        RoomBed,
        Seater,
        RoomType,
        RoomDescription,
        RoomPrice,
        image,
        hostel: hostelId,
        hostelName: hostel.Hostel_Name, // Include hostel name
        hostelLocation: hostel.Hostel_Location, // Include hostel location
      })
        .then((AddRooms) => res.json(AddRooms))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

app.delete("/DeleteRoom/:id", (req, res) => {
  const id = req.params.id;
  AddRoomsModel.findByIdAndDelete(id)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
});

// app.put("/MarkBooked/:id", (req, res) => {
//   const roomId = req.params.id;
//   AddRoomsModel.findByIdAndUpdate(roomId, { status: 'booked' })
//     .then(() => res.json({ success: true }))
//     .catch((err) => {
//       console.error("Error marking room as booked:", err);
//       res.json({ success: false });
//     });
// });
app.put("/ToggleStatus/:id", (req, res) => {
  const roomId = req.params.id;
  const { status } = req.body;
  AddRoomsModel.findByIdAndUpdate(roomId, { status })
    .then(() => res.json({ success: true }))
    .catch((err) => {
      console.error("Error toggling room status:", err);
      res.json({ success: false });
    });
});


app.get("/AddRooms", (req, res) => {
  AddRoomsModel.find({})
    .then((AddRooms) => res.json(AddRooms))
    .catch((err) => res.json(err));
});

app.get("/AddRooms/:id", (req, res) => {
  const id = req.params.id;
  AddRoomsModel.findById({ _id: id })
    .then((AddRooms) => res.json(AddRooms))
    .catch((err) => res.json(err));
});

app.put("/UpdateRoom/:id", (req, res) => {
  const id = req.params.id;
  AddRoomsModel.findByIdAndUpdate(
    { _id: id },
    {
      RoomNo: req.body.RoomNo,
      RoomBed: req.body.RoomBed,
      RoomType: req.body.RoomType,
      RoomDescription: req.body.RoomDescription,
      RoomPrice: req.body.RoomPrice,
      image: req.body.image,
    }
  )
    .then((AddRooms) => res.json(AddRooms))
    .catch((err) => res.json(err));
});

// app.put("/UpdateRoomImg/:id", upload.single("image"), (req, res) => {
//   const id = req.params.id;
//   const imagePath = req.file.filename; // This will contain the filename of the uploaded image

//   AddRoomsModel.findByIdAndUpdate(
//     { _id: id },
//     { image: imagePath }, // Update the image field with the new filename
//     { new: true } // To return the updated document
//   )
//     .then((updatedRoom) => res.json(updatedRoom))
//     .catch((err) => res.status(500).json({ error: err }));
// });
app.put("/UpdateRoomImg/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;
  const imagePath = req.file.filename;

  AddRoomsModel.findByIdAndUpdate(
    { _id: id },
    { image: imagePath },
    { new: true }
  )
    .then((updatedRoom) => res.json(updatedRoom))
    .catch((err) => res.status(500).json({ error: err }));
});

// Update your GET endpoint to filter rooms based on hostel/manager ID
app.get("/AddRooms", (req, res) => {
  const hostelId = req.query.hostel;
  // Query the database to find rooms associated with the provided hostel ID
  AddRoomsModel.find({ hostel: hostelId })
    .then((rooms) => {
      res.json(rooms);
    })
    .catch((error) => {
      console.error("Error fetching rooms:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

app.post("/bookingRequest", authenticateToken, async (req, res) => {
  try {
    // Extract the booking request data from the request body
    const { hostelInfo, userInfo, id } = req.body;

    // Fetch the hostel details based on hostelId
    AddRoomsModel.findById(id).then(async (Room) => {
      // Declare the arrow function as async
      if (!Room) {
        return res.status(404).json({ message: "Hostel not found" });
      }

      // Create a new booking instance based on the schema
      const newBooking = new Booking({
        RoomID: Room.id,
        HostelID: hostelInfo.hostel,
        hostelName: hostelInfo.hostelName,
        hostelLocation: hostelInfo.hostelLocation,
        roomNo: hostelInfo.RoomNo,
        roomBed: hostelInfo.RoomBed,
        roomType: hostelInfo.RoomType,
        roomDescription: hostelInfo.RoomDescription,
        roomPrice: hostelInfo.RoomPrice,
        image: hostelInfo.image,
        User_id: userInfo.User_id,
        userEmail: userInfo.email,
        userName: `${userInfo.fname} ${userInfo.lname}`,
        userPhone: userInfo.phone,
      });

      // Save the new booking to the database
      await newBooking.save();

      // Send a success response back to the client
      res.status(201).json({
        message: "Booking request received successfully",
        data: newBooking,
      });
    });
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error processing booking request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/bookingRequest", (req, res) => {
  Booking.find({})
    .then((book) => res.json(book))
    .catch((err) => res.json(err));
});

app.delete("/bookingRequest/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Delete all booking requests associated with the user
    const result = await Booking.deleteMany({ User_id: userId });
    res.status(200).json({ message: "Booking requests deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/RejectBooking/:id", (req, res) => {
  const id = req.params.id;
  Booking.findByIdAndDelete(id)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
});

app.get("/bookingStatus/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Replace this logic with your actual logic to check booking status
    // For demonstration purposes, I'm assuming you have some database model named Booking
    const booking = await Booking.findOne({ hostelId: id });

    if (booking) {
      res.status(200).json({ status: booking.status }); // Return the status if booking exists
    } else {
      res.status(404).json({ message: "Booking not found" }); // Return a message if booking does not exist
    }
  } catch (error) {
    console.error("Error checking booking status:", error);
    res.status(500).json({ error: "Internal server error" }); // Return an error response if an error occurs
  }
});

app.post("/ResidentLists", (req, res) => {
  const newResidentData = req.body;

  // Update the status to 'Active' in the booking data
  newResidentData.status = "Active";

  // Generate a unique ObjectId for the new document
  newResidentData._id = new ObjectId();

  Resident.create(newResidentData)
    .then((result) => res.json(result))
    .catch((err) => {
      console.error("Error adding data to Resident:", err); // Log the error details
      res
        .status(500)
        .json({ error: "Internal Server Error", details: err.message }); // Respond with error details
    });
});

app.get("/ResidentLists", (req, res) => {
  Resident.find({})
    .then((Resi) => res.json(Resi))
    .catch((err) => res.json(err));
});

// // Endpoint to store a new chat message
// app.post('/store-message', (req, res) => {
//   const { author, message, room } = req.body;

//   // Store message in MongoDB  database
 
//   const newMessage = new Message({
//     author,
//     message,
//     room,
//     timestamp: new Date()
//   });
//   newMessage.save()
//     .then(() => {
//       res.status(201).send('Message stored successfully');
//     })
//     .catch((error) => {
//       console.error('Error storing message:', error);
//       res.status(500).send('Internal Server Error');
//     });
// });

// // Endpoint to retrieve chat history for a specific room
// app.get('/chat-history/:room', (req, res) => {
//   const room = req.params.room;

//   // Retrieve chat history from the database for the specified room

//   Message.find({ room })
//     .then((messages) => {
//       res.json(messages);
//     })
//     .catch((error) => {
//       console.error('Error retrieving chat history:', error);
//       res.status(500).send('Internal Server Error');
//     });
// });


// Route to fetch previous messages
app.post('/fetch_messages', async (req, res) => {
  const { room } = req.body;
  try {
    const messages = await fetchMessages(room);
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Define a route for sending messages
// Define a route for sending messages
// Define a route for sending messages
app.post('/send_message', async (req, res) => {
  try {
    const messageData = req.body; // Retrieve message data from request body
    // Process and save the message data here...
    const success = await saveMessage(messageData);
    if (success) {
      res.status(200).send('Message sent successfully');
    } else {
      res.status(500).json({ error: 'Failed to save message' });
    }
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





server.listen(3001, () => {
  console.log("server is running");
});
