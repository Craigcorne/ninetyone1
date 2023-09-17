const express = require("express");
const router = express.Router();
const Country = require("../model/country");
const State = require("../model/state");
const City = require("../model/city");

// Create a new country
router.post("/countries", async (req, res) => {
  try {
    const { name } = req.body;
    const newCountry = new Country({ name });
    const savedCountry = await newCountry.save();
    res.json(savedCountry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new state based on the selected country
router.post("/states", async (req, res) => {
  try {
    const { name, countryId } = req.body;
    const country = await Country.findById(countryId);
    if (!country) {
      return res.status(404).json({ error: "Country not found" });
    }
    const newState = new State({ name, country: countryId });
    const savedState = await newState.save();
    res.json(savedState);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new city based on the selected state
router.post("/cities", async (req, res) => {
  try {
    const { name, stateId, shippingFee } = req.body;
    const state = await State.findById(stateId);
    if (!state) {
      return res.status(404).json({ error: "State not found" });
    }
    const newCity = new City({ name, state: stateId, shippingFee });
    const savedCity = await newCity.save();
    res.json(savedCity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch all countries
router.get("/countries", async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch states based on the selected country
router.get("/states/:countryId", async (req, res) => {
  try {
    const states = await State.find({ country: req.params.countryId });
    res.json(states);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch cities based on the selected state
router.get("/cities/:stateId", async (req, res) => {
  try {
    const cities = await City.find({ state: req.params.stateId });
    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
