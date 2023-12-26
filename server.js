const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const mongoURI = process.env.MONGO_URL;

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://foodcounter-frontend.vercel.app',
      'https://foodcounter-frontend-2nwyy7f3r-aditya-singhs-projects-5f3944b5.vercel.app',
      // Add any other allowed origins as needed
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const foodSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  image: String,
});

const Food = mongoose.model("Food", foodSchema);

// Route for the root path
app.get("/", (req, res) => {
  res.send("Welcome to the Food Counter API!");
});

// Route for fetching foods
app.get("/api/foods", async (req, res) => {
  try {
    const data = await Food.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
