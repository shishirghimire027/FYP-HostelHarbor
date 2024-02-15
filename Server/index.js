const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const HostelModel = require("./models/Hostel");
const AddHostelsModel = require("./models/Addhostels");
const HostelListsModel = require("./models/HostelLists");
const AddRoomsModel = require("./models/AddRooms");

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  "/images",
  express.static(path.join(__dirname, "../Client/hostel/public/images/rooms"))
);

mongoose.connect("mongodb://localhost:27017/Hostel");

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  HostelModel.findOne({ email: email }).then((person) => {
    if (person) {
      bcrypt.compare(password, person.password, (err, response) => {
        if (response) {
          res.json("Success");
        } else {
          res.json("The password is incorrect");
        }
      });
    } else {
      res.json("No record existed");
    }
  });
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

// app.post("/CreateRoom", (req, res) => {
//   AddRoomsModel.create(req.body)

//     .then((AddRooms) => res.json(AddRooms))
//     .catch((err) => res.json(err));
// });

// app.post("/CreateRoom", upload.single("file"), (req, res) => {
//   AddRoomsModel.create({ image: req.file.filename });
//   console
//     .log(req.file)
//     .then((AddRooms) => res.json(AddRooms))
//     .catch((err) => res.json(err));
// });

app.get("/AddRooms", (req, res) => {
  AddRoomsModel.find({})
    .then((AddRooms) => res.json(AddRooms))
    .catch((err) => res.json(err));
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
