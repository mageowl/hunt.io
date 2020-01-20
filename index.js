const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client/index.html")
})

app.use("/src", express.static("src"))

app.listen(PORT)