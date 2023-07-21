// Country schema
const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  states: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
    },
  ],
});

const Country = mongoose.model("Country", countrySchema);
