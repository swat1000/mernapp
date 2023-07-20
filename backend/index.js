const express = require('express');
const app = express();
const port = 5000;
const connectToMongoDB = require('./db');
const Router = require('./Routes/RegisterUser');
const FoodItems = require('./Routes/Fooddata')

connectToMongoDB();



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use(express.json());
app.use('/api', Router);
app.use('/api', FoodItems);
app.get('/', (req, res) => {
    res.send('Hello World');
  });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
