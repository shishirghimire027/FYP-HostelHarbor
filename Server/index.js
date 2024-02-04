const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const HostelModel = require("./models/Hostel");
const bcrypt = require("bcrypt");
const AddHostelsModel = require('./models/Addhostels');

const app = express();
app.use(express.json());
app.use(cors());

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


app.get("/AddHostels", (req, res) =>{
  AddHostelsModel.find({})
  .then(AddHostels => res.json(AddHostels))
  .catch(err => res.json(err))
});

app.get('/getHostels/:id', (req, res)=>{
  const id = req.params.id;
  AddHostelsModel.findById({_id:id})
  .then(AddHostels => res.json(AddHostels))
  .catch(err => res.json(err))
})

app.put("/Update/:id", (req, res) =>{
  const id = req.params.id;
  AddHostelsModel.findByIdAndUpdate({_id: id}, {
    Hostel_Name: req.body.Hostel_Name,
    Hostel_Location: req.body.Hostel_Location, 
    Hostel_Type: req.body.Hostel_Type, 
    Manager_Name: req.body.Manager_Name, 
    Manager_Contact: req.body.Manager_Contact})
  .then(AddHostels => res.json(AddHostels))
  .catch(err => res.json(err))
})
app.get("/ApprovedHostels", (req, res) => {
  AddHostelsModel.find({ approved: true })
     .then(AddHostels => res.json(AddHostels))
     .catch(err => res.json(err))
});

app.get("/HostelList", (req, res) => {
  AddHostelsModel.find()
    .then((AddHostels) => {
      res.json(AddHostels);
    })
    .catch((err) => {
      console.error("Error fetching hostels:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.put("/HostelList/:id", (req, res) => {
  const id = req.params.id;
  AddHostelsModel.findByIdAndUpdate(id, { approved: true }, { new: true })
    .then(updatedHostel => {
      if (!updatedHostel) {
        return res.status(404).json({ message: "Hostel not found" });
      }

      res.json(updatedHostel);
    })
    .catch(err => {
      console.error("Error updating hostel approval status:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});






app.delete('/Delete/:id', (req, res) =>{
  const id = req.params.id;
  AddHostelsModel.findByIdAndDelete({_id: id})
  .then(res => res.json(res))
  .catch(err => res.json(err))
})

app.post("/Create", (req,res)=>{
  AddHostelsModel.create(req.body)
  .then(AddHostels => res.json(AddHostels))
  .catch(err => res.json(err))
})

app.post("/HostelReg", (req,res)=>{
  AddHostelsModel.create(req.body)
  .then(AddHostels => res.json(AddHostels))
  .catch(err => res.json(err))
})


app.listen(3001, () => {
  console.log("server is running");
});
