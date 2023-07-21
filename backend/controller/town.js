// Import necessary modules and models

const express = require("express");
const router = express.Router();
const State = require("../model/state");
const Town = require("../model/town");

// GET all towns
router.get("/towns", async (req, res) => {
  try {
    const towns = await Town.find();
    res.json(towns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET towns by state ID
router.get("/towns/:stateId", async (req, res) => {
  try {
    const towns = await Town.find({ state: req.params.stateId });
    res.json(towns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// POST a new town
router.post("/towns", async (req, res) => {
  const { name, state } = req.body;

  try {
    const newState = await State.findById(state);
    if (!newState) {
      return res.status(404).json({ error: "State not found" });
    }

    const newTown = new Town({ name, state: newState._id });
    const savedTown = await newTown.save();
    newState.towns.push(savedTown._id);
    await newState.save();

    res.json(savedTown);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE a town
router.delete("/towns/:id", async (req, res) => {
  try {
    await Town.findByIdAndDelete(req.params.id);
    res.json({ message: "Town deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
