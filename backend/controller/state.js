// Import necessary modules and models

const express = require("express");
const router = express.Router();
const Country = require("../model/country");
const State = require("../model/state");
const Town = require("../model/town");

// GET all states
router.get("/states", async (req, res) => {
  try {
    const states = await State.find();
    res.json(states);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET states by country ID
router.get("/states/:countryId", async (req, res) => {
  try {
    const states = await State.find({ country: req.params.countryId });
    res.json(states);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// POST a new state
router.post("/states", async (req, res) => {
  const { name, country } = req.body;

  try {
    const newCountry = await Country.findById(country);
    if (!newCountry) {
      return res.status(404).json({ error: "Country not found" });
    }

    const newState = new State({ name, country: newCountry._id });
    const savedState = await newState.save();
    newCountry.states.push(savedState._id);
    await newCountry.save();

    res.json(savedState);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE a state
router.delete("/states/:id", async (req, res) => {
  try {
    await State.findByIdAndDelete(req.params.id);
    res.json({ message: "State deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
