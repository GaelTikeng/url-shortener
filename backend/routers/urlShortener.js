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
    let object = {
      original_url: originalUrl,
      short_url: shortUrl,
    };
    // generating regular expressions
    let expression =
      /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/;

    let regExp = new RegExp(expression);

    // test if the input url is a valid url
    if (originalUrl.match(regExp)) {
      // test if there is an existing url in the DB
      let allUrl = await Url.find({});
      allUrl.map((url) => {
        if (url.original_url === originalUrl) {
          shortUrl = url.short_url;
          console.log("true");
          res.json({
            original_url: originalUrl,
            short_url: shortUrl,
            result: "link already exit in DB"
          })
          return
        }
        // console.log("these are all urls", url.original_url);
      });
      await Url.create({
        original_url: originalUrl,
        short_url: shortUrl,
      });
    } else {
      res.json({ error: "Invalid URL" });
      return;
    }

    res.json(object);
  } catch (error) {
    console.log("An error occured while creating", error);
  }
});

// get request to api/shorturl and redirect
router.get("/api/shorturl/:input", async (req, res) => {
  try {
    const { input } = req.params;
    let result = await Url.findOne({short_url: input})
    res.redirect(result.original_url)
  }
  catch (err) {
    console.log("error while redirectiong")
  }
});

module.exports = router;
