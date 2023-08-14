let mongoose = require('mongoose')

mongoose
  .connect("mongodb+srv://tikenglambougaelinho:url-shortener@cluster0.jfaqmxo.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUniFiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("error while setting up db", error))

// console.log(mongoose.connection.readyState)
;
module.exports = mongoose
