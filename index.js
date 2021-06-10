const express = require("express")
require("dotenv").config()

const app = express()

const PORT = process.env.PORT || 8000

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})