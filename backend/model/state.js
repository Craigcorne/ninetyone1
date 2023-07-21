// State schema

const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  towns: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Town",
    },
  ],
});

const State = mongoose.model("State", stateSchema);
