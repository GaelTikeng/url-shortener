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
    // generating regular expressions
    let expression =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

    let regularExp = new RegExp(expression);

    // test if the input url is a valid url
    if (!originalUrl.match(regularExp)) {
      res.json({ error: "Invalid url" });
      return;
    } else {
      // test if there is an existing url in the DB
      let allUrl = await Url.find({});
      allUrl.map((url) => {
        if (url.original_url === originalUrl) {
          shortUrl = url.short_url;
          res.json({
            original_url: originalUrl,
            short_url: shortUrl,
            url_status: "link already exit in DB",
          });
          // return;
        }
        return;
      });

      await Url.create({
        original_url: originalUrl,
        short_url: shortUrl,
      });
    }
    console.log("second response");
    res.json({
      original_url: originalUrl,
      short_url: shortUrl,
    });
  } catch (error) {
    console.log("An error occured while creating", error);
  }
});

// get request to api/shorturl and redirect
router.get("/api/shorturl/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const h = "https://";
    const result = await Url.findOne({ short_url: id });
    console.log(result.short_url.length)

    if (result.short_url.length > 4) {
      console.log('url too long')
      // rs.send({ error: "Not the exact url" });
      return;
    } else if (result.original_url.includes(h)) {
      console.log("yes include");
      res.redirect(`${result.original_url}`)
      return
    } else {
      console.log("concatenating two strings");
      res.redirect(`${h}${result.original_url}`);
      return;
    }

    // res.redirect(`https://${result.original_url}`);
  } catch (error) {
    console.log("error occured while redirecting", error);
  }
});

module.exports = router;
