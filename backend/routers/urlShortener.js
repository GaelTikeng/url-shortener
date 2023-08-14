let express = require("express");
const router = express.Router();
const Url = require("../models/urlShortener");

// get all urls
router.get("/", async (req, res) => {
  try {
    const getUrl = await Url.find({});
    console.log(getUrl);
    res.json(getUrl);
  } catch (err) {
    res.send("Cannot get urls");
  }
});

// post to api/shorturl
router.post("/api/shorturl", async (req, res) => {
  const originalUrl = req.body["originalUrl"];
  let shortUrl = Math.floor(Math.random() * 10000) + 1;

  try {
    let expression =/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;

    let regExp = new RegExp(expression)
    if (originalUrl.match(regExp)) {
      await Url.create({
        original_url: originalUrl,
        short_url: shortUrl
      });
    } else {
      res.json({"error": "Invalid URL"})
    }
    
    let object = {
      originalUrl,
      shortUrl,
    }
    console.log(object)
    res.json(object);
  }
  catch (error) {
    console.log("An error occured while creating", error)
  }
});

module.exports = router;
