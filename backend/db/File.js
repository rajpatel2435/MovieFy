const mongoose = require("mongoose");

// Creating a Schema for uploaded files
const fileSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, "Uploaded file must have a name"],
  },
  file:{
    data:Buffer,
    contentType:String
  },
  userId: String
});

// Creating a Model from that Schema
const fileModel = mongoose.model("file", fileSchema,'file');

// Exporting the Model to use it in app.js File.
module.exports = fileModel;


