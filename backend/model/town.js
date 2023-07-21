// Town schema
const mongoose = require("mongoose");

const townSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Town = mongoose.model("Town", townSchema);
