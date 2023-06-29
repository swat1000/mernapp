const express = require('express')
const app = express()
const port = 5000
const connectToMongoDB = require('./db')

connectToMongoDB();

app.get('/', (req, res) => {
    res.send('Hello World')
})


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})