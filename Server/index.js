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

const HostelModel = require("./models/Hostel");
const AddHostelsModel = require("./models/Addhostels");
const HostelListsModel = require("./models/HostelLists");
const AddRoomsModel = require("./models/AddRooms");
const { userInfo } = require("os");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParsar());

app.use(
  "/images",
  express.static(path.join(__dirname, "../Client/hostel/public/images/rooms"))
);

mongoose.connect("mongodb://localhost:27017/Hostel");

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString("hex");
console.log("Generated Secret Key:", secretKey);

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const token =
    req.header("Authorization") && req.header("Authorization").split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Token is missing or invalid" });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: "Access is Restricted" });
    req.user = user;
    next();
  });
}


// const verifyUser = (req, res, next) => {
//   const token = req.cookies.token;
//   console.log(token);
//   if(!token){
//     return res.json("The token was not available")
//   }else{
//     jwt.verify(token, "jwt-secret-key", (err, decoded) =>{
//       if(err) return res.json("Token is wrong")
//       next();
//     })
//   }
// };

// app.get("/home", verifyUser, (req, res) => {
//   return res.json("Success")
// });

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

//Protected route example
app.get("/Protected", authenticateToken, (req, res) => {
  if (req.person.role === "admin") {
    res.json({ message: "Admin resource accessed" });
  } else if (req.person.role === "user") {
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
app.post("/CreateRoom", upload.single("file"), (req, res) => {
  console.log(req.file);
  const { RoomNo, RoomBed, RoomType, RoomDescription, RoomPrice } = req.body;
  const image = req.file.filename;

  AddRoomsModel.create({
    RoomNo,
    RoomBed,
    RoomType,
    RoomDescription,
    RoomPrice,
    image,
  })
    .then((AddRooms) => res.json(AddRooms))
    .catch((err) => console.log(err));
});

app.delete("/DeleteRoom/:id", (req, res) => {
  const id = req.params.id;
  AddRoomsModel.findByIdAndDelete(id)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
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

app.put("/UpdateRoomImg/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;
  const imagePath = req.file.filename; // This will contain the filename of the uploaded image

  AddRoomsModel.findByIdAndUpdate(
    { _id: id },
    { image: imagePath }, // Update the image field with the new filename
    { new: true } // To return the updated document
  )
    .then((updatedRoom) => res.json(updatedRoom))
    .catch((err) => res.status(500).json({ error: err }));
});

app.post("/Create", (req, res) => {
  AddHostelsModel.create(req.body)
    .then((AddHostels) => res.json(AddHostels))
    .catch((err) => res.json(err));
});

app.post("/HostelReg", (req, res) => {
  AddHostelsModel.create(req.body)
    .then((AddHostels) => res.json(AddHostels))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("server is running");
});
