const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post("/generate-video", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post("https://default-application-8669587.p.rapidapi.com/generate", {
      prompt: prompt,
    }, {
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "default-application-8669587.p.rapidapi.com",
        "Content-Type": "application/json",
      }
    });

    const videoUrl = response.data.video_url;
    if (videoUrl) {
      res.json({ video_url: videoUrl });
    } else {
      res.status(500).json({ error: "Error generating video" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
