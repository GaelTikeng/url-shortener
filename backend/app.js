const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const Url = require("./models/urlShortener");
// const { default: UrlShortener } = require("../front-end/src/component/urlShortener/urlShortener");
require('dotenv').config();   



var urlShortenerRouter = require('./routers/urlShortener')

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', urlShortenerRouter)

app.get("/", (req, res) => {
  res.send("Hello Mr Tikeng");
});


// post request to /url/shorturl
// app.post('/url/shorturl', async (req, res) => {
//   const inputUrl = req.body.url
//   try {
//     let shortUrl = 1
//     await Url.findOne({})
//       .sort({short: 'desc'})
//       .exec((error, result) => {
//         if(!error && result != undefined) {
//           shortUrl = result + 1
//         }
//         if (!error) {
//           Url.findOneAndUpdate(
//             {original_url: inputUrl},
//             {original_url: inputUrl, short: shortUrl},
//             {new: true, upsert: true},
//             (error, saveUrl) => {
//               if (!error) {
//                 if (!error) {
//                   responnse
//                 }
//               }
//             }
//           )
//         }
//       })
//   }
//   catch (error) {
//     console.log(error)
//   }

// })

app.listen(port, () => console.log(`Express is running on port ${port}!`));
