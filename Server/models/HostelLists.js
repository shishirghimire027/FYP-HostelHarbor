const mongoose = require('mongoose');

const HostelListsSchema = new mongoose.Schema({
    Hostel_Name: String,
    Hostel_Location: String,
    Hostel_Type: String,
    Manager_Name: String,
    Manager_Contact: Number,
}, { collection: 'HostelLists' });

const HostelListsModel = mongoose.model('HostelLists', HostelListsSchema);

module.exports = HostelListsModel;
