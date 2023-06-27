const express = require("express");
const Carousel = require("../model/carousel");
const router = express.Router();

router.get("/get-carousel", async (req, res) => {
  try {
    const carouselData = await Carousel.find();
    res.json(carouselData);
  } catch (error) {
    console.error("Error fetching carousel data:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/carousel", async (req, res) => {
  try {
    const { imageUrl, caption } = req.body;

    // Create a new carousel item using the CarouselModel
    const newCarouselItem = new Carousel({ imageUrl, caption });

    // Save the new carousel item to the database
    const savedCarouselItem = await newCarouselItem.save();

    res.json(savedCarouselItem);
  } catch (error) {
    console.error("Error creating carousel item:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;