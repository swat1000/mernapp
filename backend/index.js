const express = require('express')
const app = express()
const port = 5000
const connectToMongoDB = require('./db')
const Router = require('./Routes/RegisterUser')

connectToMongoDB();

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use(express.json())
app.use('/api', Router)


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})