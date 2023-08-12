const express = require('express')
const app = express()
const port = 3001


app.get('/', (req, res) => {
  res.send("Hello Mr Tikeng")
})

app.listen(port, () => console.log(`Express is running on port ${port}!`))