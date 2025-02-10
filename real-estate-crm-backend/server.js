// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Define Lead and Property schemas and models
const leadSchema = new mongoose.Schema({
  name: String,
  phone: String,
  documents: [String],
});

const propertySchema = new mongoose.Schema({
  type: { type: String, enum: ["Residential", "Commercial", "Land"] },
  size: String,
  location: String,
  budget: Number,
  availability: Boolean,
});

const Lead = mongoose.model("Lead", leadSchema);
const Property = mongoose.model("Property", propertySchema);

// API Routes for Leads
app.post("/api/leads", async (req, res) => {
  const newLead = new Lead(req.body);
  await newLead.save();
  res.status(201).json(newLead);
});

app.get("/api/leads", async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});

// API Routes for Properties
app.post("/api/properties", async (req, res) => {
  const newProperty = new Property(req.body);
  await newProperty.save();
  res.status(201).json(newProperty);
});

app.get("/api/properties", async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
