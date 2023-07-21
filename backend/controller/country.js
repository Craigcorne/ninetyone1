// Import necessary modules and models

const express = require("express");
const router = express.Router();
const Country = require("../model/country");
const State = require("../model/state");

// GET all countries
router.get("/countries", async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// POST a new country
router.post("/countries", async (req, res) => {
  const { name } = req.body;

  try {
    const newCountry = new Country({ name });
    const savedCountry = await newCountry.save();
    res.json(savedCountry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT (update) a country
router.put("/countries/:id", async (req, res) => {
  const { name } = req.body;

  try {
    const updatedCountry = await Country.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    res.json(updatedCountry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE a country
router.delete("/countries/:id", async (req, res) => {
  try {
    await Country.findByIdAndDelete(req.params.id);
    res.json({ message: "Country deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
